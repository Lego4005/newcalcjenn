'use client'

import { useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
// TODO: Define a proper PropertyData type, perhaps in types/
// Using unknown for now based on researchly structure
type ImportedPropertyData = unknown; 
// import { PropertyData as ImportedPropertyData } from '@/types/propertyTypes'; 
import { formatPrice, formatDistance, calculateDistance } from '@/lib/utils';

interface MapProps {
  isDarkMode: boolean;
  propertyData: ImportedPropertyData | null;
  mapStyle?: 'streets' | 'satellite' | 'outdoors'; // Made optional
  is3DView?: boolean; // Made optional
  comparableProperties?: ImportedPropertyData[]; // Added for future use
}

const mapStyles = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  dark: 'mapbox://styles/mapbox/navigation-night-v1',
};

// Renamed component to avoid potential naming conflicts if importing directly
export function MapboxMap({ 
  isDarkMode, 
  propertyData, 
  mapStyle = 'streets', // Default style
  is3DView = true, // Default 3D view
  comparableProperties = [] // Default empty array
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const propertyMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const compMarkersRef = useRef<mapboxgl.Marker[]>([]); // Ref for comparable markers

  const addPointsOfInterest = useCallback(() => {
    if (!map.current) return;
    const sourceId = 'poi-source';
    const layerId = 'poi-labels';

    if (!map.current.getSource(sourceId)) {
      map.current.addSource(sourceId, {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v8'
      });
    }

    if (!map.current.getLayer(layerId)) {
      map.current.addLayer({
        'id': layerId,
        'type': 'symbol',
        'source': sourceId,
        'source-layer': 'poi_label',
        'layout': {
          'icon-image': ['concat', ['get', 'maki'], '-15'],
          'icon-allow-overlap': true,
          'text-field': ['get', 'name'],
          'text-offset': [0, 0.9],
          'text-anchor': 'top',
          'text-size': 12
        },
        'paint': {
          'text-color': isDarkMode ? '#ccc' : '#202', // Adjust text color for dark mode
          'text-halo-color': isDarkMode ? 'rgba(0,0,0,0.7)' : '#fff', // Adjust halo for dark mode
          'text-halo-width': 1
        }
      });
    }
  }, [isDarkMode]);

  const add3DBuildings = useCallback(() => {
    if (!map.current) return;

    // Only run once & only when the style contains the composite source
    if (map.current.getLayer('3d-buildings') || !map.current.getSource('composite')) return;

    // Find the first symbol layer that has a text-field. We will insert the
    // 3-D buildings *below* this so labels stay visible regardless of the
    // actual style in use.  If nothing matches we simply append the layer at
    // the top of the stack (Mapbox treats an undefined "before" id as
    // "place layer at top").
    const layers = map.current.getStyle().layers ?? [];
    const labelLayerId = layers.find(
      (l: mapboxgl.AnyLayer) => l.type === 'symbol' && (l.layout ?? {})['text-field']
    )?.id;

    map.current.addLayer(
      {
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': isDarkMode ? '#555' : '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      },
      labelLayerId
    );
  }, [isDarkMode]);

  const addTerrain = useCallback(() => {
    if (!map.current || map.current.getSource('mapbox-dem')) return;
    map.current.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
    map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
  }, []);

  const initializeMap = useCallback(() => {
    if (typeof window === 'undefined' || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
    // Log the token being used (or if it's missing)
    console.log('Using Mapbox Token:', mapboxgl.accessToken ? 'Token Set' : 'Token MISSING!'); 
    if (!mapboxgl.accessToken) {
        console.error("Mapbox Access Token is not set!");
        return;
    }

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: isDarkMode ? mapStyles.dark : mapStyles[mapStyle],
        center: [-82.4572, 27.9506], // Default center (Tampa, FL)
        zoom: 12, // Default zoom
        pitch: is3DView ? 45 : 0,
        bearing: 0,
        antialias: true
      });

      map.current.on('style.load', () => {
        addTerrain();
        add3DBuildings();
        addPointsOfInterest();
      });

      map.current.on('load', () => {
        map.current?.resize(); // Ensure map resizes correctly on load
      });

      map.current.on('error', (e) => {
        // Enhanced error logging
        console.error("Mapbox error event:", e);
        // Attempt to log specific properties if they exist
        if (e.error) {
          console.error("Mapbox underlying error:", e.error);
          console.error("Mapbox error message:", e.error.message);
          console.error("Mapbox error stack:", e.error.stack);
        }
        // Log the whole event object structure for inspection
        console.error("Full Mapbox error object:", JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
      });

      // Add controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      map.current.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
              enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
      }), 'top-right');

    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [isDarkMode, mapStyle, is3DView, addTerrain, add3DBuildings, addPointsOfInterest]);

  // Effect to initialize map on mount
  useEffect(() => {
    initializeMap();
    // Cleanup map instance on component unmount
    return () => {
      map.current?.remove();
      map.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Effect to update style based on props
  useEffect(() => {
    if (!map.current) return;
    const newStyle = isDarkMode ? mapStyles.dark : mapStyles[mapStyle];
    if (map.current.isStyleLoaded() && map.current.getStyle().metadata?.mapbox_url !== newStyle) {
        map.current.setStyle(newStyle);
        // Re-add layers after style change
        map.current.once('style.load', () => {
            addTerrain();
            add3DBuildings();
            addPointsOfInterest();
        });
    }
  }, [isDarkMode, mapStyle, addTerrain, add3DBuildings, addPointsOfInterest]);

  // Effect to update 3D view
  useEffect(() => {
    if (!map.current) return;
    map.current.easeTo({
      pitch: is3DView ? 45 : 0,
      duration: 500 // Smooth transition
    });
  }, [is3DView]);

  // Effect to update the main property marker and fly to location
  useEffect(() => {
    if (!map.current || !propertyData?.latitude || !propertyData?.longitude) return;

    const { latitude, longitude, address, price } = propertyData;
    const lngLat: [number, number] = [longitude, latitude];

    // Fly to new location
    map.current.flyTo({ 
      center: lngLat, 
      zoom: 16, 
      pitch: is3DView ? 45 : 0,
      essential: true // Ensures animation completes
    });

    // Remove previous marker
    if (propertyMarkerRef.current) {
      propertyMarkerRef.current.remove();
    }

    // Add new marker (using default Mapbox marker)
    propertyMarkerRef.current = new mapboxgl.Marker()
      .setLngLat(lngLat)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="mapbox-popup-content">
           <h3 class="font-semibold">${address?.streetAddress || 'Property'}</h3>
           <p>${formatPrice(price)}</p>
         </div>`
      ))
      .addTo(map.current);

  }, [propertyData, is3DView]);

  // Effect to update comparable markers
  useEffect(() => {
    if (!map.current) return;

    // Clear previous comparable markers
    compMarkersRef.current.forEach(marker => marker.remove());
    compMarkersRef.current = [];

    comparableProperties.forEach(comp => {
      if (comp?.latitude && comp?.longitude) {
        
        const distance = propertyData?.latitude && propertyData?.longitude 
          ? calculateDistance(propertyData.latitude, propertyData.longitude, comp.latitude, comp.longitude)
          : null;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="mapbox-popup-content">
            <h4 class="font-semibold">${comp.address?.streetAddress || 'Comp'}</h4>
            <p>${formatPrice(comp.price)}</p>
            <p>${comp.bedrooms} bed | ${comp.bathrooms} bath | ${comp.livingArea} sqft</p>
            ${distance !== null ? `<p>Dist: ${formatDistance(distance)}</p>` : ''}
          </div>
        `);

        // Use default marker with different color for comps
        const marker = new mapboxgl.Marker({ color: '#FF4136' }) // Example: Red marker
          .setLngLat([comp.longitude, comp.latitude])
          .setPopup(popup)
          .addTo(map.current);
        compMarkersRef.current.push(marker);
      }
    });

  }, [comparableProperties, propertyData]);

  // Handle resize
  useEffect(() => {
    const resizeMap = () => map.current?.resize();
    window.addEventListener('resize', resizeMap);
    // Also resize when sidebar collapses/expands (might need a prop or context)
    // For now, just resize on window resize
    return () => window.removeEventListener('resize', resizeMap);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Map container needs explicit height, often h-full within a sized parent */}
      <div ref={mapContainer} className="absolute top-0 bottom-0 w-full h-full" />
    </div>
  );
} 
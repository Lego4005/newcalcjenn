# Integration Points

## Sidebar Components Integration

### Overview

The sidebar components have been refactored into a modular structure that integrates seamlessly with the main application layout and property components.

### Integration with AppLayout

The new sidebar components are integrated into the application through the `AppLayout` component:

```tsx
// src/components/layout/AppLayout.tsx
export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarExpanded, setSidebarExpanded] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  
  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <PropertySidebar
          properties={sampleProperties}
          selectedProperty={selectedProperty}
          onSelectProperty={handlePropertySelect}
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setSidebarExpanded(!isSidebarExpanded)}
        />

        {/* Main Content */}
        <div className={`flex-1 ${isSidebarExpanded ? 'lg:ml-80' : 'lg:ml-[70px]'}`}>
          {/* Navbar and content */}
        </div>
      </div>
    </div>
  )
}
```

The `PropertySidebar` component is the main container for the sidebar, which includes:
- The sidebar header with logo and toggle button
- Navigation items
- Property list in either expanded or compact view

### Sidebar Component Structure

The sidebar is composed of several modular components:

1. **PropertySidebar**: The main container component that manages the sidebar state and renders the child components.
2. **SidebarHeader**: Displays the logo/title and provides a toggle button to expand/collapse the sidebar.
3. **NavItem**: A reusable component for navigation items with icon support.
4. **Section**: A collapsible section component for grouping related content.

### Responsive Behavior

The sidebar adapts to different screen sizes:

1. **Desktop View**:
   - Expanded mode: 320px wide (`w-80`)
   - Compact mode: 70px wide (`w-[70px]`)
   - Toggle button to switch between modes

2. **Mobile View**:
   - Hidden by default
   - Slides in from the left when menu button is clicked
   - Full width on small screens
   - Backdrop overlay when open

### Integration with Property Components

The sidebar integrates with the property components through:

1. **Property Selection**:
   - When a property is selected in the sidebar, it triggers the `onSelectProperty` callback
   - This updates the `selectedProperty` state in the `AppLayout` component
   - The selected property is highlighted in the sidebar

2. **Compact View**:
   - In compact mode, only property thumbnails are shown
   - Limited to 3 visible properties with a "+X" indicator for additional properties

3. **Expanded View**:
   - In expanded mode, property cards show more details
   - Organized in a scrollable section

## Property Components Integration

### Overview

The property components have been designed to integrate seamlessly with other parts of the application, particularly the calculator components and the main application layout.

### Integration with AppLayout

The property components are integrated into the application through the `AppLayout` component:

```tsx
// Previous implementation
<aside className={`fixed left-0 top-0 h-screen transition-all duration-200 bg-white border-r border-gray-200 z-10 ${isSidebarCompact ? 'w-[70px]' : 'w-80'} hidden lg:flex flex-col`}>
  {/* ... */}
  <div className={`flex-grow ${isSidebarCompact ? 'px-2' : 'p-4'}`}>
    <PropertyContext isCompact={isSidebarCompact} onLoadPropertyToCalculator={handleLoadPropertyToCalculator} />
  </div>
  {/* ... */}
</aside>

// New implementation
<PropertySidebar
  properties={sampleProperties}
  selectedProperty={selectedProperty}
  onSelectProperty={handlePropertySelect}
  isExpanded={isSidebarExpanded}
  onToggleExpanded={() => setSidebarExpanded(!isSidebarExpanded)}
/>
```

The `PropertyContext` component is now used within the `PropertySidebar` component, with the `isCompact` prop controlling its display mode based on the sidebar state.

### Expanded Property View

The application now features a sliding panel that appears from the right side of the screen when a property is selected. This panel provides a comprehensive view of the property with the following features:

1. **Smooth Animation**
   - Uses Framer Motion for fluid transitions
   - Slides in from the right with spring physics
   - Includes a semi-transparent backdrop overlay

2. **Rich Content Display**
   - High-resolution property images with navigation
   - Key property details (beds, baths, square feet)
   - Financial information with calculation highlighting
   - Neighborhood information with visual indicators
   - Embedded Mapbox map showing the property location
   - Photo gallery with thumbnails

3. **User Interaction**
   - "Load into Calculator" button for transferring data
   - Image navigation with arrow buttons
   - Thumbnail gallery for quick image selection
   - Close button to dismiss the panel

4. **Responsive Design**
   - Adapts to different screen sizes
   - Full width on mobile, partial width on larger screens
   - Scrollable content for overflow

### Integration with Calculator Components

The property components are designed to integrate with calculator components through a callback mechanism:

1. **Data Flow**
   - `onLoadPropertyToCalculator` callback is passed from parent components
   - When triggered, it passes the selected property data to calculator components

2. **UI Integration**
   - "Load into Calculator" button in the expanded view
   - Highlighted financial fields indicate values used in calculations

3. **Implementation**
   ```tsx
   // In parent component
   const handleLoadPropertyToCalculator = (property: Property) => {
     // Update calculator state with property data
     setCalculatorInputs({
       propertyValue: property.zestimate || parseFloat(property.price.replace(/[^0-9.]/g, '')),
       taxAssessment: property.taxAssessment,
       annualTaxAmount: property.annualTaxAmount,
       // Other relevant fields
     });
   };
   
   // Pass to PropertyContext
   <PropertyContext onLoadPropertyToCalculator={handleLoadPropertyToCalculator} />
   ```

### User Flow

1. User selects a property from the sidebar list
2. The expanded property view slides in from the right
3. User can view detailed property information
4. User clicks "Load into Calculator" to transfer data
5. The expanded view closes and calculator is populated with property data

## Implementation Details

### Component Communication

The sidebar components communicate through props and callbacks:

1. **Parent to Child**
   - `PropertySidebar` passes data and callbacks to child components
   - `isExpanded` controls display mode
   - `selectedProperty` indicates the currently selected property

2. **Child to Parent**
   - `onToggleExpanded` callback notifies parent of sidebar expansion/collapse
   - `onSelectProperty` callback notifies parent of property selection

3. **State Management**
   - `AppLayout` manages the main state
   - Child components are mostly presentational

### Animation and Transitions

The sidebar uses CSS transitions for animations:

```tsx
<aside 
  className={`
    fixed left-0 top-0 h-screen bg-white border-r border-gray-200
    transition-all duration-200 z-10
    ${isExpanded ? 'w-80' : 'w-[70px]'}
  `}
>
  {/* Sidebar content */}
</aside>
```

### Responsive Considerations

The sidebar adapts to different screen sizes:

1. **Desktop**:
   ```tsx
   <PropertySidebar
     properties={sampleProperties}
     selectedProperty={selectedProperty}
     onSelectProperty={handlePropertySelect}
     isExpanded={isSidebarExpanded}
     onToggleExpanded={() => setSidebarExpanded(!isSidebarExpanded)}
   />
   ```

2. **Mobile**:
   ```tsx
   <aside className={`fixed inset-y-0 left-0 w-72 bg-background border-r transform ${
     isMenuOpen ? 'translate-x-0' : '-translate-x-full'
   } transition-transform duration-200 ease-in-out lg:hidden z-50`}>
     {/* Mobile sidebar content */}
   </aside>
   ```

## Future Integration Opportunities

1. **Search Integration**
   - Connect property selection with search functionality
   - Filter properties based on search criteria

2. **Map Integration**
   - Show multiple properties on a map
   - Select properties from map view

3. **Favorites/Saved Properties**
   - Allow users to save properties
   - Sync with user accounts

4. **Comparison Feature**
   - Compare multiple properties side by side
   - Highlight differences in key metrics

5. **Sidebar Customization**
   - Allow users to customize sidebar sections
   - Save user preferences

6. **Notification Integration**
   - Display property-related notifications in the sidebar
   - Alert users to price changes or status updates

## Change Log 📝
- [2025-03-02 13:16]: Updated integration documentation with new sidebar components
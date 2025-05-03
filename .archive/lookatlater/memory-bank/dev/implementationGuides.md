# Implementation Guides

## Sidebar Components

### Overview

The sidebar components have been implemented to provide a modular, responsive, and user-friendly navigation experience. The key features include:

1.  Expandable/collapsible sidebar
2.  Navigation items with icons
3.  Collapsible sections (currently used for "Recent Properties" and "Saved Searches")
4.  Property cards in both expanded and compact views
5.  Always visible properties section

### Component Structure

The sidebar components are organized in a dedicated directory:

```
/src/components/sidebar/
  ├── index.ts                # Exports all components
  ├── types.ts                # Shared type definitions
  ├── SidebarHeader.tsx       # Logo and toggle button
  ├── NavItem.tsx             # Navigation item component
  ├── Section.tsx             # Collapsible section component
  └── PropertySidebar.tsx     # Main sidebar container
```

### Implementation Details

#### SidebarHeader Component

The `SidebarHeader` component displays the application logo and provides a toggle button to expand/collapse the sidebar:

```tsx
export function SidebarHeader({ isExpanded, onToggle }: SidebarHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${isExpanded ? 'px-4' : 'px-2'} py-4 border-b border-gray-200`}>
      {isExpanded ? (
        <img 
          src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-04_small_v2a.png"
          alt="Roca Title"
          className="h-10 w-auto"
        />
      ) : (
        <div className="w-full flex justify-center">
          <img 
            src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-04_small_v2a.png"
            alt="Roca Title"
            className="h-10 w-auto"
          />
        </div>
      )}
      
      <Button
        isIconOnly
        variant="light"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        onClick={onToggle}
        className="text-gray-500 hover:text-gray-700"
      >
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </Button>
    </div>
  )
}
```

Key implementation details:

1.  **Logo Display**: Uses the Roca Title logo image in both expanded and collapsed states.
2.  **Logo Sizing**: Uses h-10 class to set an appropriate height while maintaining aspect ratio.
3.  **Conditional Rendering**: Different layout based on `isExpanded` state.
4.  **Toggle Button**: Button with appropriate icon based on sidebar state.
5.  **Accessibility**: Proper `aria-label` for the toggle button.
6.  **Responsive Padding**: Different padding based on sidebar state.

#### NavItem Component

The `NavItem` component renders a navigation item with an optional icon:

```tsx
export function NavItem({ 
  label, 
  icon, 
  onClick, 
  isActive = false,
  href
}: NavItemProps) {
  const baseClasses = `
    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
    ${isActive 
      ? 'bg-primary-100 text-primary-700 font-medium' 
      : 'text-gray-700 hover:bg-gray-100'
    }
  `

  // If href is provided, render as a Link
  if (href) {
    return (
      <NextLink
        href={href}
        className={baseClasses}
        onClick={onClick}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span className="truncate">{label}</span>
      </NextLink>
    )
  }

  // Otherwise, render as a button
  return (
    <button
      className={baseClasses}
      onClick={onClick}
      type="button"
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="truncate">{label}</span>
    </button>
  )
}
```

Key implementation details:

1.  **Conditional Rendering**: Renders as either a `NextLink` or a `button` based on props.
2.  **Active State**: Visual indication for the active item.
3.  **Icon Support**: Optional icon display.
4.  **Text Truncation**: Prevents long labels from breaking the layout.
5.  **Hover Effects**: Visual feedback on hover.

#### Section Component

The `Section` component provides a collapsible section with a title:

```tsx
export function Section({ 
  title, 
  children, 
  defaultExpanded = true 
}: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}
```

Key implementation details:

1.  **State Management**: Internal state for expanded/collapsed state.
2.  **Toggle Button**: Button with chevron icon that rotates based on state.
3.  **Conditional Rendering**: Content is only rendered when expanded.
4.  **Animation**: Smooth rotation of the chevron icon.
5.  **Default State**: Can be configured with `defaultExpanded` prop.

#### PropertySidebar Component

The `PropertySidebar` component is the main container for the sidebar:

```tsx
export function PropertySidebar({
  onSelectProperty,
  selectedProperty,
  properties,
  isExpanded,
  onToggleExpanded
}: PropertySidebarProps) {
  const [activeSection, setActiveSection] = useState("dashboard")

  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    onSelectProperty(property)
  }

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200
        transition-all duration-200 z-10
        ${isExpanded ? 'w-80' : 'w-[70px]'}
      `}
    >
      {/* Sidebar Header */}
      <SidebarHeader 
        isExpanded={isExpanded} 
        onToggle={onToggleExpanded} 
      />
      
      {/* Main Navigation */}
      <div className={`flex flex-col ${isExpanded ? 'px-3' : 'px-2'} py-4`}>
        <NavItem
          label="Dashboard"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          }
          onClick={() => setActiveSection("dashboard")}
          isActive={activeSection === "dashboard"}
          href="/"
        />
        
        <NavItem
          label="Properties"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
          onClick={() => setActiveSection("properties")}
          isActive={activeSection === "properties"}
          href="/properties"
        />
        
        {/* Additional navigation items... */}
      </div>
      
      {/* Divider */}
      <div className="px-3 py-2">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Properties Section - Always visible when expanded */}
      {isExpanded && (
        <div className="px-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Section title="Recent Properties" defaultExpanded={true}>
            {/* Property list... */}
          </Section>
          
          <Section title="Saved Searches" defaultExpanded={false}>
            {/* Saved searches... */}
          </Section>
        </div>
      )}
      
      {/* Compact View - Only Icons - Always visible when collapsed */}
      {!isExpanded && (
        <div className="flex flex-col items-center mt-4 space-y-4">
          {/* Compact property list... */}
        </div>
      )}
    </aside>
  )
}
```

Key implementation details:

1.  **Responsive Layout**: Adapts based on `isExpanded` state.
2.  **Smooth Transition**: CSS transition for width changes.
3.  **Section Management**: Tracks active section for navigation highlighting (although properties are always visible).
4.  **Conditional Rendering**: Different content based on sidebar state (expanded/collapsed).
5.  **Overflow Handling**: Scrollable content for long lists.
6.  **Property Selection**: Handles property selection and passes to parent.
7.  **Always Visible Properties**: Properties section is always visible regardless of the active section.
8. **Navigation Links**: Dashboard links to root path ("/") and Properties links to "/properties".

### Integration with AppLayout

The sidebar components are integrated into the `AppLayout` component:

```tsx
export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarExpanded, setSidebarExpanded] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isExpandedViewOpen, setIsExpandedViewOpen] = useState(false)
  const pathname = usePathname()
  
  // Menu items with correct routing
  const menuItems: SidebarItem[] = [
    { key: 'dashboard', title: 'Dashboard', href: '/', icon: <Home className="w-5 h-5" /> },
    { key: 'properties', title: 'Property Search', href: '/properties', icon: <Search className="w-5 h-5" /> },
    // Other menu items...
  ]
  
  // Helper function to determine if a menu item is active
  const isMenuItemActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname === href;
  }
  
  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
    setIsExpandedViewOpen(true)
  }

  // Handle loading property to calculator
  const handleLoadToCalculator = (property: Property) => {
    console.log('Loading property into calculator:', property)
    setIsExpandedViewOpen(false)
    // In a real implementation, this would update the calculator state
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

      {/* Property Expanded View */}
      <PropertyExpandedView
        property={selectedProperty}
        isOpen={isExpandedViewOpen}
        onClose={() => setIsExpandedViewOpen(false)}
        onLoadToCalculator={handleLoadToCalculator}
      />
    </div>
  )
}
```

Key integration details:

1.  **State Management**: `AppLayout` manages the sidebar state and expanded view state.
2.  **Property Selection**: Handles property selection from the sidebar and opens the expanded view.
3.  **Responsive Layout**: Main content area adjusts based on sidebar state.
4.  **Mobile Support**: Separate mobile sidebar implementation.
5.  **Expanded View Integration**: Includes the `PropertyExpandedView` component for detailed property viewing.
6.  **Navigation Routing**: Dashboard menu item routes to "/" (root) and Properties to "/properties".
7.  **Active State Handling**: Uses `isMenuItemActive` helper function to correctly determine active state for both "/" and "/dashboard" routes.
8. **Default Active Tab**: Dashboard tab is highlighted by default.

### Dashboard Redirect Implementation

To handle the `/dashboard` route and prevent 404 errors, a redirect page has been implemented:

```tsx
// src/app/dashboard/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the root page
    router.replace('/')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Redirecting to Dashboard...</h1>
        <p className="text-gray-600">Please wait while you are redirected to the main dashboard.</p>
      </div>
    </div>
  )
}
```

Key implementation details:

1.  **Client Component**: Uses `'use client'` directive to enable client-side navigation.
2.  **Redirect Logic**: Uses the Next.js router to redirect to the root page.
3.  **Loading State**: Displays a loading message while the redirect is in progress.
4.  **useEffect Hook**: Ensures the redirect happens after component mount.

## Property Search Page

### Overview

The property search page has been implemented to provide a comprehensive property listing experience with an interactive map, similar to Airbnb or Zillow. The key features include:

1.  Interactive map display alongside property listings
2.  Advanced filtering options
3.  Responsive layout for different screen sizes
4.  Property cards with detailed information
5.  Property selection and highlighting

### Component Structure

The property search page is implemented as a Next.js page component:

```
/src/app/properties/
  └── page.tsx             # Property search page with map and listings
```

### Implementation Details

#### Property Search Page

The property search page combines an interactive map with property listings and filtering options:

```tsx
export default function PropertiesPage() {
  const [properties] = useState<Property[]>([/* Sample properties */])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([300000, 900000])
  const [propertyType, setPropertyType] = useState<string>('all')
  const [bedrooms, setBedrooms] = useState<string>('any')
  const [bathrooms, setBathrooms] = useState<string>('any')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  
  // Filter properties based on search criteria
  useEffect(() => {
    // Filtering logic...
    setFilteredProperties(filtered)
  }, [searchQuery, priceRange, propertyType, bedrooms, bathrooms, properties])
  
  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {/* Filters Bar */}
      <div className="p-4 bg-white border-b">
        {/* Filtering controls... */}
      </div>
      
      {/* Main Content - Map and Listings */}
      <div className="flex flex-1 overflow-hidden">
        {/* Property Listings */}
        <div className="w-full md:w-1/2 lg:w-2/5 overflow-y-auto p-4">
          {/* Property cards... */}
        </div>
        
        {/* Map */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 bg-gray-100 relative">
          {/* Map placeholder... */}
          
          {/* Property Markers */}
          {selectedProperty && (
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md">
              {/* Selected property info... */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

Key implementation details:

1.  **Responsive Layout**: Uses a flex layout that adapts to different screen sizes
    *   On mobile: Full-width property listings
    *   On medium screens and above: Split view with map and listings side by side
    *   On large screens: Adjusts the ratio to give more space to the map

2.  **Filtering System**: Comprehensive filtering options
    *   Text search for address, city, or ZIP
    *   Property type selection
    *   Bedroom and bathroom filters
    *   Price range slider
    *   Additional filters button for more options

3.  **Property Listings**: Scrollable list of property cards
    *   Each card shows key property information
    *   Cards are selectable and highlight when selected
    *   Responsive card layout that adapts to screen size

4.  **Interactive Map**: Placeholder for map integration
    *   Shows selected property details
    *   Would be integrated with Google Maps or Mapbox in a production environment
    *   Displays property markers that correspond to the listings

5.  **State Management**: Uses React state to manage:
    *   Property data
    *   Filter criteria
    *   Selected property
    *   Filtered property results

6.  **Real-time Filtering**: Updates filtered properties whenever filter criteria change

### Usage Guidelines

When working with the property search page, follow these guidelines:

1.  **Map Integration**: In a production environment, integrate with a mapping service like Google Maps or Mapbox.
2.  **Property Data**: Replace the sample data with real property data from an API or database.
3.  **Filter Optimization**: Optimize the filtering logic for large datasets.
4.  **Responsive Testing**: Test the layout on various screen sizes.
5.  **Accessibility**: Ensure all interactive elements are keyboard accessible.

### Example: Adding a New Filter

To add a new filter to the property search page:

```tsx
// Add a new state variable
const [yearBuilt, setYearBuilt] = useState<[number, number]>([1950, 2025])

// Add to the filtering logic
if (yearBuilt[0] > 1950 || yearBuilt[1] < 2025) {
  filtered = filtered.filter(property => {
    const year = typeof property.yearBuilt === 'string' 
      ? parseInt(property.yearBuilt) 
      : property.yearBuilt
    return year >= yearBuilt[0] && year <= yearBuilt[1]
  })
}

// Add the UI control
<div className="w-full md:w-64">
  <p className="text-sm text-gray-500 mb-1">
    Year Built: {yearBuilt[0]} - {yearBuilt[1]}
  </p>
  <Slider
    minValue={1950}
    maxValue={2025}
    step={1}
    value={yearBuilt}
    onChange={(value) => setYearBuilt(Array.isArray(value) ? value : [value, yearBuilt[1]])}
    className="w-full"
  />
</div>
```
### Navigation
The properties page is now accessible by clicking the "Properties" link in the sidebar, which has been updated to point to `/properties`.

## Change Log 📝
- [2025-03-02 13:17]: Added sidebar components implementation guide
- [2025-03-02 13:41]: Updated SidebarHeader component to use Roca Title logo with increased size
- [2025-03-02 13:46]: Fixed navigation routing to correctly handle dashboard link and active state
- [2025-03-02 13:56]: Added dashboard redirect page and updated package.json with dev script
- [2025-03-02 14:01]: Modified PropertySidebar to always show properties regardless of active section
- [2025-03-02 14:11]: Created property search page with interactive map and property listings
- [2025-03-02 14:13]: Updated AppLayout and PropertySidebar to link to the new properties page
- [2025-03-02 14:18]: Added Property Search Page documentation
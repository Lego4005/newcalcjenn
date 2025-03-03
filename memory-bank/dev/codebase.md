# Codebase Organization

## Directory Structure

The application follows a standard Next.js project structure with additional organization for components and utilities:

```
/src
  /app                 # Next.js app router pages
  /components          # React components
    /layout            # Layout components
    /property          # Property-related components
    /sidebar           # Sidebar components
  /utils               # Utility functions and API helpers
/public                # Static assets
/memory-bank           # Documentation and project memory
/core                  # Core system definitions
```

## Component Organization

### Property Components

We've refactored the property-related components into a modular structure:

```
/src/components/property/
  ├── index.ts                # Exports all components
  ├── types.ts                # Shared type definitions
  ├── utils.ts                # Helper functions
  ├── PropertyContext.tsx     # Main container component
  ├── PropertyList.tsx        # List of property cards
  ├── PropertyCard.tsx        # Individual property card
  ├── PropertyDetails.tsx     # Detailed property view
  ├── PropertyExpandedView.tsx # Sliding panel for property details
  └── AddPropertyModal.tsx    # Modal for adding new properties
```

This organization follows a clear separation of concerns:

1. **PropertyContext**: Manages state and coordinates between components
2. **PropertyList**: Renders a collection of PropertyCard components
3. **PropertyCard**: Displays a compact or full property card
4. **PropertyDetails**: Shows detailed property information in the main content area
5. **PropertyExpandedView**: Provides a sliding panel with comprehensive property details
6. **AddPropertyModal**: Handles property creation

### Sidebar Components

We've implemented a new modular sidebar structure:

```
/src/components/sidebar/
  ├── index.ts                # Exports all components
  ├── types.ts                # Shared type definitions
  ├── SidebarHeader.tsx       # Logo and toggle button
  ├── NavItem.tsx             # Navigation item component
  ├── Section.tsx             # Collapsible section component
  └── PropertySidebar.tsx     # Main sidebar container
```

This organization follows a clear separation of concerns:

1. **PropertySidebar**: The main container component that manages the sidebar state and renders the child components.
2. **SidebarHeader**: Displays the logo/title and provides a toggle button to expand/collapse the sidebar.
3. **NavItem**: A reusable component for navigation items with icon support.
4. **Section**: A collapsible section component for grouping related content.

### Component Responsibilities

#### PropertyContext

- Manages the list of properties
- Tracks the selected property
- Coordinates between child components
- Handles property selection and addition
- Manages the expanded view state

```tsx
export function PropertyContext({ 
  isCompact = false,
  onLoadPropertyToCalculator
}: PropertyContextProps) {
  // State management
  const [properties, setProperties] = useState<Property[]>(sampleProperties)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExpandedViewOpen, setIsExpandedViewOpen] = useState(false)
  
  // Event handlers
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
    setIsExpandedViewOpen(true)
  }
  
  // Render components
  return (
    <div className="space-y-6">
      <PropertyList
        properties={properties}
        selectedProperty={selectedProperty}
        onSelectProperty={handlePropertySelect}
        isSidebarView={isCompact}
      />
      
      {/* Other components */}
      
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

#### PropertyCard

- Renders a property in either compact (sidebar) or full (grid) view
- Handles hover effects and selection
- Displays key property information

```tsx
export function PropertyCard({ 
  property, 
  isSelected, 
  onSelect,
  isSidebarView = false
}: PropertyCardProps) {
  // Conditional rendering based on view mode
  if (isSidebarView) {
    return (
      <motion.div whileHover={{ scale: 1.02 }}>
        <Card isPressable onPress={() => onSelect(property)}>
          {/* Compact card content */}
        </Card>
      </motion.div>
    )
  }
  
  // Standard card for grid view
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card isPressable onPress={() => onSelect(property)}>
        {/* Full card content */}
      </Card>
    </motion.div>
  )
}
```

#### PropertySidebar

- Main container for the sidebar
- Manages the expanded/collapsed state
- Renders navigation items and property list
- Handles property selection

```tsx
export function PropertySidebar({
  onSelectProperty,
  selectedProperty,
  properties,
  isExpanded,
  onToggleExpanded
}: PropertySidebarProps) {
  const [activeSection, setActiveSection] = useState("properties")

  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    onSelectProperty(property)
  }

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-200 z-10 ${isExpanded ? 'w-80' : 'w-[70px]'}`}>
      {/* Sidebar Header */}
      <SidebarHeader isExpanded={isExpanded} onToggle={onToggleExpanded} />
      
      {/* Main Navigation */}
      <div className={`flex flex-col ${isExpanded ? 'px-3' : 'px-2'} py-4`}>
        <NavItem label="Dashboard" icon={...} onClick={() => setActiveSection("dashboard")} isActive={activeSection === "dashboard"} />
        {/* Additional navigation items... */}
      </div>
      
      {/* Properties Section */}
      {isExpanded && activeSection === "properties" && (
        <div className="px-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Section title="Recent Properties" defaultExpanded={true}>
            {/* Property list... */}
          </Section>
        </div>
      )}
      
      {/* Compact View - Only Icons */}
      {!isExpanded && (
        <div className="flex flex-col items-center mt-4 space-y-4">
          {/* Compact property list... */}
        </div>
      )}
    </aside>
  )
}
```

#### PropertyExpandedView

- Provides a sliding panel for detailed property view
- Manages image gallery navigation
- Displays comprehensive property information
- Includes a "Load into Calculator" button

```tsx
export function PropertyExpandedView({ 
  property, 
  isOpen, 
  onClose,
  onLoadToCalculator 
}: PropertyExpandedViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  // Animation with Framer Motion
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="backdrop" />
          <motion.div className="panel">
            {/* Panel content */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

## Type Definitions

### Property Types

The `types.ts` file contains shared type definitions used across property components:

```typescript
export interface Property {
  id: string
  address: string
  price: string
  image: string
  status: 'active' | 'pending' | 'closed'
  // Additional data
  bedrooms?: number
  bathrooms?: number
  squareFeet?: number
  yearBuilt?: string | number
  propertyType?: string
  lotSize?: number
  description?: string
  photos?: Array<{
    href: string;
  }>
  lastTouched?: string
  taxAssessment?: number
  zestimate?: number
  rentZestimate?: number
  lotSizeSqFt?: number
  hoaFee?: number
  annualTaxAmount?: number
  parcelId?: string
}

export interface PropertyPhoto {
  href: string;
  [key: string]: unknown;
}
```

### Sidebar Types

The sidebar components use the following type definitions:

```typescript
export interface SidebarHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export interface NavItemProps {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  href?: string;
}

export interface SectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export interface PropertySidebarProps {
  onSelectProperty: (property: Property) => void;
  selectedProperty: Property | null;
  properties: Property[];
  isExpanded: boolean;
  onToggleExpanded: () => void;
}
```

## Utility Functions

The `utils.ts` file contains helper functions used by property components:

```typescript
// Format currency values
export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

// Format dates
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get status badge color
export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-amber-100 text-amber-800';
    case 'closed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Check if a field is used in calculations
export const isCalculationField = (fieldName: string): boolean => {
  const calculationFields = ['price', 'taxAssessment', 'annualTaxAmount', 'zestimate'];
  return calculationFields.includes(fieldName);
};
```

## Styling Approach

The application uses a combination of:

1. **Tailwind CSS** for utility-based styling
2. **NextUI** for UI components
3. **Framer Motion** for animations

Key styling patterns:

- Consistent spacing with Tailwind's spacing scale
- Responsive design using Tailwind's breakpoint prefixes
- Animation with Framer Motion's `motion` components
- Card-based UI with consistent shadows and borders
- Color highlighting for calculation-related fields

## State Management

The application uses React's built-in state management with hooks:

- `useState` for component-level state
- Props for passing data between components
- Callback functions for child-to-parent communication

### AppLayout Integration

The `AppLayout` component integrates the sidebar components:

```tsx
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
          {/* Navbar */}
          <Navbar />
          
          {/* Content */}
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
```

## Future Refactoring Opportunities

1. **Context API**: Consider using React Context for sharing property data across components
2. **Custom Hooks**: Extract common state logic into custom hooks
3. **Server Components**: Evaluate which components can be server components in Next.js
4. **Data Fetching**: Move API calls to server components or React Server Components
5. **Caching**: Implement caching for property data
6. **Global State Management**: Consider using a global state management solution for sharing state between the sidebar and main content

## Change Log 📝
- [2025-03-02 13:15]: Added sidebar components and updated AppLayout integration
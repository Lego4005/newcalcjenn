# Design Patterns

## UI Component Patterns

### Property Sidebar Design Patterns

The property sidebar implements several key design patterns to ensure a professional, maintainable, and user-friendly interface.

#### 1. Card Component Pattern

The property card component follows a consistent pattern across the application:

```typescript
// Property Card Pattern
interface PropertyCardProps {
  property: Property;
  variant: 'compact' | 'standard' | 'detailed';
  isSelected?: boolean;
  onSelect: (property: Property) => void;
}
```

**Implementation Guidelines:**

- **Compact Variant** (Sidebar):
  ```jsx
  <Card className="flex flex-row h-[72px] overflow-hidden">
    <Image 
      src={property.image} 
      className="w-[72px] h-[72px] object-cover" 
    />
    <CardContent className="flex flex-col p-2">
      <Typography variant="h6">{property.price}</Typography>
      <Typography variant="body2" className="truncate">{property.address}</Typography>
      <StatusIndicator status={property.status} />
    </CardContent>
  </Card>
  ```

- **Standard Variant** (Grid):
  ```jsx
  <Card className="flex flex-col h-[250px] overflow-hidden">
    <Image 
      src={property.image} 
      className="w-full h-[150px] object-cover" 
    />
    <CardContent className="flex flex-col p-3">
      <Typography variant="h6">{property.price}</Typography>
      <Typography variant="body2" className="truncate">{property.address}</Typography>
      <div className="flex justify-between items-center">
        <StatusIndicator status={property.status} />
        <PropertyMetrics property={property} />
      </div>
    </CardContent>
  </Card>
  ```

#### 2. Status Indicator Pattern

Status indicators follow a consistent pattern for visual communication:

```typescript
// Status Indicator Pattern
interface StatusIndicatorProps {
  status: 'active' | 'pending' | 'closed';
  variant?: 'dot' | 'badge' | 'text';
  size?: 'sm' | 'md' | 'lg';
}
```

**Implementation Guidelines:**

- **Color Mapping:**
  ```typescript
  const statusColorMap = {
    active: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      dot: 'bg-blue-500'
    },
    pending: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      dot: 'bg-amber-500'
    },
    closed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500'
    }
  };
  ```

- **Dot Variant** (Sidebar):
  ```jsx
  <div className="flex items-center">
    <div className={`w-2 h-2 rounded-full ${statusColorMap[status].dot} mr-1`} />
    <span className={`text-xs ${statusColorMap[status].text}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  </div>
  ```

- **Badge Variant** (Grid):
  ```jsx
  <div className={`px-2 py-1 rounded-full text-xs ${statusColorMap[status].bg} ${statusColorMap[status].text}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </div>
  ```

#### 3. Section Header Pattern

Section headers are used for the "Properties" section:

```typescript
// Section Header Pattern
interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
}
```

**Implementation Guidelines:**

```jsx
<div className="flex justify-between items-center py-2 mb-2 cursor-pointer" onClick={onToggle}>
  <Typography variant="h6" className="font-semibold text-gray-800">
    {title}
  </Typography>
    <ChevronDownIcon className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
</div>
```
#### 4. Navigation Item Pattern

Navigation items are used for the main navigation links:

```typescript
// Navigation Item Pattern
interface NavItemProps {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
}
```
**Implementation Guidelines:**
```jsx
<div
    className={`flex items-center px-4 py-2 rounded cursor-pointer transition-colors ${
    isActive ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100'
    }`}
    onClick={onClick}
>
    {icon && <span className="mr-3">{icon}</span>}
    <span className="text-sm font-medium text-gray-700">{label}</span>
</div>
```

#### 5. Hover Effect Pattern

Hover effects follow a consistent pattern using Framer Motion:

```typescript
// Hover Effect Pattern
const hoverVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  },
  tap: { 
    scale: 0.98
  }
};
```

**Implementation Guidelines:**

- **Card Hover:**
  ```jsx
  <motion.div
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    variants={hoverVariants}
    transition={{ duration: 0.2 }}
  >
    <Card>
      {/* Card content */}
    </Card>
  </motion.div>
  ```

- **Button Hover:**
  ```jsx
  <motion.button
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    variants={buttonVariants}
    transition={{ duration: 0.2 }}
    className="bg-primary-500 text-white px-4 py-2 rounded"
  >
    {children}
  </motion.button>
  ```
- **Navigation Item Hover**
    ```jsx
      <motion.div
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        transition={{ duration: 0.2 }}
        >
        <NavItem />
      </motion.div>
    ```

#### 6. Responsive Layout Pattern

The sidebar implements a responsive layout pattern:

```typescript
// Responsive Layout Pattern
interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}
```

**Implementation Guidelines:**

- **Expanded State:**
  ```jsx
  <aside className={`fixed left-0 top-0 h-screen transition-all duration-200 ${
    isExpanded ? 'w-64' : 'w-[70px]'
  }`}>
    {/* Sidebar content with conditional rendering */}
    {isExpanded ? (
      <ExpandedContent />
    ) : (
      <CompactContent />
    )}
  </aside>
  ```

- **Responsive Breakpoints:**
  ```css
  /* Base (Mobile): Collapsed by default */
  .sidebar {
    @apply fixed left-0 top-0 h-screen w-0 -translate-x-full;
  }
  
  /* Medium: Compact sidebar */
  @media (min-width: 768px) {
    .sidebar {
      @apply w-[70px] translate-x-0;
    }
  }
  
  /* Large: Expanded sidebar */
  @media (min-width: 1024px) {
    .sidebar {
      @apply w-64;
    }
  }
  ```

#### 7. Property List Pattern

The property list follows a consistent pattern:

```typescript
// Property List Pattern
interface PropertyListProps {
  properties: Property[];
  variant: 'compact' | 'grid' | 'list';
  selectedProperty?: Property;
  onSelectProperty: (property: Property) => void;
}
```

**Implementation Guidelines:**

- **Compact Variant** (Sidebar):
  ```jsx
  <div className="space-y-2">
    {properties.map(property => (
      <PropertyCardCompact
        key={property.id}
        property={property}
        isSelected={selectedProperty?.id === property.id}
        onSelect={onSelectProperty}
      />
    ))}
  </div>
  ```

- **Grid Variant** (Main Content):
  ```jsx
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {properties.map(property => (
      <PropertyCard
        key={property.id}
        property={property}
        variant="standard"
        isSelected={selectedProperty?.id === property.id}
        onSelect={onSelectProperty}
      />
    ))}
  </div>
  ```

## Animation Patterns

### Transition Patterns

The application uses consistent transition patterns:

1.  **Sidebar Expansion/Collapse:**
    ```css
    .sidebar {
      @apply transition-all duration-300 ease-in-out;
    }
    ```

2.  **Card Hover Effects:**
    ```typescript
    const transition = { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    };
    ```

3.  **Panel Slide-in:**
    ```typescript
    const slideInVariants = {
      hidden: { x: "100%" },
      visible: { x: 0 },
      exit: { x: "100%" }
    };
    
    const transition = { 
      type: "spring", 
      damping: 25, 
      stiffness: 200 
    };
    ```

4.  **Section Expand/Collapse:**
    ```typescript
    const transition = {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
    ```

## State Management Patterns

### Property Selection Pattern

```typescript
// In PropertyContext component
const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

const handlePropertySelect = (property: Property) => {
  setSelectedProperty(property);
  // Additional actions like fetching details or opening panels
};

// Pass down to child components
<PropertyList
  properties={properties}
  selectedProperty={selectedProperty}
  onSelectProperty={handlePropertySelect}
/>
```

### Recent Properties Pattern

```typescript
// In PropertyContext component
const [recentProperties, setRecentProperties] = useState<Property[]>([]);

const addToRecentProperties = (property: Property) => {
  // Remove if already exists
  const filtered = recentProperties.filter(p => p.id !== property.id);
  
  // Add to beginning and limit to 5
  setRecentProperties([property, ...filtered].slice(0, 5));
};

// Update when selecting a property
const handlePropertySelect = (property: Property) => {
  setSelectedProperty(property);
  addToRecentProperties(property);
};
```

### Sidebar Expanded State Pattern
```typescript
// Custom hook: useSidebarState.ts
const [isExpanded, setIsExpanded] = useState(true); // Or use a responsive default

const toggleExpanded = () => {
  setIsExpanded(prev => !prev);
};
```

### Section Expanded State Pattern
```typescript
// In each section component (e.g., PropertiesSection)
const [isExpanded, setIsExpanded] = useState(true); // Or use a default based on user preference

const toggleExpanded = () => {
  setIsExpanded(prev => !prev);
};
```

## Integration Patterns

### Calculator Integration Pattern

```typescript
// In PropertyContext component
const handleLoadToCalculator = (property: Property) => {
  if (onLoadPropertyToCalculator) {
    onLoadPropertyToCalculator(property);
  }
};

// In PropertyCard or PropertyDetails
<Button 
  onClick={() => handleLoadToCalculator(property)}
  variant="outlined"
>
  Load to Calculator
</Button>
```

### Search Integration Pattern

```typescript
// In PropertyContext component
const [searchParams, setSearchParams] = useState<PropertyFilterOptions>({});

const handleSearch = (params: PropertyFilterOptions) => {
  setSearchParams(params);
  // Fetch properties based on search params
};

// In SearchComponent
<PropertySearch onSearch={handleSearch} />
```

These design patterns provide a consistent framework for implementing the property sidebar and related components, ensuring a cohesive user experience and maintainable codebase.
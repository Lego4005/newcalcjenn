# System Architecture

## Sidebar Design

### Property Sidebar Component

The property sidebar will be a sleek, professional component that serves as the primary navigation for the property management application. It will be designed for efficiency and ease of use, with a focus on clear visual hierarchy and quick access to key features.

#### Visual Design

```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │       ROCA TITLE        │ │
│ └─────────────────────────┘ │
│                             │
│  Dashboard (Home Icon)      │
│  Net Seller Sheet (Calc)   │
│  Property Search (Magnify)  │
│  Documents (Doc Icon)       │
│  Settings (Gear Icon)       │
│                             │
│ ▼ Properties (House Icon)   │
│   ├── Recent Property 1   │
│   ├── Recent Property 2   │
│   ├── Recent Property 3   │
│   ├── + Add Property      │
│   └── View All Properties │
│                             │
└─────────────────────────────┘
```

#### Key Features

1.  **Prioritized Navigation:**
    *   Essential navigation links (Dashboard, Net Seller Sheet, Property Search, Documents, Settings) are placed at the top for immediate visibility.
    *   Icon-based navigation for a cleaner look and space efficiency when the sidebar is collapsed.

2.  **Hierarchical Navigation:**
    *   "Properties" section is expandable, revealing recent properties and actions.

3.  **Compact Property Cards**:
    *   Horizontal layout optimized for sidebar
    *   Thumbnail image on the left
    *   Essential information on the right (price, address, status)
    *   Status indicators with color coding (Active: blue, Pending: amber, Sold: green)
    *   Fixed height for consistency
    *   Subtle hover effects with shadow and slight scale increase

4.  **Section Organization**:
    *   "Recent Properties" section at the top of the "Properties" section for quick access.
    *   Limited to 3-5 most recently accessed properties.
    *   "All Properties" link to view the complete list.
    *   Clear visual separation between sections.

5.  **Add Property Button**:
    *   Prominent "+" button within the "Properties" section.
    *   Consistent with the overall design language.
    *   Clear icon and text label.

6. **Clear Icons**:
    * Use specific and recognizable icons for each menu item.
    * Icons should clearly represent the functionality they represent.

7.  **Visual Aesthetics**:
    *   Clean, minimalist design
    *   Consistent spacing and alignment
    *   Subtle shadows and borders
    *   Professional color scheme aligned with brand identity
    *   Appropriate typography hierarchy

#### Component Structure

```
PropertySidebar
├── SidebarHeader
│   └── Logo
├── NavItem (Dashboard)
├── NavItem (Net Seller Sheet)
├── NavItem (Property Search)
├── NavItem (Documents)
├── NavItem (Settings)
├── Section (Properties)
│   ├── SectionTitle (Properties, expandable)
│   ├── PropertyCardList (compact, only when expanded)
│   │   ├── PropertyCardCompact
│   │   ├── PropertyCardCompact
│   │   └── PropertyCardCompact
│   ├── AddPropertyButton
│   └── ViewAllLink
```

#### Interaction Design

1.  **Property Card Interactions**:
    *   Hover: Subtle elevation increase, slight shadow enhancement
    *   Click: Select property and show details in main content area
    *   Active state: Highlighted border or background to indicate selection

2.  **Add Property Button**:
    *   Hover: Color shift and subtle grow effect
    *   Click: Open add property modal or navigate to add property page

3.  **Section Expansion**:
    *   Clicking on "Properties" section title expands/collapses the section.
    *   Use a smooth animation for the expansion/collapse.

4.  **Navigation Links**:
    *   Hover: Underline or color change
    *   Click: Navigate to the corresponding page or section.

#### Responsive Behavior

The sidebar will adapt to different states:

1.  **Expanded State** (default on larger screens):
    *   Full width sidebar (240-280px)
    *   Complete property information visible
    *   All UI elements fully displayed, including labels

2.  **Compact State** (optional toggle or smaller screens):
    *   Narrow sidebar (70-80px)
    *   Only icons visible for top-level navigation
    *   Tooltips for additional information on hover

3.  **Collapsed State** (mobile or user preference):
    *   Hidden by default, accessible via hamburger menu
    *   Full-width overlay when opened on mobile
    *   Maintains all functionality in a space-efficient layout

#### Technical Implementation

1.  **Component Technology**:
    *   React components with TypeScript
    *   Tailwind CSS for styling
    *   Framer Motion for animations and transitions

2.  **Key CSS Classes**:
    *   `sidebar-container`: Main sidebar container with fixed positioning
    *   `property-card-compact`: Horizontal layout card for sidebar
    *   `status-indicator`: Status dot with appropriate color
    *   `sidebar-section`: Container for each sidebar section
    *   `nav-item`: Individual navigation item

3.  **State Management**:
    *   Track selected property
    *   Track sidebar expanded/collapsed state
    *   Track recent properties list
    *   Track expanded/collapsed state of sections

#### Accessibility Considerations

1.  **Keyboard Navigation**:
    *   Full keyboard accessibility for all interactive elements
    *   Clear focus states for keyboard users
    *   Logical tab order through sidebar elements

2.  **Screen Reader Support**:
    *   Appropriate ARIA labels for all interactive elements
    *   Semantic HTML structure
    *   Status indicators with text alternatives

3.  **Color Contrast**:
    *   Ensure all text meets WCAG AA standards for contrast
    *   Status indicators use both color and text for differentiation

#### Integration Points

The sidebar will integrate with:

1.  **Property Data Store**:
    *   Fetch and display property list
    *   Track recently viewed properties
    *   Update when properties are added/modified

2.  **Main Content Area**:
    *   Selected property details display in main content
    *   Synchronize selection state between components

3.  **Navigation System**:
    *   Link to property search and management pages
    *   Maintain navigation state across the application

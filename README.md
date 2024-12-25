# Roca Titles Dashboard

A modern web application for real estate professionals to manage properties and calculate real estate metrics specifically for Roca Titles calculate net seller proceeds.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Home page with property dashboard
│   ├── providers.tsx     # Theme and NextUI providers
│   └── globals.css       # Global styles
│
├── components/
│   ├── layout/
│   │   ├── Sidebar/     # Modular sidebar components
│   │   │   ├── index.tsx       # Main sidebar container
│   │   │   ├── Navigation.tsx  # Navigation menu
│   │   │   └── UserSection.tsx # User profile and actions
│   │   └── AppLayout.tsx # Main layout wrapper
│   │
│   ├── RealEstateCalculator/
│   │   ├── PropertyCalculator.tsx  # Main calculator component
│   │   ├── PropertyHero.tsx        # Property header with image
│   │   ├── CommandMenu.tsx         # Quick actions menu
│   │   └── StatsCard.tsx           # Property statistics cards
│   │
│   ├── PropertyContext.tsx  # Property selection and management
│   └── CalculatorTools.tsx  # Calculator tool selection
```

## Features

### Layout Components

#### AppLayout
- Clean, modern interface with command menu
- Smart collapsible sidebar (80px collapsed, 288px expanded)
- Integrated property context
- Responsive design with blur effects
- Dark mode support

#### Sidebar
- Compact and full-width modes
- Centered navigation with tooltips
- Property quick-access with previews
- User section with theme toggle
- Status-aware property cards

### Real Estate Calculator

#### Property Dashboard
- Property hero section with image
- Key statistics cards
- Monthly payment breakdown
- ROI calculations

#### Command Menu (NextUI Pro)
- Quick actions and navigation
- Property management
- Team collaboration
- Keyboard shortcuts

### NextUI Pro Components Usage

Currently using:
- `CommandMenu` - For quick actions and navigation
- `Avatar` - For user and property images
- `Card` - For property cards and statistics
- `Button` - For actions and navigation
- `Tooltip` - For compact mode information

Potential Pro components to integrate:
- `Table` - For property comparisons
- `Modal` - For detailed property views
- `Accordion` - For grouped property information
- `Tabs` - For different calculator views
- `Select` - For enhanced dropdowns

### Standard NextUI Components
When Pro components aren't available, we use enhanced standard components:
- Custom-styled buttons with hover effects
- Cards with gradient overlays
- Tooltips with rich content
- Responsive layout components

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: NextUI + NextUI Pro
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Theme**: Dark/Light mode with system preference

## Development

### Prerequisites
```bash
Node.js 18+
npm or yarn
NextUI Pro license
```

### Installation
```bash
npm install
```

### Running Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

## Styling

The project implements:
- NextUI theming system
- Tailwind CSS for custom styling
- CSS modules for component-specific styles
- Responsive design patterns
- Dark mode with proper color handling

### Theme Configuration
- Custom color palette in `tailwind.config.ts`
- Dark/Light mode support
- Blur effects and gradients
- Responsive breakpoints

## Future Enhancements

1. **UI/UX Improvements**
   - Enhanced property cards
   - Advanced filtering
   - Better mobile experience
   - Animation refinements

2. **Calculator Features**
   - More calculation types
   - Save/load configurations
   - Comparison tools
   - Export options

3. **Integration**
   - MLS API integration
   - Document generation
   - Team collaboration
   - Real-time updates

4. **Property Management**
   - Advanced search
   - Bulk operations
   - History tracking
   - Analytics dashboard

# Roca Titles Dashboard

A modern web application for real estate professionals to manage properties and calculate net seller proceeds.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with providers and app shell
│   ├── page.tsx          # Home page with net seller calculator
│   ├── providers.tsx     # NextUI providers setup
│   └── globals.css       # Global styles
│
├── components/
│   ├── layout/
│   │   └── AppLayout.tsx # Main layout with header and sidebar
│   │
│   ├── NetSellerCalculator.tsx  # Net seller sheet calculator
│   ├── CalculatorTools.tsx      # Bottom calculator tool buttons
│   ├── PropertyContext.tsx      # Property selection in sidebar
│   └── ChatPanel.tsx           # AI chat assistant panel
```

## Features

### Layout Components

#### AppLayout
- Modern header with search and notifications
- Collapsible sidebar (toggles between full and compact modes)
- Property context for quick property switching
- Navigation menu with icons
- User profile and settings
- Mobile responsive design

#### Property Context
- List of properties with status indicators
- Quick property switching
- Property details display
- Add new property functionality

### Calculator Components

#### NetSellerCalculator
- Input fields for sale price, mortgages, and taxes
- Real-time calculations
- Summary cards with percentages
- Estimated net proceeds display

#### CalculatorTools
- Quick access to different calculators
- Visual tool selection
- Status indicators for active tool

### Chat Integration
- AI assistant chat panel
- Message history
- Real-time responses
- Document sharing capabilities

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: NextUI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks

## Component Design

### Header Navigation
The header uses NextUI's `Navbar` component with:
- Responsive navigation menu
- Search functionality
- Notification system
- User profile dropdown

### Sidebar
Implements a collapsible sidebar with:
- Property context section
- Navigation menu
- Compact mode toggle
- Tooltips for compact view

### Calculator
The net seller calculator features:
- Input validation
- Real-time calculations
- Percentage indicators
- PDF generation capability

## Usage

### Property Management
1. Select properties from the sidebar
2. View property details
3. Switch between properties to update calculations

### Net Seller Calculator
1. Enter property sale price
2. Input mortgage payoff amounts
3. Add property tax information
4. View real-time net proceeds calculation

### Calculator Tools
- Access different calculators through the bottom toolbar
- Each calculator has its own specialized function
- Tools are context-aware based on selected property

## Development

### Prerequisites
```bash
Node.js 18+
npm or yarn
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

The project uses a combination of:
- NextUI components
- Tailwind CSS for custom styling
- CSS modules for component-specific styles

### Theme Configuration
- Custom color palette in `tailwind.config.ts`
- Dark mode support
- Responsive breakpoints

## Future Enhancements

1. **Property Management**
   - Property history tracking
   - Multiple property comparison
   - Batch calculations

2. **Calculator Features**
   - More calculator types
   - Save calculations as templates
   - Batch processing

3. **Integration**
   - API integration for property data
   - Document generation
   - Export functionality

4. **User Experience**
   - Enhanced mobile experience
   - Offline support
   - More customization options

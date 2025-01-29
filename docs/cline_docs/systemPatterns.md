# System Patterns

## Architecture
1. Frontend Framework
   - Next.js 15.1.2
   - TypeScript for type safety
   - Client-side routing
   - Server-side authentication

2. Component Architecture
   - Container/Presenter pattern
   - Composition over inheritance
   - Shared UI components
   - Form abstraction

3. State Management
   - React hooks for local state
   - URL parameters for shareable state
   - Local storage for persistence
   - Prop drilling minimized

## Technical Decisions
1. Authentication & Authorization
   - Supabase for auth management
   - Protected routes
   - Session persistence
   - Secure token handling
   - Role-based access control (agent/broker)
   - Row Level Security (RLS) policies
   - Profile-user association
   - Email verification flow

2. UI Framework
   - HeroUI components (migrated from NextUI)
   - Tailwind CSS for styling
   - Framer Motion for animations
   - Responsive design
   - Accessible form controls
   - Image optimization with next/image

3. Data Flow
   - Top-down prop passing
   - Event bubbling for updates
   - Controlled components
   - Form state management
   - User metadata handling

## Design Patterns
1. Component Patterns
   - Higher-Order Components
   - Render props
   - Custom hooks
   - Context providers
   - Form validation HOCs

2. Form Patterns
   - Step wizard pattern
   - Form validation
   - Error handling
   - Real-time updates
   - Role selection
   - Profile creation

3. Calculation Patterns
   - Strategy pattern for fees
   - Observer pattern for updates
   - Factory pattern for forms
   - Builder pattern for results

## Best Practices
1. Code Organization
   - Feature-based structure
   - Shared utilities
   - Type definitions
   - Constants separation
   - Auth middleware

2. Performance
   - Memoization
   - Code splitting
   - Lazy loading
   - Bundle optimization
   - Image optimization
   - LCP optimization

3. Maintainability
   - Clear documentation
   - Consistent naming
   - Modular design
   - Testing strategy
   - Type safety
   - Error boundaries

4. Security
   - Row Level Security
   - Type-safe database access
   - Protected API routes
   - Secure auth flows
   - Role validation
   - Profile protection
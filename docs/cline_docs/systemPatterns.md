# System Patterns

## Architecture Overview

### Core Components
1. **Frontend (Next.js)**
   - React components
   - Server components
   - Client components
   - API routes
   - Enhanced form handling
   - Improved error feedback
   - Multi-select interfaces
   - Permission-based UI
   - Time-series visualization
   - Real-time collaboration

2. **UI Framework**
   - HeroUI components
   - Tailwind CSS
   - Custom components
   - Responsive design
   - Consistent button interactions
   - Image optimization
   - Dynamic grid layouts
   - Conditional rendering
   - Interactive time ranges
   - Collaboration indicators

3. **Backend (Supabase)**
   - PostgreSQL database
   - Enhanced authentication
   - Real-time updates
   - API endpoints
   - Session management
   - Cookie handling
   - Role-based access control
   - Permission system
   - Historical metrics storage
   - Real-time presence tracking
   - Edit history tracking

## Design Patterns

### 1. Component Patterns
- **Atomic Design**
  - Atoms (basic components)
  - Molecules (component groups)
  - Organisms (complex components)
  - Templates (page layouts)
  - Form components
  - Button components
  - Multi-select components
  - Permission-aware components
  - Collaboration components
  - Time range selectors

- **Container Pattern**
  - Data fetching
  - State management
  - Business logic
  - UI rendering
  - Error handling
  - Loading states
  - Comparison logic
  - Permission checks
  - Trend analysis
  - Real-time collaboration

### 2. Data Patterns
- **Repository Pattern**
  - Data access layer
  - CRUD operations
  - Query optimization
  - Cache management
  - Session handling
  - Batch operations
  - Permission validation
  - Role management
  - Time-series data
  - Presence tracking
  - Edit history

- **State Management**
  - React context
  - Local state
  - Server state
  - Form state
  - Auth state
  - Session state
  - Comparison state
  - Permission state
  - Trend state
  - Presence state
  - Collaboration state

### 3. Authentication Patterns
- **User Management**
  - Session handling
  - Cookie management
  - Error handling
  - User feedback
  - Role-based access
  - Profile management
  - Permission system
  - Feature protection

- **Permission System**
  - Role definitions
  - Permission checks
  - Feature protection
  - Route guards
  - UI adaptation
  - Access control
  - Permission hooks
  - Middleware

### 4. Collaboration Patterns
- **Presence System**
  - Real-time tracking
  - User status
  - Field-level presence
  - Automatic cleanup
  - Presence indicators
  - User avatars
  - Activity timestamps
  - Concurrent editing

- **Edit History**
  - Field-level changes
  - User attribution
  - Timestamp tracking
  - Change visualization
  - Audit trails
  - Revert capabilities
  - Change notifications
  - Conflict resolution

### 5. Database Patterns
- **Table Structure**
  - calculator_defaults (system settings)
  - saved_calculations (user data)
  - user_profiles (user settings)
  - property_metrics (historical data)
  - property_presence (real-time presence)
  - property_edit_history (change tracking)
  - Row-level security
  - JSON column types
  - Role-based access
  - Permission storage

- **Access Patterns**
  - User-specific queries
  - Default value management
  - Calculation caching
  - Batch operations
  - Session management
  - Permission validation
  - Role enforcement
  - Historical data retrieval
  - Presence tracking
  - Edit history logging

### 6. API Patterns
- **REST Architecture**
  - Resource-based routes
  - HTTP methods
  - Status codes
  - Response formats
  - Error handling
  - Permission middleware
  - Role validation
  - Real-time endpoints

- **Real-time Updates**
  - Supabase subscriptions
  - Event handling
  - State synchronization
  - Error handling
  - Session management
  - Permission checks
  - Role-based filtering
  - Presence broadcasting
  - Edit notifications

## Best Practices

### 1. Code Organization
- Feature-based structure
- Clear separation of concerns
- Consistent naming
- Documentation
- Type safety
- Component isolation
- Pattern reusability
- Permission encapsulation
- Collaboration hooks
- Time-series handling

### 2. Performance
- Code splitting
- Lazy loading
- Caching strategies
- Bundle optimization
- Image optimization
- Session management
- Batch processing
- Permission caching
- Presence optimization
- Time-series optimization

### 3. Security
- Authentication
- Authorization
- Data validation
- Error handling
- Cookie security
- Session management
- Permission checks
- Role validation
- Collaboration access control
- Time-series access control

### 4. Testing
- Unit Testing
- Integration Testing
- E2E Testing
- Performance Testing
- Authentication Testing
- Permission Testing
- Role Testing
- Access Control Testing
- Presence Testing
- Edit History Testing
- Time-series Testing

### 5. User Experience
- Responsive design
- Color accessibility
- Interactive elements
- Real-time updates
- Error feedback
- Loading states
- Form validation
- Permission feedback
- Role-based UI
- Feature access control
- Collaboration feedback
- Time range interaction

### 6. Authentication
- Secure session handling
- Cookie management
- Error handling
- User feedback
- Role-based access
- Profile management
- Session persistence
- Permission enforcement
- Collaboration authorization
- Time-series authorization
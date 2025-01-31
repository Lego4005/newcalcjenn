# Technical Context

## Technology Stack

### Frontend
1. **Framework**
   - Next.js 14
   - React 19
   - TypeScript
   - Node.js

2. **UI Components**
   - HeroUI (migrated from NextUI)
   - Tailwind CSS
   - Custom components
   - Responsive design
   - Form handling with proper validation
   - Enhanced button interactions
   - Multi-select components
   - Permission-aware components
   - Real-time update notifications
   - Collaboration indicators

3. **State Management**
   - React Context
   - React Query
   - Form state
   - Local storage
   - Session management
   - Comparison state
   - Permission state
   - Role state
   - Real-time subscription state
   - Collaboration state
   - Presence state

4. **Data Visualization**
   - Custom DonutChart
   - Custom SparklineChart
   - SVG rendering
   - Responsive scaling
   - Image optimization
   - Historical trends
   - Multi-property comparison
   - Dynamic metrics
   - Bulk visualization
   - Time range selection
   - Historical trend analysis

### Backend
1. **Database**
   - Supabase
   - PostgreSQL
   - Real-time subscriptions
   - Row-level security
   - Enhanced session handling
   - Role-based access control
   - Permission system
   - Bulk operations
   - Time-series metrics
   - Presence tracking
   - Edit history

2. **Authentication**
   - Supabase Auth
   - JWT tokens
   - OAuth providers
   - Enhanced session management
   - Improved cookie handling
   - Proper error handling
   - User profiles
   - Role-based access
   - Permission validation
   - Collaboration authorization

3. **API Layer**
   - Next.js API routes
   - Supabase client
   - TypeScript types
   - API middleware
   - Enhanced error handling
   - Permission middleware
   - Role validation
   - Real-time channels
   - Presence channels
   - Edit history tracking

## Implementation Details

### 1. Permission System
```typescript
// Permission Types
type UserRole = 'user' | 'agent' | 'broker'

interface Permission {
  name: string
  description: string
  roles: UserRole[]
}

// Permission Definitions
const PERMISSIONS = {
  VIEW_CALCULATOR: {
    name: 'view_calculator',
    description: 'View the calculator',
    roles: ['user', 'agent', 'broker']
  },
  BULK_CALCULATOR: {
    name: 'bulk_calculator',
    description: 'Use bulk property calculator',
    roles: ['agent', 'broker']
  }
}

// Permission Hooks
function usePermissions() {
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const can = (permission: PermissionName) => hasPermission(userRole, permission)
  return { userRole, can }
}
```

### 2. Collaboration System
```typescript
// Presence Types
interface CollaboratorPresence {
  user_id: string;
  property_id: string;
  last_active: string;
  current_field?: string;
  user_details: {
    email: string;
    avatar_url?: string;
  };
}

interface EditHistoryEntry {
  id: string;
  property_id: string;
  user_id: string;
  field: string;
  old_value: string | number | boolean | null;
  new_value: string | number | boolean | null;
  timestamp: string;
  user_details: {
    email: string;
  };
}

// Collaboration Hook
function useCollaboration(propertyId: string) {
  const [collaborators, setCollaborators] = useState<CollaboratorPresence[]>([]);
  const [editHistory, setEditHistory] = useState<EditHistoryEntry[]>([]);

  // Subscribe to presence updates
  useEffect(() => {
    const channel = supabase.channel(`presence:${propertyId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setCollaborators(Object.values(state));
      })
      .subscribe();

    return () => { channel.unsubscribe(); };
  }, [propertyId]);

  return { collaborators, editHistory, updateFieldValue };
}
```

### 3. Real-time Updates System
```typescript
// Update Types
type PropertyUpdate = {
  property: Property;
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  timestamp: string;
};

// Real-time Hook
function usePropertyUpdates({ 
  onUpdate,
  propertyIds 
}: {
  onUpdate?: (update: PropertyUpdate) => void;
  propertyIds?: string[];
} = {}) {
  const [updates, setUpdates] = useState<PropertyUpdate[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to property updates
  useEffect(() => {
    const channel = supabase.channel('property_updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'saved_calculations',
        filter: propertyIds?.length 
          ? `id=in.(${propertyIds.join(',')})` 
          : undefined
      }, (payload) => {
        // Handle updates
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [propertyIds, onUpdate]);

  return { updates, error, latestUpdate: updates[0] };
}
```

### 4. Database Schema
```sql
-- Core Tables
CREATE TABLE properties (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  details JSONB,
  created_at TIMESTAMPTZ
);

-- Calculator Defaults
CREATE TABLE calculator_defaults (
  id BIGINT PRIMARY KEY,
  default_buyer_agent_commission NUMERIC,
  default_seller_agent_commission NUMERIC,
  default_settlement_fee NUMERIC,
  default_title_search NUMERIC,
  default_municipal_lien_search NUMERIC,
  default_doc_stamp_rate NUMERIC,
  title_insurance_base_rate NUMERIC,
  title_insurance_excess_rate NUMERIC,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Saved Calculations
CREATE TABLE saved_calculations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT,
  property_details JSONB,
  mortgage_info JSONB,
  commission_structure JSONB,
  additional_fees JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  share_id TEXT,
  is_public BOOLEAN
);

-- User Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Property Metrics
CREATE TABLE property_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES saved_calculations(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metrics JSONB NOT NULL,
  CONSTRAINT valid_metrics CHECK (
    metrics ? 'propertyValue' AND
    metrics ? 'monthlyIncome' AND
    metrics ? 'roi' AND
    metrics ? 'capRate' AND
    metrics ? 'cashOnCash' AND
    metrics ? 'debtServiceCoverage' AND
    metrics ? 'grossRentMultiplier' AND
    metrics ? 'netOperatingIncome'
  )
);

-- Property Presence
CREATE TABLE property_presence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  property_id UUID REFERENCES saved_calculations NOT NULL,
  last_active TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_field TEXT,
  user_details JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Property Edit History
CREATE TABLE property_edit_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES saved_calculations NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  field TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_details JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Technical Requirements

### 1. System Requirements
- Node.js >= 18.x
- npm >= 9.x
- TypeScript >= 5.x
- Git >= 2.x

### 2. Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^19.0.0",
  "heroui": "latest",
  "tailwindcss": "^3.0.0",
  "@supabase/supabase-js": "latest",
  "@supabase/auth-helpers-nextjs": "latest",
  "framer-motion": "^10.0.0"
}
```

### 3. Development Tools
- VS Code
- ESLint
- Prettier
- TypeScript

### 4. Testing Infrastructure
- **Testing Framework**
  - Jest
  - React Testing Library
  - Mock implementations
  - Component testing
  - Hook testing
  - Integration testing

- **Test Coverage**
  - Component tests (95%)
  - Hook tests (90%)
  - Integration tests (85%)
  - Mock implementations
    - HeroUI components
    - PDF rendering
    - Real-time subscriptions
    - Theme handling

- **Testing Best Practices**
  - Proper component mocking
  - Accessibility testing
  - Event handling
  - Render props pattern

## Development Setup

### 1. Installation
```bash
# Clone repository
git clone [repo]

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
```

### 2. Configuration
```bash
# Environment variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 3. Development
```bash
# Start development server
npm run dev

# Build production
npm run build

# Create test user
node scripts/create-test-user.mjs
```

## Performance Considerations

### 1. Frontend
- Code splitting
- Image optimization
- Bundle size
- Caching
- SVG optimization
- Animation performance
- Form handling
- Error feedback
- Loading states
- Dynamic metric calculations
- Multi-property rendering
- Permission checks
- Role validation
- Real-time subscription management
- Update notification handling
- Presence tracking optimization
- Edit history rendering

### 2. Database
- Query optimization
- Index usage
- Connection pooling
- Cache strategy
- JSON column indexing
- Session management
- Cookie handling
- Batch property fetching
- Permission caching
- Role-based queries
- Real-time channel management
- Subscription optimization
- Presence cleanup
- Edit history pruning

### 3. API
- Response time
- Rate limiting
- Error handling
- Validation
- Data transformation
- Session management
- Authentication flow
- Comparison data handling
- Permission middleware
- Role validation
- Real-time event handling
- Update propagation
- Presence synchronization
- Edit history tracking
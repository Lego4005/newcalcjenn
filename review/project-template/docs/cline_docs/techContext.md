# Technical Context: [Project Name]

## Technology Stack

### Frontend
- Framework/Library
- UI Components
- State Management
- Styling Solution

### Backend Services
- Server Technology
- Authentication
- Task Processing

- Database System (if using Supabase)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Storage for documents
  - Edge Functions
  - Advanced Features:
    - pgvector for vector embeddings and similarity search
    - pg_net for HTTP requests and job queues
    - pg_cron for scheduled jobs
    - pg_graphql for GraphQL API
    - pg_jsonschema for JSON validation
    - plv8 for JavaScript functions
    - pgjwt for JWT handling
    - AI capabilities via Edge Functions
      - OpenAI/LangChain integration

### Third-Party Integrations
- Service 1
  - Purpose
  - Integration points
- Service 2
  - Purpose
  - Integration points

## Development Setup

### Prerequisites
```bash
# Required versions
Node.js >= [version]
[Other requirements]
```

### Environment Variables
```bash
# Core Configuration
APP_URL=
API_KEY=

# Database
# If using Supabase:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# If using AI features:
OPENAI_API_KEY=
AI_MODEL_CONFIG=

# Authentication
AUTH_KEY=
AUTH_URL=

# Third Party Services
SERVICE1_KEY=
SERVICE2_KEY=
```

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Database Schema

### Vector Search (if using Supabase pgvector)
```sql
-- Enable vector extension
create extension if not exists vector;

-- Create embeddings table
create table content_embeddings (
  id uuid primary key default uuid_generate_v4(),
  content_type text not null,
  content_id uuid not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create similarity search function
create or replace function match_embeddings (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (id uuid, content_type text, content_id uuid, similarity float);
```

### Background Jobs (if using Supabase pg_net)
```sql
-- Enable pg_net
create extension if not exists pg_net;

-- Create job queue table
create table job_queue (
  id uuid primary key default uuid_generate_v4(),
  job_type text not null,
  payload jsonb not null,
  status text not null default 'pending',
  attempts int not null default 0,
  max_attempts int not null default 3,
  next_attempt_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### [Table/Collection 1]
```sql
create table [table_name] (
  id uuid primary key default uuid_generate_v4(),
  field1 type1,
  field2 type2,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

### [Table/Collection 2]
```sql
create table [table_name] (
  id uuid primary key default uuid_generate_v4(),
  field1 type1,
  field2 type2,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

## API Structure

### REST Endpoints
```typescript
// Resource 1
GET    /api/resource1
POST   /api/resource1
GET    /api/resource1/:id
PATCH  /api/resource1/:id
DELETE /api/resource1/:id

// Resource 2
GET    /api/resource2
POST   /api/resource2
GET    /api/resource2/:id
PATCH  /api/resource2/:id
DELETE /api/resource2/:id
```

## Security Implementation

### Authentication Flow
1. Step 1
2. Step 2
3. Step 3
4. Step 4

### Access Control
```typescript
// Example policy or middleware
function checkAccess() {
  // Implementation
}
```

## Performance Considerations

### Caching Strategy
- Strategy 1
- Strategy 2
- Strategy 3
- Strategy 4

### Optimization Techniques
- Technique 1
- Technique 2
- Technique 3
- Technique 4

## Monitoring

### Key Metrics
- Metric 1
- Metric 2
- Metric 3
- Metric 4

### Tools
- Tool 1
- Tool 2
- Tool 3
- Tool 4

## Testing Strategy

### Unit Tests
- Component testing
- Function testing
- Integration points

### Integration Tests
- API testing
- Service integration
- Database operations

### E2E Tests
- Critical paths
- User flows
- Edge cases

Note: Update this template with your specific technical details and add any additional sections as needed.

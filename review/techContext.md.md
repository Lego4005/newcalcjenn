# Technical Context: Financial Advisor Marketing CRM Platform

## Technology Stack

### Frontend

- Next.js 13+ (App Router)

  - TypeScript for type safety
  - Server Components for performance
  - Route Handlers for API endpoints
  - Middleware for tenant isolation

- Tailwind CSS
  - Custom design system
  - Component variants
  - Dark/light mode support
  - Responsive utilities

### Backend Services

- Supabase

  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Storage for documents
  - Edge Functions
  - pgvector for embeddings
  - pg_net for job queues
  - AI capabilities
    - OpenAI integration for content analysis

- Clerk

  - Multi-tenant authentication
  - Role-based access control
  - OAuth providers
  - User management

- Trigger.dev
  - Background job processing
  - Scheduled tasks
  - Webhook handling
  - Event processing

### Third-Party Integrations

- Meta Marketing API

  - Campaign management
  - Ad performance metrics
  - Audience insights

- Google Ads API
  - Campaign tracking
  - Performance data
  - Budget management

## Development Setup

### Prerequisites

```bash
# Required versions
Node.js >= 18.0.0
npm >= 9.0.0
```

### Environment Variables

```bash
# Next.js
NEXT_PUBLIC_APP_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Trigger.dev
TRIGGER_API_KEY=
TRIGGER_API_URL=

# Meta API
META_ACCESS_TOKEN=
META_APP_ID=

# Google Ads
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=
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

### AI Embeddings

```sql
-- Enable vector extension
create extension if not exists vector;

-- Create embeddings table
create table content_embeddings (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id),
  content_type text not null,
  content_id uuid not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create function to search similar content
create or replace function match_content_embeddings (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (id uuid, content_type text, content_id uuid, similarity float);
```

### Organizations (Marketing Agencies)

```sql
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

### Clients (Financial Advisors)

```sql
create table clients (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id),
  name text not null,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

### Campaigns

```sql
create table campaigns (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id),
  name text not null,
  type text not null check (type in ('digital', 'direct_mail')),
  status text not null check (status in ('draft', 'active', 'paused', 'completed')),
  budget decimal(10,2) not null,
  start_date date not null,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

### Background Jobs Queue

```sql
create table job_queue (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id),
  job_type text not null,
  payload jsonb not null,
  status text not null default 'pending',
  attempts int not null default 0,
  max_attempts int not null default 3,
  next_attempt_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### Events

```sql
create table events (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id),
  campaign_id uuid references campaigns(id),
  name text not null,
  date timestamp with time zone not null,
  location text not null,
  capacity integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

## API Structure

### REST Endpoints

```typescript
// Organizations
GET    /api/organizations
POST   /api/organizations
GET    /api/organizations/:id
PATCH  /api/organizations/:id
DELETE /api/organizations/:id

// Campaigns
GET    /api/campaigns
POST   /api/campaigns
GET    /api/campaigns/:id
PATCH  /api/campaigns/:id
DELETE /api/campaigns/:id

// Events
GET    /api/events
POST   /api/events
GET    /api/events/:id
PATCH  /api/events/:id
DELETE /api/events/:id

// Analytics
GET    /api/analytics/campaigns
GET    /api/analytics/events
GET    /api/analytics/conversions
```

## Security Implementation

### Authentication Flow

1. User signs in via Clerk
2. Clerk provides JWT with org_id claim
3. JWT validated by middleware
4. RLS policies enforce data isolation

### Row Level Security

```sql
-- Organizations Policy
create policy "org_isolation" on organizations
  using (auth.uid() = owner_id);

-- Campaigns Policy
create policy "campaign_isolation" on campaigns
  using (org_id in (
    select id from organizations
    where auth.uid() = owner_id
  ));
```

## Performance Considerations

### Caching Strategy

- Server Components for static content
- Supabase cache for frequent queries
- Edge Functions for regional performance
- Progressive loading for large datasets

### Optimization Techniques

- Image optimization with next/image
- Code splitting with dynamic imports
- Preloading critical resources
- Debounced API calls
- Optimistic updates

## Monitoring

### Key Metrics

- Page load times
- API response times
- Database query performance
- Background job completion rates
- Error rates and types

### Tools

- Vercel Analytics
- Supabase Monitoring
- Custom error tracking
- Performance monitoring
- User behavior analytics

## Testing Strategy

### Unit Tests

- Component testing with Jest
- API route testing
- Utility function testing
- Database query testing

### Integration Tests

- API endpoint integration
- Service integration
- Database operations
- Authentication flows

### E2E Tests

- User flows with Playwright
- Critical path testing
- Multi-tenant scenarios
- Payment processing

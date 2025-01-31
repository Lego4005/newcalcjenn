# Supabase Setup Guide

## Prerequisites

1. Supabase project with:
   - Project URL
   - Anon Key
   - Service Role Key
   - Access Token (from https://supabase.com/dashboard/account/tokens)

2. Required environment variables in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ACCESS_TOKEN=your_access_token
```

## Project Structure

```bash
supabase/
├── config.toml          # Project configuration
└── migrations/         # Database migrations
    └── YYYYMMDD_name.sql  # Migration files
```

## Advanced Features

### 1. Vector Search (pgvector)

Enables AI-powered search and similarity matching:

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
create or replace function match_content_embeddings (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (id uuid, content_type text, content_id uuid, similarity float);
```

### 2. Job Queue System (pg_net)

For reliable background processing:

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

### 3. Multi-tenant Security (RLS)

Row Level Security for data isolation:

```sql
-- Enable RLS
alter table your_table enable row level security;

-- Create policies
create policy "tenant_isolation" on your_table
  for all
  using (auth.jwt() ->> 'org_id' = org_id::text);
```

## Setup Process

1. Create project structure:
```bash
mkdir -p supabase/migrations
```

2. Create configuration:
```bash
# supabase/config.toml
[api]
enabled = true
port = 54321
schemas = ["public", "graphql_public"]
extra_search_path = ["public", "extensions"]
max_rows = 1000

[db]
port = 54322
shadow_port = 54320
major_version = 15
```

3. Create setup script:
```bash
#!/bin/bash
# scripts/setup-supabase.sh

# Load environment variables
export $(cat .env.local | grep -v '^#' | xargs)

# Check for access token
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo "Error: SUPABASE_ACCESS_TOKEN is not set"
    exit 1
fi

# Initialize and link project
npx supabase init
npx supabase link --project-ref "your_project_ref"

# Push database changes
npx supabase db push
```

4. Add npm scripts:
```json
{
  "scripts": {
    "db:setup": "./scripts/setup-supabase.sh",
    "db:start": "supabase start",
    "db:stop": "supabase stop",
    "db:reset": "supabase db reset",
    "db:push": "supabase db push",
    "db:studio": "supabase studio"
  }
}
```

## Usage

1. Set up environment variables in `.env.local`
2. Make the setup script executable:
```bash
chmod +x scripts/setup-supabase.sh
```

3. Run the setup:
```bash
npm run db:setup
```

## Common Issues

1. **Access Token Error**: Ensure SUPABASE_ACCESS_TOKEN is set in `.env.local`
2. **Project Reference**: Update the project reference in setup script
3. **Migration Conflicts**: Use `supabase db reset` to reset the database

## Best Practices

1. **Migrations**:
   - One feature per migration
   - Clear, descriptive names
   - Include rollback logic

2. **Security**:
   - Always enable RLS
   - Test policies thoroughly
   - Use service role sparingly

3. **Performance**:
   - Index frequently queried columns
   - Use appropriate vector dimensions
   - Monitor job queue performance

4. **Maintenance**:
   - Regular backups
   - Monitor storage usage
   - Keep extensions updated
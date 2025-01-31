# Supabase Configuration

This directory contains the Supabase project configuration and database migrations.

## Directory Structure

```
supabase/
├── config.toml         # Project configuration
├── migrations/         # Database migrations
│   └── initial_schema.sql  # Base schema with advanced features
└── README.md          # This file
```

## Features

The base schema includes support for:

1. **Vector Search (pgvector)**
   - AI-powered semantic search
   - Content embeddings
   - Similarity matching

2. **Job Queue System (pg_net)**
   - Background processing
   - Automatic retries
   - Job status tracking

3. **Multi-tenant Security**
   - Row Level Security (RLS)
   - Organization-based isolation
   - Role-based access control

## Getting Started

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials
2. Run the setup script:
   ```bash
   npm run db:setup
   ```

## Available Scripts

- `npm run db:setup` - Initialize and configure Supabase
- `npm run db:push` - Push schema changes
- `npm run db:reset` - Reset database
- `npm run db:studio` - Open Supabase Studio

## Documentation

For detailed setup instructions and best practices, see:
- [Supabase Setup Guide](../docs/guides/supabase-setup.md)
- [Session Guide](../docs/cline_docs/session-guide.md)

## Common Tasks

### Adding a New Migration

1. Create a new SQL file in `migrations/`
2. Add your schema changes
3. Run `npm run db:push`

### Modifying Security Policies

1. Create a new migration for policy changes
2. Test thoroughly with different user roles
3. Push changes using `npm run db:push`

### Using Vector Search

```sql
-- Example: Find similar content
select * from match_content_embeddings(
  query_embedding,
  0.8,  -- similarity threshold
  5     -- number of results
);
```

### Managing Background Jobs

```sql
-- Example: Enqueue a job
insert into job_queue (job_type, payload)
values ('process_content', '{"content_id": "123"}');
```

## Best Practices

1. **Migrations**
   - One feature per migration
   - Include rollback logic
   - Test migrations locally first

2. **Security**
   - Always enable RLS on new tables
   - Test policies thoroughly
   - Use service role sparingly

3. **Performance**
   - Index frequently queried columns
   - Monitor vector search performance
   - Keep job queue size in check

4. **Maintenance**
   - Regular backups
   - Monitor storage usage
   - Keep extensions updated
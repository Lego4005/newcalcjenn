# Memory Bank Session Guide

## Project Setup Options

### 1. New Regular Projects

```bash
~/templates/create-project.sh project-name
```

### 2. New Next.js Projects

First create Next.js project:

```bash
npx create-next-app@latest project-name --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Then add Memory Bank:

```bash
cd project-name
./add-memory-bank.sh
```

### 3. Existing Projects

In your project directory:

```bash
./add-memory-bank.sh
```

## Ending a Session

1. Update Memory Bank:

```bash
# Run status check to see current state
npm run status

# Update these files with latest progress:
docs/cline_docs/activeContext.md  # Current state
docs/cline_docs/progress.md       # Progress updates
tasks.md                         # Task status
```

2. Commit changes (optional but recommended):

```bash
git add .
git commit -m "Update Memory Bank: [brief description]"
```

## Starting a New Session

1. Quick Status Check:

```bash
npm run status
```

2. Key Files to Share:

- docs/cline_docs/projectbrief.md (Project requirements)
- docs/cline_docs/activeContext.md (Current state)
- tasks.md (Current tasks)

3. Quick Command:

```bash
# Show current state and tasks
npm run status:incomplete
```

## Essential Files

1. projectbrief.md: Project requirements and goals
2. activeContext.md: Current state and next steps
3. tasks.md: Task tracking with status emojis
4. progress.md: Implementation progress
5. techContext.md: Technical details
6. systemPatterns.md: Architecture patterns

## Status Emojis

- ✅ Completed
- ⚠️ In Progress
- ❌ Not Started

## Project Types

### Regular Projects

- Basic project structure
- Suitable for most projects
- Complete Memory Bank setup

### Next.js Projects

- TypeScript + Tailwind
- App Router
- ESLint configuration
- src/ directory structure
- Memory Bank integration

### Existing Projects

- Adds Memory Bank system
- Preserves existing structure
- Adds status tracking

## Supabase Setup Guide

### 1. Initialize Project Structure

```bash
# Create Supabase configuration
mkdir -p supabase/migrations
touch supabase/config.toml
```

### 2. Add Advanced Capabilities

The template includes support for:

- Vector Search (pgvector)
  - Semantic search
  - AI embeddings
  - Similarity matching

- Job Queue System (pg_net)
  - Background processing
  - Scheduled tasks
  - Retry mechanisms

- Multi-tenant Security
  - Row Level Security (RLS)
  - Tenant isolation
  - Role-based access

### 3. Database Setup

First, get your Supabase access token:
1. Visit https://supabase.com/dashboard/account/tokens
2. Create a new access token
3. Add it to your .env.local file:
```bash
SUPABASE_ACCESS_TOKEN=your_access_token_here
```

Then run the setup script:
```bash
npm run db:setup

# This will:
# - Link to your Supabase project
# - Push the database schema with all extensions and tables
# - Set up RLS policies and security
```


Note: Always share projectbrief.md first in a new session to provide context.
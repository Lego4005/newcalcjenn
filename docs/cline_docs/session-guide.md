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

## Daily Workflow

### 1. Starting a Session
```bash
# Quick status check
mbs

# View current state
mb

# See incomplete tasks
mbi

# Open all documentation
mbv
```

### 2. During Development
- Keep activeContext.md updated with changes
- Document decisions as you make them
- Update task status regularly
- Run `mbs` after major changes

### 3. Ending a Session
```bash
# Update these files:
docs/cline_docs/activeContext.md  # Current state
docs/cline_docs/progress.md       # Progress updates
tasks.md                          # Task status

# Check final status
mbs

# Optional but recommended:
git add .
git commit -m "Update Memory Bank: [brief description]"
```

## Essential Files

1. projectbrief.md: Project requirements and goals
2. activeContext.md: Current state and next steps
3. tasks.md: Task tracking with status emojis
4. progress.md: Implementation progress
5. techContext.md: Technical details
6. systemPatterns.md: Architecture patterns

## Supabase Integration

### 1. Initialize Project Structure
```bash
# Create Supabase configuration
mkdir -p supabase/migrations
touch supabase/config.toml
```

### 2. Advanced Capabilities
The template includes support for:

- Vector Search (pgvector)
  * Semantic search
  * AI embeddings
  * Similarity matching

- Job Queue System (pg_net)
  * Background processing
  * Scheduled tasks
  * Retry mechanisms

- Multi-tenant Security
  * Row Level Security (RLS)
  * Tenant isolation
  * Role-based access

### 3. Database Setup
1. Get Supabase access token:
   - Visit https://supabase.com/dashboard/account/tokens
   - Create new access token
   - Add to .env.local:
   ```bash
   SUPABASE_ACCESS_TOKEN=your_access_token_here
   ```

2. Run setup:
   ```bash
   npm run db:setup
   ```
   This will:
   - Link to your Supabase project
   - Push database schema with extensions
   - Set up RLS policies and security

## Status Indicators
- ✅ Completed
- ⚠️ In Progress
- ❌ Not Started

## Tips
- Always start with `mbs` to get current status
- Keep activeContext.md up to date
- Document decisions as you make them
- Update task status regularly
- Share projectbrief.md first in new sessions
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

### Infrastructure Setup

Each project type supports advanced infrastructure features:

1. **Supabase Setup**
   - See [Supabase Setup Guide](../guides/supabase-setup.md) for:
     - Vector search (pgvector)
     - Job queue system (pg_net)
     - Multi-tenant security (RLS)
     - AI capabilities
   - Run `npm run db:setup` after configuration
   - Check `supabase/migrations` for schema

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

Note: Always share projectbrief.md first in a new session to provide context.
# Next.js + Supabase Template

This template provides a minimal setup for Next.js with Supabase integration.

## Quick Start

1. Create a new project from this template:
```bash
cp -r ~/templates/project-template/* your-project-directory/
```

2. Install dependencies and set up Supabase:
```bash
cd your-project-directory
npm install
npm run setup
```

3. Update `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Start developing:
```bash
npm run dev
```

## Using Supabase

### Client-side
```typescript
import { supabase } from '@/lib/supabase/client'

// Example query
const { data, error } = await supabase
  .from('your_table')
  .select('*')
```

### Server-side
```typescript
import { createClient } from '@/lib/supabase/server'

// In a server component or API route
const supabase = createClient()
const { data, error } = await supabase
  .from('your_table')
  .select('*')
```

## Features

- ✅ Next.js 14 App Router
- ✅ Supabase Client & Server components
- ✅ TypeScript support
- ✅ Authentication ready
- ✅ Environment variables setup
- ✅ Minimal configuration needed

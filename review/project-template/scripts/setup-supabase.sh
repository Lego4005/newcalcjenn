#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Supabase...${NC}"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${BLUE}Creating .env.local...${NC}"
    cat > .env.local << EOL
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EOL
    echo -e "${GREEN}Created .env.local - Please update with your Supabase credentials${NC}"
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

# Create middleware.ts for auth
echo -e "${BLUE}Setting up auth middleware...${NC}"
cat > src/middleware.ts << EOL
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}
EOL

echo -e "${GREEN}✅ Supabase setup complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Update .env.local with your Supabase project credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Import and use Supabase clients from src/lib/supabase:"
echo "   - Client-side: import { supabase } from '@/lib/supabase/client'"
echo "   - Server-side: import { createClient } from '@/lib/supabase/server'"
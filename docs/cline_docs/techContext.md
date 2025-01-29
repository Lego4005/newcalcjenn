# Technical Context

## Technologies Used
1. Core Framework
   - Next.js 15.1.2
   - React 19.0.0
   - TypeScript
   - Node.js

2. UI Libraries
   - HeroUI components
   - Tailwind CSS
   - Framer Motion
   - Lucide icons

3. Backend Services
   - Supabase Authentication
   - Supabase Database
   - Row Level Security
   - Local Storage API
   - Browser APIs

4. Development Tools
   - ESLint
   - Prettier
   - Jest
   - Turbopack
   - SonarQube

## Development Setup
1. Environment Requirements
   - Node.js
   - npm/yarn
   - Git
   - VSCode (recommended)

2. Installation Steps
   ```bash
   npm install --legacy-peer-deps
   npm run dev
   ```

3. Environment Variables
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

4. Database Setup
   ```sql
   -- Create profiles table
   create table profiles (
     id uuid references auth.users primary key,
     email text not null,
     role text check (role in ('agent', 'broker')),
     created_at timestamptz default now(),
     updated_at timestamptz default now()
   );

   -- Enable RLS
   alter table profiles enable row level security;

   -- Create RLS policies
   create policy "Users can read own profile"
     on profiles for select using (auth.uid() = id);
   ```

## Technical Constraints
1. Browser Support
   - Modern browsers only
   - No IE11 support
   - Mobile responsive

2. Performance Requirements
   - Fast initial load
   - Smooth calculations
   - Responsive UI
   - Optimized images

3. Security Considerations
   - Authentication required
   - Role-based access control
   - Row Level Security
   - Data validation
   - XSS prevention
   - CSRF protection

4. Dependencies
   - React 19 compatibility
   - HeroUI integration
   - Framer Motion animations
   - Supabase client
   - Next/Image optimization

## Development Guidelines
1. Code Style
   - TypeScript strict mode
   - ESLint rules
   - Prettier formatting
   - JSDoc comments

2. Testing Requirements
   - Unit tests for calculations
   - Component testing
   - Integration tests
   - E2E testing
   - Auth flow testing

3. Performance Guidelines
   - Optimize bundle size
   - Minimize re-renders
   - Lazy loading
   - Code splitting
   - Image optimization
   - LCP optimization

4. Deployment
   - Vercel hosting
   - Environment configuration
   - Build optimization
   - Cache strategies
   - Database migrations

5. Authentication Flow
   - User registration with role
   - Profile creation
   - Login validation
   - Session management
   - Role-based routing
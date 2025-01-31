-- Enable required extensions
create extension if not exists vector;
create extension if not exists pg_net;

-- Organizations (Marketing Agencies)
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Clients (Financial Advisors)
create table clients (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id),
  name text not null,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Campaigns
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

-- Events
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

-- Content Embeddings for AI features
create table content_embeddings (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id),
  content_type text not null,
  content_id uuid not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Job Queue for background processing
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

-- Create function to search similar content
create or replace function match_content_embeddings (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content_type text,
  content_id uuid,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    content_embeddings.id,
    content_embeddings.content_type,
    content_embeddings.content_id,
    1 - (content_embeddings.embedding <=> query_embedding) as similarity
  from content_embeddings
  where 1 - (content_embeddings.embedding <=> query_embedding) > match_threshold
  order by content_embeddings.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RLS Policies

-- Enable RLS on all tables
alter table organizations enable row level security;
alter table clients enable row level security;
alter table campaigns enable row level security;
alter table events enable row level security;
alter table content_embeddings enable row level security;
alter table job_queue enable row level security;

-- Organizations policies
create policy "org_isolation" on organizations
  for all
  using (auth.jwt() ->> 'org_id' = id::text);

-- Clients policies
create policy "client_isolation" on clients
  for all
  using (org_id::text = auth.jwt() ->> 'org_id');

-- Campaigns policies
create policy "campaign_isolation" on campaigns
  for all
  using (org_id::text = auth.jwt() ->> 'org_id');

-- Events policies
create policy "event_isolation" on events
  for all
  using (org_id::text = auth.jwt() ->> 'org_id');

-- Content embeddings policies
create policy "content_embeddings_isolation" on content_embeddings
  for all
  using (org_id::text = auth.jwt() ->> 'org_id');

-- Job queue policies
create policy "job_queue_isolation" on job_queue
  for all
  using (org_id::text = auth.jwt() ->> 'org_id');
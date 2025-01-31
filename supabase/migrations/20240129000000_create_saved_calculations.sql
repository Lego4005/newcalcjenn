create table if not exists saved_calculations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  property_details jsonb not null,
  mortgage_info jsonb not null,
  commission_structure jsonb not null,
  additional_fees jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster lookups by user_id
create index saved_calculations_user_id_idx on saved_calculations(user_id);

-- Create trigger to update updated_at timestamp
create trigger update_saved_calculations_updated_at
  before update on saved_calculations
  for each row
  execute function update_updated_at_column();

-- Enable Row Level Security
alter table saved_calculations enable row level security;

-- Create policy to allow users to only see their own calculations
create policy "Users can only see their own calculations"
  on saved_calculations
  for all
  using (auth.uid() = user_id);

-- Create function to get user's saved calculations
create or replace function get_user_calculations(p_user_id uuid)
returns setof saved_calculations
language sql
security definer
set search_path = public
stable
as $$
  select *
  from saved_calculations
  where user_id = p_user_id
  order by updated_at desc;
$$;
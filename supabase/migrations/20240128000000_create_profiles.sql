create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null check (role in ('agent', 'broker')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;

-- Create policy to allow users to read their own profile
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

-- Create policy to allow users to update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Create policy to allow users to insert their own profile
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Create trigger to update updated_at timestamp
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();
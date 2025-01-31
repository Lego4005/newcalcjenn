-- Add share_id column for public sharing
alter table saved_calculations 
  add column if not exists share_id uuid unique default uuid_generate_v4(),
  add column if not exists is_public boolean default false;

-- Create policy to allow public access to shared calculations
create policy "Anyone can view public calculations"
  on saved_calculations
  for select
  using (is_public = true);

-- Function to get a shared calculation by share_id
create or replace function get_shared_calculation(p_share_id uuid)
returns setof saved_calculations
language sql
security definer
set search_path = public
stable
as $$
  select *
  from saved_calculations
  where share_id = p_share_id
    and is_public = true
  limit 1;
$$;

-- Function to toggle calculation sharing
create or replace function toggle_calculation_sharing(p_calculation_id uuid, p_is_public boolean)
returns saved_calculations
language plpgsql
security definer
as $$
declare
  v_calculation saved_calculations;
begin
  update saved_calculations
  set 
    is_public = p_is_public,
    share_id = case when p_is_public then coalesce(share_id, uuid_generate_v4()) else share_id end
  where id = p_calculation_id
    and user_id = auth.uid()
  returning * into v_calculation;
  
  return v_calculation;
end;
$$;
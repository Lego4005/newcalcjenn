create table if not exists calculator_defaults (
  id bigint primary key,
  default_buyer_agent_commission numeric not null,
  default_seller_agent_commission numeric not null,
  default_settlement_fee numeric not null,
  default_title_search numeric not null,
  default_municipal_lien_search numeric not null,
  default_doc_stamp_rate numeric not null,
  title_insurance_base_rate numeric not null,
  title_insurance_excess_rate numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default values for Florida
insert into calculator_defaults (
  id,
  default_buyer_agent_commission,
  default_seller_agent_commission,
  default_settlement_fee,
  default_title_search,
  default_municipal_lien_search,
  default_doc_stamp_rate,
  title_insurance_base_rate,
  title_insurance_excess_rate
) values (
  1, -- We'll always use ID 1 for the default settings
  3.00, -- 3% default buyer agent commission
  3.00, -- 3% default seller agent commission
  595.00, -- Default settlement fee
  150.00, -- Default title search fee
  150.00, -- Default municipal lien search fee
  0.70, -- $0.70 per $100 in Florida
  5.75, -- $5.75 per thousand up to $100,000
  5.00 -- $5.00 per thousand between $100,000 and $1 million
);

-- Create trigger to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_calculator_defaults_updated_at
  before update on calculator_defaults
  for each row
  execute function update_updated_at_column(); 
-- Thoughts table
create table if not exists thoughts (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  created_at timestamp with time zone default now(),
  user_id uuid references auth.users(id)
);

-- Enable Row Level Security
alter table thoughts enable row level security;

-- Policies
create policy "Users can view all thoughts" on thoughts
for select using (true);

create policy "Users can insert their own thoughts" on thoughts
for insert with check (auth.uid() = user_id);

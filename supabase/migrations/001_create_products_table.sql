-- Create products table
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  brand text not null,
  category text not null,
  price numeric not null,
  stockStatus text not null check (stockStatus in ('in_stock', 'out_of_stock')),
  image text not null,
  uses text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

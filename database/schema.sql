begin;

create table if not exists properties (
  id text primary key,
  name text not null,
  city text not null,
  address text not null,
  monthly_rent numeric(12, 2) not null check (monthly_rent >= 0),
  status text not null check (status in ('occupied', 'vacant')),
  created_at timestamptz not null default now()
);

create table if not exists guests (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id text primary key,
  property_id text not null references properties(id) on delete restrict,
  guest_id text not null references guests(id) on delete restrict,
  check_in date not null,
  check_out date not null,
  status text not null check (status in ('confirmed', 'active', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  constraint booking_dates_are_ordered check (check_out > check_in)
);

create table if not exists maintenance_requests (
  id text primary key,
  property_id text not null references properties(id) on delete restrict,
  title text not null,
  description text not null,
  priority text not null check (priority in ('low', 'medium', 'high', 'critical')),
  status text not null check (status in ('open', 'in_progress', 'resolved')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_property_dates_idx on bookings(property_id, check_in, check_out);
create index if not exists bookings_status_idx on bookings(status);
create index if not exists maintenance_property_idx on maintenance_requests(property_id);
create index if not exists maintenance_queue_idx on maintenance_requests(status, priority, created_at desc);

commit;

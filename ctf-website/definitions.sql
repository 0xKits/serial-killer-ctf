-- Attachments table
create table public.attachments (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  question bigint not null,
  object_name text not null,
  object_path text not null,
  constraint attachments_pkey primary key (id),
  constraint attachments_question_fkey foreign KEY (question) references questions (id)
) TABLESPACE pg_default;

-- Profiles table
create table public.profiles (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  "user" uuid not null,
  username text not null,
  constraint profiles_pkey primary key (id),
  constraint profiles_user_key unique ("user"),
  constraint profiles_username_key unique (username),
  constraint profiles_user_fkey foreign KEY ("user") references auth.users (id),
  constraint profiles_username_check check ((length(username) <= 24))
) TABLESPACE pg_default;

-- Questions table
create table public.questions (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  title text not null,
  description text not null,
  task text not null,
  index bigint not null,
  flag text not null,
  constraint questions_pkey primary key (id),
  constraint questions_index_key unique (index)
) TABLESPACE pg_default;

-- User Solves table
create table public.user_solves (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  question bigint not null,
  player uuid not null,
  constraint user_solves_pkey primary key (id),
  constraint user_solves_player_fkey foreign KEY (player) references profiles ("user"),
  constraint user_solves_question_fkey foreign KEY (question) references questions (id)
) TABLESPACE pg_default;
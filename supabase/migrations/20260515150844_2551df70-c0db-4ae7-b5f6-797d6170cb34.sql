create or replace function public.is_simulado_admin(_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = _uid), false);
$$;

drop policy if exists "Authenticated can view quiz attempts" on public.quiz_attempts;

create policy "Simulado admins can view quiz attempts"
on public.quiz_attempts
for select
to authenticated
using (public.is_simulado_admin(auth.uid()));
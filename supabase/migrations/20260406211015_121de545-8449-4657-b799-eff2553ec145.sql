
-- 1. KUDOS
DROP POLICY IF EXISTS "System can manage user balances" ON public.kudos_user_balances;
CREATE POLICY "Kudos admins manage user balances" 
  ON public.kudos_user_balances FOR ALL TO authenticated
  USING (is_kudos_admin_for_org(organization_id, auth.uid()));
CREATE POLICY "Users can read own balance" 
  ON public.kudos_user_balances FOR SELECT
  USING (user_id = auth.uid());

-- 2. BOOKS
DROP POLICY IF EXISTS "Anyone can manage books" ON public.books;
DROP POLICY IF EXISTS "Anyone can manage book audio mappings" ON public.book_audio_mappings;
CREATE POLICY "Public can read books" ON public.books FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage books" ON public.books FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public can read book audio mappings" ON public.book_audio_mappings FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage book audio mappings" ON public.book_audio_mappings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. GATEWAY
DROP POLICY IF EXISTS "Authenticated users can manage step entries" ON public.gateway_application_step_entries;
CREATE POLICY "Authenticated can manage step entries" ON public.gateway_application_step_entries FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage pipeline steps" ON public.gateway_pipeline_steps;
CREATE POLICY "Gateway admins manage pipeline steps" ON public.gateway_pipeline_steps FOR ALL TO authenticated
  USING (is_system_admin_simple(auth.uid()) OR is_gateway_admin_simple(organization_id, auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can manage step attachments" ON public.gateway_step_attachments;
CREATE POLICY "Authenticated can manage step attachments" ON public.gateway_step_attachments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. SYSTEM LOGS
DROP POLICY IF EXISTS "System can insert AI usage logs" ON public.ai_function_usage;
CREATE POLICY "Authenticated can insert AI usage logs" ON public.ai_function_usage FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "System can insert cleanup logs" ON public.auth_cleanup_logs;
CREATE POLICY "Service role can insert cleanup logs" ON public.auth_cleanup_logs FOR INSERT TO service_role WITH CHECK (true);

DROP POLICY IF EXISTS "Users can create error logs" ON public.error_logs;
CREATE POLICY "Authenticated can create error logs" ON public.error_logs FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "System can insert email logs" ON public.kudos_email_logs;
CREATE POLICY "Service role can insert email logs" ON public.kudos_email_logs FOR INSERT TO service_role WITH CHECK (true);

DROP POLICY IF EXISTS "System can insert kudos recipients" ON public.kudos_recipients;
CREATE POLICY "Authenticated can insert kudos recipients" ON public.kudos_recipients FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "System can insert article versions" ON public.beacon_wiki_article_versions;
CREATE POLICY "Authenticated can insert article versions" ON public.beacon_wiki_article_versions FOR INSERT TO authenticated WITH CHECK (true);

-- 5. FUNCTION SEARCH PATH
ALTER FUNCTION public.get_workspace_actions(uuid, uuid, boolean) SET search_path = public;
ALTER FUNCTION public.is_gateway_admin_simple(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.refresh_user_engagement_score(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.refresh_workspace_rankings(uuid) SET search_path = public;
ALTER FUNCTION public.trg_fn_engagement_actions() SET search_path = public;
ALTER FUNCTION public.trg_fn_engagement_impediments() SET search_path = public;
ALTER FUNCTION public.trg_fn_engagement_initiatives() SET search_path = public;
ALTER FUNCTION public.trg_fn_engagement_learnings() SET search_path = public;
ALTER FUNCTION public.trg_fn_engagement_test_cards() SET search_path = public;
ALTER FUNCTION public.update_gateway_updated_at() SET search_path = public;
ALTER FUNCTION public.update_organization_tags_updated_at() SET search_path = public;

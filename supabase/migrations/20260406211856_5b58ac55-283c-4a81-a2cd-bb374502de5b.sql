-- Remover políticas permissivas atuais
DROP POLICY IF EXISTS "Authenticated can manage books" ON public.books;
DROP POLICY IF EXISTS "Authenticated can manage book audio mappings" ON public.book_audio_mappings;

-- Criar políticas de escrita restritas a system admins
CREATE POLICY "System admins can manage books" 
  ON public.books FOR ALL TO authenticated
  USING (is_system_admin_simple(auth.uid()))
  WITH CHECK (is_system_admin_simple(auth.uid()));

CREATE POLICY "System admins can manage book audio mappings" 
  ON public.book_audio_mappings FOR ALL TO authenticated
  USING (is_system_admin_simple(auth.uid()))
  WITH CHECK (is_system_admin_simple(auth.uid()));
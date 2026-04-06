

## Plano: Restringir escrita em `books` e `book_audio_mappings` a admins

### Problema
As tabelas `books` e `book_audio_mappings` permitem que qualquer usuário autenticado faça INSERT, UPDATE e DELETE. O ideal é restringir escrita apenas a administradores do sistema.

### Contexto
- A tabela `books` **não tem** coluna `organization_id`, então não é possível usar verificação por organização.
- Existe a função `is_system_admin_simple(uuid)` que verifica se o usuário é admin global via `profiles.is_admin`.
- A leitura pública (SELECT) deve continuar funcionando.

### Migration SQL

```sql
-- Remover políticas permissivas atuais
DROP POLICY IF EXISTS "Authenticated can manage books" ON public.books;
DROP POLICY IF EXISTS "Authenticated can manage book audio mappings" ON public.book_audio_mappings;

-- Manter SELECT público
-- (política "Public can read books" já existe)
-- (política "Public can read book audio mappings" já existe)

-- Criar políticas de escrita restritas a system admins
CREATE POLICY "System admins can manage books" 
  ON public.books FOR ALL TO authenticated
  USING (is_system_admin_simple(auth.uid()))
  WITH CHECK (is_system_admin_simple(auth.uid()));

CREATE POLICY "System admins can manage book audio mappings" 
  ON public.book_audio_mappings FOR ALL TO authenticated
  USING (is_system_admin_simple(auth.uid()))
  WITH CHECK (is_system_admin_simple(auth.uid()));
```

### Impacto
- Leitura pública continua funcionando normalmente
- Apenas usuários com `profiles.is_admin = true` poderão criar, editar ou deletar livros
- Este projeto (scrum-simulado) não usa essas tabelas, então zero impacto aqui
- O projeto de livros continuará funcionando desde que os editores sejam system admins

### Nenhuma alteração de código necessária


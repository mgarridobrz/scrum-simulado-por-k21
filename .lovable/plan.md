

## Plano: Corrigir Políticas RLS Sempre Verdadeiras

### Problema
Várias tabelas deste projeto têm políticas RLS com `USING(true)` ou `WITH CHECK(true)` em operações INSERT, UPDATE, DELETE ou ALL — o que é excessivamente permissivo.

### Tabelas Afetadas (deste projeto)

| Tabela | Política | Operação | Risco |
|---|---|---|---|
| `game_attempts` | 2 políticas INSERT duplicadas | INSERT | Baixo (dados públicos de jogo), mas duplicada |
| `game_attempts_backup` | ALL com `USING(true)` para `{public}` | ALL | **Alto** — qualquer pessoa pode ler/editar/deletar backups |
| `quiz_questions` | INSERT e UPDATE com `true` para `{public}` | INSERT, UPDATE | **Médio** — qualquer pessoa pode inserir ou alterar questões |
| `quiz_questions_backup` | ALL com `true` para `{public}` | ALL | **Alto** — acesso total a backups |
| `quiz_attempts` | INSERT com `true` | INSERT | Baixo (precisa ser público para salvar tentativas) |
| `quiz_categories` | INSERT com `true` | INSERT | **Médio** — qualquer pessoa pode criar categorias |

### Solução

#### Migration SQL

```sql
-- 1. game_attempts: remover política INSERT duplicada
DROP POLICY IF EXISTS "Anyone can create game attempts" ON public.game_attempts;
-- Manter apenas "Anyone can insert game attempts"

-- 2. game_attempts_backup: restringir a admins autenticados
DROP POLICY IF EXISTS "System admins can manage game attempts backup" 
  ON public.game_attempts_backup;
CREATE POLICY "No public access to game_attempts_backup"
  ON public.game_attempts_backup FOR ALL USING (false);

-- 3. quiz_questions: remover INSERT/UPDATE público, restringir a admins
DROP POLICY IF EXISTS "Public can insert quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Public can update quiz questions" ON public.quiz_questions;
-- Manter SELECT público (necessário para o quiz funcionar)

-- 4. quiz_questions_backup: bloquear acesso público
DROP POLICY IF EXISTS "Allow all operations on quiz_questions_backup" 
  ON public.quiz_questions_backup;
CREATE POLICY "No public access to quiz_questions_backup"
  ON public.quiz_questions_backup FOR ALL USING (false);

-- 5. quiz_categories: remover INSERT público
DROP POLICY IF EXISTS "Public can insert quiz categories" ON public.quiz_categories;
-- Manter SELECT público

-- 6. quiz_attempts: manter INSERT público (necessário para funcionalidade)
-- Nenhuma mudança — é intencional que usuários anônimos salvem tentativas
```

#### Atualizar código (se necessário)

Verificar se `src/utils/migrateQuestionsToDb.ts` ou a página de validação de questões usam INSERT/UPDATE em `quiz_questions` ou `quiz_categories` — se sim, essas operações precisarão ser feitas via Edge Function autenticada ou aceitar que só funcionarão com service_role.

### Impacto
- Quiz e jogo continuam funcionando normalmente (SELECT e INSERT de tentativas mantidos)
- Questões e categorias não poderão mais ser alteradas por usuários anônimos
- Tabelas de backup ficam completamente protegidas
- Política duplicada removida


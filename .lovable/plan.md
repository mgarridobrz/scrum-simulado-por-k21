

## Plano: Corrigir INSERTs de quiz e game que estão falhando

### Problema
Desde a migration de segurança do dia 6 de abril, **nenhuma tentativa de quiz ou game está sendo salva**. As tentativas estão sendo perdidas.

### Causa raiz
Os INSERTs em `quiz_attempts` e `game_attempts` usam `.insert({...}).select('id').single()`. O `.select('id')` requer permissão de SELECT na tabela. Como removemos o SELECT público (para proteger emails), o Supabase faz **rollback do INSERT inteiro** quando o SELECT falha.

O mesmo problema afeta a duplicate check do quiz, que faz SELECT em `quiz_attempts` antes do insert.

### Solução

**Duas alterações de código** (sem mudança no banco):

1. **`src/utils/quizTracking.ts`**:
   - Duplicate check (linha 227): trocar `.from('quiz_attempts')` para `.from('quiz_attempts_public')` — a view pública tem os campos necessários (id, created_at, score, completion_time_seconds)
   - INSERT (linha 270-283): remover `.select('id').single()` — fazer apenas `.insert({...})` sem tentar ler o ID de volta

2. **`src/utils/gameTracking.ts`**:
   - INSERT (linha 63-79): remover `.select('id').single()` — fazer apenas `.insert({...})` sem tentar ler o ID de volta
   - Ajustar o retorno para não depender de `data.id`

### Impacto
- INSERTs voltam a funcionar imediatamente
- O ID retornado será `null` em vez do UUID real (nenhum código depende criticamente desse ID)
- Emails continuam protegidos
- Nenhuma mudança de banco necessária

### Tentativas perdidas
Infelizmente, as tentativas feitas entre 6 e 9 de abril **foram perdidas** — elas nunca chegaram ao banco. Não há como recuperá-las.


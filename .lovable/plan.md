

## Plano: Corrigir listagem de tentativas no admin

### Problema
Após restringir o SELECT da tabela `quiz_attempts` para `authenticated`, a página admin (que usa `anon` — autenticação por senha, não Supabase auth) não consegue mais ler as tentativas. Resultado: lista vazia e stats zerados no admin.

**A homepage está funcionando corretamente** — os console logs mostram 3339 tentativas e 571 jogos. O problema é apenas no admin.

### Causa raiz
A função `getTrackedQuizAttempts` (usada pela lista de tentativas no admin) ainda lê da tabela base `quiz_attempts`, não da view `quiz_attempts_public`. Como o admin não tem Supabase auth (usa password via RPC), a role é `anon`, que não tem mais SELECT na tabela base.

### Solução

**Alteração de código** em `src/utils/quizTracking.ts`:
- Trocar `getTrackedQuizAttempts` para ler de `quiz_attempts_public` em vez de `quiz_attempts`
- Remover a referência a `row.email` no mapeamento (a view não expõe email)

**Impacto**:
- A lista de tentativas no admin voltará a funcionar
- O email não aparecerá mais na lista de tentativas do admin (tradeoff de segurança — email está protegido)
- Se o email for necessário no admin, precisaremos implementar Supabase auth real na página de validação (escopo maior)

### Alternativa (se email for necessário no admin)
Implementar login real com Supabase auth na página admin, para que as queries rodem como `authenticated` e possam acessar a tabela base com email. Isso seria um escopo maior.


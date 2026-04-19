

## Plano: Corrigir duplicação de FAQPage + sitemap dos domínios customizados

### Problema 1 — FAQPage duplicado (erro reportado pelo GSC)

O Google Search Console acusou: **"O campo FAQPage está duplicado"** em `https://simuladocsm.com/`.

**Causa:** O FAQPage existe em dois lugares:
1. Estático em `index.html` (`#static-jsonld`) — adicionado na otimização anterior
2. Dinâmico em `src/hooks/useMetaTags.ts` — `getPageMetaTags('/')` injeta novamente o FAQPage no `@graph` da homepage

Resultado: ao carregar a home, o crawler vê **dois blocos JSON-LD com FAQPage** — um inválido para Google.

### Problema 2 — Sitemap não cobre os domínios customizados

O `public/sitemap.xml` só lista URLs de `simulado-csm.k21.global`. Mas o site é servido também em `simuladocsm.com` e `csmpracticeexam.com` (custom domains do GSC). Cada propriedade do GSC precisa do seu próprio sitemap apontando para o seu próprio domínio, senão o Google ignora as URLs por não serem do mesmo host.

### Solução

**1. Remover FAQPage do JSON-LD dinâmico da homepage** (`src/hooks/useMetaTags.ts`)
- No case `'/'`, remover `faqSchema` do `@graph` (deixar só `orgSchema` e `webSchema`).
- O FAQPage estático em `index.html` continua sendo a fonte única para o Google.
- Manter `getFaqSchema` exportável (ainda é usado por `getFaqData` no componente visível).

**2. Criar sitemaps por domínio**
- `public/sitemap.xml` (atual) — manter com URLs de `simulado-csm.k21.global` (Lovable preview/staging).
- `public/sitemap-simuladocsm.xml` — URLs com host `https://simuladocsm.com` (PT-BR canonical).
- `public/sitemap-csmpracticeexam.xml` — URLs com host `https://csmpracticeexam.com` (EN canonical).
- Atualizar `public/robots.txt` para listar os três sitemaps.

**3. Atualizar `lastmod` para 2026-04-19** em todos os sitemaps.

### Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `src/hooks/useMetaTags.ts` | Remover `faqSchema` do `@graph` da home (linha 170) |
| `public/sitemap.xml` | Atualizar `lastmod` |
| `public/sitemap-simuladocsm.xml` | Novo — URLs do domínio `simuladocsm.com` |
| `public/sitemap-csmpracticeexam.xml` | Novo — URLs do domínio `csmpracticeexam.com` |
| `public/robots.txt` | Listar os três sitemaps |

### Próximo passo manual (após deploy)
No Google Search Console, submeter os sitemaps específicos em cada propriedade:
- Em `simuladocsm.com` → submeter `/sitemap-simuladocsm.xml`
- Em `csmpracticeexam.com` → submeter `/sitemap-csmpracticeexam.xml`
- Pedir revalidação do erro de FAQPage duplicado

### Impacto
- Erro crítico do GSC (FAQPage duplicado) resolvido — Rich Results de FAQ voltam a funcionar.
- Indexação correta nos domínios customizados (cada propriedade GSC com seu próprio sitemap válido).
- Nenhuma quebra funcional — FAQ visível na página continua igual.


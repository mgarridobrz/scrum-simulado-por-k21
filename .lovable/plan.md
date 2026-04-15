

## Análise e Plano: Otimizar JSON-LD para SEO, AEO e GEO

### Diagnóstico

A estrutura atual cobre o básico (Organization, WebSite, FAQPage, BreadcrumbList), mas tem uma **vulnerabilidade crítica** e várias oportunidades:

#### Problema Critico: JSON-LD invisivel para a maioria dos crawlers

O structured data é injetado via `useEffect` no client-side. Isso significa:
- **Googlebot**: vê (renderiza JS) ✓
- **Bingbot, PerplexityBot, GPTBot, ClaudeBot**: provavelmente **NÃO veem** ✗
- Todo o investimento em JSON-LD é parcialmente desperdiçado para AEO/GEO

#### Schemas faltantes para o contexto educacional

O produto é um quiz de preparação para certificação, mas não usa `Quiz`, `LearningResource` ou `Course` -- schemas que AI engines e Google usam para recomendar recursos educacionais.

### Plano de Implementação

#### 1. Mover JSON-LD base para `index.html` (estático)

Inserir no `<head>` do `index.html` um `<script type="application/ld+json">` estático com o @graph da homepage (Organization, WebSite, FAQPage). Isso garante que **todos** os crawlers vejam o structured data, independente de JS.

O `useMetaTags.ts` continuará atualizando dinamicamente para as subpáginas (para o Googlebot que renderiza JS).

#### 2. Adicionar schemas educacionais

Adicionar ao @graph:
- **`LearningResource`** -- descreve o simulado como recurso educacional gratuito
- **`Course`** (do tipo practice exam) -- com `provider: K21`, `educationalLevel`, `about: Scrum/CSM`
- **`Quiz`** -- com `educationalUse: "assessment"`, `numberOfQuestions`, `isAccessibleForFree: true`

#### 3. Adicionar `EducationalOrganization`

Mudar o `@type` de `Organization` para `["Organization", "EducationalOrganization"]` para maior precisão semântica.

#### 4. Atualizar `lastmod` no sitemap

Atualizar as datas do sitemap.xml para a data atual.

#### 5. Adicionar schema `SoftwareApplication` para GEO

Incluir `SoftwareApplication` com `applicationCategory: "EducationalApplication"` para que AI engines categorizem corretamente a ferramenta.

### Arquivos alterados

| Arquivo | Alteração |
|---------|-----------|
| `index.html` | Adicionar bloco `<script type="application/ld+json">` estático no `<head>` com schemas base (PT + EN) |
| `src/hooks/useMetaTags.ts` | Adicionar `LearningResource`, `Quiz`, `EducationalOrganization`; atualizar lógica para não duplicar o schema estático |
| `public/sitemap.xml` | Atualizar `lastmod` para `2026-04-15` |

### Impacto esperado

- Crawlers sem JS (Bing, AI engines) passam a ver structured data
- Google Rich Results para FAQ, Quiz e Learning Resource
- AI engines (ChatGPT, Perplexity, Claude) recebem contexto semântico rico para recomendar o simulado
- Voice assistants podem usar SpeakableSpecification para respostas faladas


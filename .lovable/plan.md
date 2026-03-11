

## Plano de Otimização SEO e AEO

Este é um projeto extenso com 35 itens de checklist. Segue o plano organizado por prioridade.

---

### 1. Atualizar `index.html` — Preconnect e meta tags iniciais

Adicionar preconnect para GTM e meta robots aprimorada:

```html
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
```

Mover o script GTM para usar `defer` ou encapsular em `requestIdleCallback`.

---

### 2. Atualizar `src/hooks/useMetaTags.ts` — Melhorias de SEO

**Titles (max 60 chars):**
- PT: `Simulado CSM Gratuito | K21 Brasil` (35 chars)
- EN: `Free CSM Practice Exam | K21 Brazil` (36 chars)
- PT Ranking: `Ranking Simulado CSM | K21 Brasil` (33 chars)
- EN Ranking: `CSM Quiz Ranking | K21 Brazil` (29 chars)

**Descriptions (max 155 chars):**
- PT: `Simulado gratuito para certificação CSM da Scrum Alliance. 80 questões com explicações detalhadas. Prepare-se com a K21.` (121 chars)
- EN: `Free CSM certification practice test by K21. 80 Scrum questions with detailed explanations. Prepare for Scrum Alliance exam.` (124 chars)

**Robots tag:** Atualizar de `index, follow` para `index, follow, max-image-preview:large, max-snippet:-1`.

**og:image:** Usar URL absoluta baseada no domínio (não `window.location.origin` que pode ser localhost).

**Schema JSON-LD com @graph:** Adicionar schemas `Organization`, `WebSite`, `FAQPage` e `BreadcrumbList` (para ranking).

```typescript
structuredData: {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "name": "K21 Brasil", ... },
    { "@type": "WebSite", "name": "Simulado CSM", ... },
    { "@type": "FAQPage", "mainEntity": [...] }
  ]
}
```

**FAQ Schema:** 5-10 perguntas reais sobre CSM/Scrum, como:
- "O que é a certificação CSM?"
- "Quantas questões tem a prova CSM?"
- "Como é o formato da prova CSM?"
- "Qual a diferença entre CSM e PSM?"
- "Quanto custa a certificação CSM?"

**BreadcrumbList** para página de ranking:
```json
{ "@type": "BreadcrumbList", "itemListElement": [
  { "position": 1, "name": "Home", "item": "https://..." },
  { "position": 2, "name": "Ranking", "item": "https://.../ranking" }
]}
```

---

### 3. Atualizar `src/components/StartScreen.tsx` — H1 e alt de imagens

Garantir que o H1 contenha a palavra-chave principal. Verificar hierarquia H1 > H2 > H3. Adicionar `alt` descritivos em todas as imagens.

---

### 4. Atualizar `src/components/Footer.tsx` — FAQ visível

Adicionar seção de FAQ visível no footer da home que corresponda exatamente ao schema FAQPage. Isso garante consistência entre conteúdo visível e structured data (item 24).

---

### 5. Atualizar `src/components/Header.tsx` — aria-labels

Adicionar `aria-label` nos botões de compartilhamento e links que contenham apenas ícones.

---

### 6. Criar `public/robots.txt` — Atualizar com bots de IA

Substituir o robots.txt atual:

```text
# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: *
Allow: /

Sitemap: https://simulado-csm.k21.global/sitemap.xml

# LLM Context Files
# llms.txt: https://simulado-csm.k21.global/llms.txt
# llms-full.txt: https://simulado-csm.k21.global/llms-full.txt
```

---

### 7. Atualizar `public/sitemap.xml`

Adicionar rotas `/game`, `/us/game`, `/game/ranking`, `/us/game/ranking`. Atualizar `lastmod`.

---

### 8. Criar `public/llms.txt`

Conteúdo resumido: o que é, para quem, responsáveis (K21 Brasil), contato, FAQ curto.

```text
# Simulado CSM - K21 Brasil

## O que é
Simulado gratuito online para preparação da certificação CSM (Certified ScrumMaster) da Scrum Alliance.

## Para quem
Profissionais que desejam se certificar como Scrum Master pela Scrum Alliance.

## Oferecido por
K21 Brasil - Consultoria e treinamentos em Agilidade
Site: https://br.k21.global
WhatsApp: +55 21 3825-8624

## Funcionalidades
- Simulado com 80 questões no formato da prova oficial
- Modo jogo com timer
- Ranking global de participantes
- Disponível em Português e Inglês
- Explicações detalhadas para cada questão
- Relatório em PDF

## FAQ
Q: O simulado é gratuito?
A: Sim, 100% gratuito.

Q: Quantas questões tem?
A: Banco de 80 questões, com seleção de 10, 20, 30, 40 ou 50 por tentativa.

Q: O simulado substitui a prova oficial?
A: Não. É uma ferramenta de preparação. A certificação requer um curso oficial.
```

---

### 9. Criar `public/llms-full.txt`

Versão expandida com descrição de cada página, módulos, categorias de questões, diferenciais da K21 e FAQ completo com 10+ perguntas.

---

### 10. Atualizar `index.html` — og:image dimensões

Adicionar `og:image:width` e `og:image:height` (1200x630) no useMetaTags. Verificar se a imagem do logo é acessível publicamente.

---

### Detalhes Técnicos

**Arquivos modificados:**
- `index.html` — preconnect, robots meta, GTM defer
- `src/hooks/useMetaTags.ts` — titles, descriptions, robots, @graph schemas, FAQ, breadcrumb, og:image absoluta
- `src/components/Footer.tsx` — FAQ visível
- `src/components/Header.tsx` — aria-labels
- `src/components/StartScreen.tsx` — verificar H1, alt images
- `public/robots.txt` — bots de IA + referências llms
- `public/sitemap.xml` — rotas faltantes
- `public/llms.txt` — novo arquivo
- `public/llms-full.txt` — novo arquivo

**Limitação SPA:** Como este é um SPA React, o HTML inicial servido sem JS não conterá os meta tags dinâmicos. Os itens 20 e 32 (testar HTML sem JS) são limitações inerentes. O que está no `index.html` estático será o fallback. Crawlers modernos (Googlebot, GPTBot) executam JS.


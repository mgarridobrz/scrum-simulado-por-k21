

## Corrigir Vulnerabilidades de Segurança no jsPDF

### Problema
Duas vulnerabilidades no jsPDF ≤ 4.1.0:
- **CVE-2026-25535** (High): DoS via GIF malicioso no `addImage`
- **CVE-2026-25755** (High): PDF Object Injection no `addJS`

### Solução
Atualizar `jspdf` de `^4.1.0` para `^4.2.0` em `package.json`.

| Dependência | Atual | Nova |
|---|---|---|
| jspdf | ^4.1.0 | ^4.2.0 |

### Nota
O código em `src/utils/pdfGenerator.ts` não usa `addImage` nem `addJS`, então o risco prático é baixo. Porém a atualização elimina os alertas do GitHub e protege contra uso futuro desses métodos.


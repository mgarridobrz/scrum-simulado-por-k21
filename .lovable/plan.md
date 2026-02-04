
## Plano: Corrigir Vulnerabilidade de Segurança no jsPDF

### Problema
O GitHub detectou uma vulnerabilidade de segurança (CVE-2026-24737) na biblioteca jsPDF versão 3.0.1 usada no projeto.

### Solução
Atualizar o jsPDF para a versão 4.0.0 ou superior, que contém a correção de segurança.

---

### Alterações Necessárias

#### 1. Atualizar `package.json`

Modificar a versão do jsPDF:

| Dependência | Versão Atual | Nova Versão |
|-------------|--------------|-------------|
| jspdf | ^3.0.1 | ^4.0.0 |

```json
"jspdf": "^4.0.0",
```

---

### Nota Técnica

A atualização para jsPDF 4.0.0 é considerada uma "semver-major update" mas, segundo a documentação oficial, **não introduz outras mudanças que quebrem compatibilidade** além das correções de segurança.

O código atual em `src/utils/pdfGenerator.ts` usa apenas APIs básicas (criação de documento, texto e tabelas) que permanecem compatíveis na versão 4.0.0.

---

### Resultado Esperado
- Alerta de segurança do GitHub será resolvido automaticamente
- Funcionalidade de geração de PDF permanece inalterada
- Projeto protegido contra vulnerabilidades de PDF Injection e Path Traversal

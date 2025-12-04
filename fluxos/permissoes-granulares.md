# Permissões Granulares - Guia de Customização

## 🎯 Visão Geral

O sistema foi refatorado de uma **hierarquia linear** para **permissões granulares**, permitindo controle fino sobre quem acessa o quê.

### Antes vs. Depois

| Sistema    | Hierarquia              | Controle     | Exemplo                             |
| ---------- | ----------------------- | ------------ | ----------------------------------- |
| **Antigo** | Linear (1 < 2 < 3 < 99) | Tudo ou nada | Admin via tudo                      |
| **Novo**   | Permissões por role     | Granular     | Admin vê Auditoria, Implantação não |

---

## 📋 Definição Atual de Permissões

```javascript
const permissoesPorRole = {
  suporte: {
    permissoes: [
      "ver-docs",
      "ver-versoes",
      "ver-sync",
      "ver-usuarios",
      "ver-conteudos",
      "ver-faq",
    ],
  },
  implantacao: {
    permissoes: [
      "ver-docs",
      "ver-versoes",
      "ver-sync",
      "ver-cadastros",
      "ver-usuarios",
    ],
  },
  admin: {
    permissoes: [
      "ver-docs",
      "ver-versoes",
      "ver-sync",
      "ver-cadastros",
      "ver-usuarios",
      "ver-auditoria",
      "ver-faq",
      "ver-conteudos",
      "ver-apps",
    ],
  },
  master: {
    permissoes: ["*"], // Acesso total
  },
};
```

---

## 🔧 Como Customizar

### 1. Adicionar/Remover Permissão de um Role

**Arquivo**: `assets/js/auth.js`

```javascript
const permissoesPorRole = {
  suporte: {
    permissoes: [
      "ver-docs",
      "ver-faq",
      "ver-auditoria", // ← Adicione a linha
    ],
  },
};
```

### 2. Criar Novo Role

```javascript
const permissoesPorRole = {
  // ... outros roles ...
  gerente: {
    permissoes: [
      "ver-docs",
      "ver-versoes",
      "ver-usuarios",
      "ver-auditoria",
      "ver-conteudos",
    ],
  },
};
```

Depois, os usuários com `role = 'gerente'` no Supabase terão essas permissões.

### 3. Usar Permissões no HTML

Com o atributo `data-allowed-roles`:

```html
<button
  onclick="navegarPara('nova-pagina.html')"
  data-allowed-roles="gerente,admin"
>
  Página Restrita
</button>
```

### 4. Usar Permissões no JavaScript

Com a função `temPermissao()`:

```javascript
import { temPermissao } from "../assets/js/auth.js";

if (temPermissao("ver-auditoria")) {
  console.log("Usuário pode ver auditoria");
  // Exibe elemento
  document.getElementById("auditoria-section").style.display = "block";
}
```

---

## 🎯 Casos de Uso Prático

### ✅ Caso 1: Implantação Acessar Apenas Versões e Cadastros

**Situação**: Implantação não deve ver Auditoria, FAQ ou Conteúdos.

```javascript
'implantacao': {
    permissoes: [
        'ver-docs',
        'ver-versoes',
        'ver-sync',
        'ver-cadastros',
        'ver-usuarios'
    ]
}
```

**Resultado no Menu**:

- ✅ Baixar Versões
- ✅ Infarma Sync
- ✅ Clientes (Cadastros)
- ✅ Usuários
- ❌ Auditoria (escondido)
- ❌ FAQ (escondido)
- ❌ Conteúdos (escondido)
- ❌ Apps (escondido)

---

### ✅ Caso 2: Suporte com Acesso a FAQ mas Não a Auditoria

**Situação**: Suporte responde FAQ mas não acessa logs de sistema.

```javascript
'suporte': {
    permissoes: [
        'ver-docs',
        'ver-versoes',
        'ver-sync',
        'ver-usuarios',
        'ver-conteudos',
        'ver-faq'         // ← Tem FAQ
        // 'ver-auditoria'  ← Não tem Auditoria
    ]
}
```

**Resultado no Menu**:

- ✅ Documentação
- ✅ Versões
- ✅ Sync
- ✅ Usuários
- ✅ Conteúdos
- ✅ FAQ
- ❌ Auditoria (escondido)

---

### ✅ Caso 3: Novo Role "Gerente de Suporte"

**Situação**: Gerente supervisiona suporte, precisa de Auditoria + Usuários + FAQ.

```javascript
'gerente_suporte': {
    permissoes: [
        'ver-docs',
        'ver-versoes',
        'ver-usuarios',       // Gerencia suporte
        'ver-auditoria',      // Vê logs
        'ver-faq',            // Supervisiona FAQ
        'ver-conteudos'
    ]
}
```

**Uso no HTML**:

```html
<button data-allowed-roles="gerente_suporte">Painel de Supervisão</button>
```

---

### ✅ Caso 4: Admin com Acesso Total Menos Conteúdos

**Situação**: Admin gerencia sistema mas não edita conteúdos (outro time).

```javascript
'admin': {
    permissoes: [
        'ver-docs',
        'ver-versoes',
        'ver-sync',
        'ver-cadastros',
        'ver-usuarios',
        'ver-auditoria',
        'ver-faq',
        'ver-apps'
        // 'ver-conteudos'  ← Não incluído
    ]
}
```

---

## 📊 Tabela de Permissões Atual

| Botão     | suporte | implantacao | admin | master |
| --------- | ------- | ----------- | ----- | ------ |
| Versões   | ✅      | ✅          | ✅    | ✅     |
| Sync      | ✅      | ✅          | ✅    | ✅     |
| Docs      | ✅      | ✅          | ✅    | ✅     |
| Cadastros | ❌      | ✅          | ✅    | ✅     |
| Usuários  | ✅      | ✅          | ✅    | ✅     |
| Auditoria | ❌      | ❌          | ✅    | ✅     |
| FAQ       | ✅      | ❌          | ✅    | ✅     |
| Conteúdos | ✅      | ❌          | ✅    | ✅     |
| Apps      | ❌      | ❌          | ✅    | ✅     |

---

## 🔐 Funções Principais

### `temPermissao(permissao)`

Verifica se usuário atual tem uma permissão específica.

```javascript
import { temPermissao } from "../assets/js/auth.js";

if (temPermissao("ver-auditoria")) {
  // Usuário pode ver auditoria
}
```

### `verificarPermissao(cargosPermitidos)`

Verifica permissão ao entrar em página, redireciona se não tiver.

```javascript
import { verificarPermissao } from "../assets/js/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!verificarPermissao(["admin"])) {
    return; // Redireciona se não for admin
  }
  // Resto da lógica da página...
});
```

### `configurarInterface()`

Esconde botões sem permissão no carregamento da página.

```javascript
import { configurarInterface } from "../assets/js/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  configurarInterface(); // Esconde elementos não autorizados
});
```

---

## 🚀 Mudanças Realizadas

### De Hierarquia Linear Para Permissões

**ANTES**:

```javascript
const niveisDeAcesso = {
  suporte: 1,
  implantacao: 2,
  admin: 3,
  master: 99,
};

// Admin (3) via tudo de implantação (2)
return nivelUsuario >= nivelNecessario;
```

**DEPOIS**:

```javascript
const permissoesPorRole = {
    'suporte': { permissoes: ['ver-faq', ...] },
    'implantacao': { permissoes: ['ver-cadastros', ...] },
    'admin': { permissoes: ['ver-faq', 'ver-auditoria', ...] }
};

// Implantação só vê o que está listado
return permissoes.includes(permissao);
```

---

## ⚠️ Importante

1. **Mudanças precisam ser feitas em `auth.js`**
2. **Recarregar navegador após mudanças** (cache do JavaScript)
3. **Testar cada role com contas diferentes**
4. **Não esquecer de atualizar a tabela de permissões** quando adicionar novo role

---

## 📞 Suporte

Se precisar:

- Adicionar nova permissão
- Criar novo role
- Modificar permissões de um role

Faça as mudanças em `assets/js/auth.js` no objeto `permissoesPorRole`.

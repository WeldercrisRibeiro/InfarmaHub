# Fluxo Completo de Login e Validação de Role

## 📋 Visão Geral

Este documento descreve o fluxo completo de autenticação e controle de permissões no Infarma HUB, desde o login até a exibição condicional de elementos baseada no role do usuário.

---

## 🔐 Sistema de Permissões Granulares

Em vez de uma hierarquia linear, o sistema agora usa **permissões específicas por role**, permitindo controle fino sobre quem acessa o quê.

### Definição de Permissões

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
      // ❌ NÃO tem: auditoria, faq
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
    permissoes: ["*"], // Acesso a TUDO
  },
};
```

### Comparação: Hierarquia vs. Permissões Granulares

| Feature                          | Hierarquia Linear     | Permissões Granulares  |
| -------------------------------- | --------------------- | ---------------------- |
| **Implantação acessa Auditoria** | ✅ Sim (se nível > 1) | ❌ Não (sem permissão) |
| **Suporte acessa FAQ**           | ❌ Não                | ✅ Sim (tem permissão) |
| **Admin acessa tudo**            | ✅ Sim                | ✅ Sim                 |
| **Master acessa tudo**           | ✅ Sim                | ✅ Sim                 |
| **Controle fino**                | ❌ Não                | ✅ Sim                 |

---

## 1️⃣ Etapa 1: Tela de Login

**Arquivo**: `index.html`

```html
<form onsubmit="entrar(); return false;">
  <input type="text" id="usuario" placeholder="Usuário" />
  <input type="password" id="password" placeholder="Senha" />
  <button type="submit">Entrar</button>
</form>
```

**Ação**: Usuário preenche credenciais e submete o formulário.

---

## 2️⃣ Etapa 2: Validação de Credenciais

**Arquivo**: `assets/js/index.js`

```javascript
async function entrar() {
  const usuario = document.getElementById("usuario")?.value.trim() || "";
  const senha = document.getElementById("password")?.value.trim() || "";

  if (!usuario || !senha) {
    alert("Preencha o usuário e a senha!");
    return;
  }

  try {
    // PASSO 1: VALIDAÇÃO DE CREDENCIAIS NO SUPABASE
    const { data: matchedUsers, error } = await supabaseClient
      .from("users")
      .select("usuario, nome_completo, role") // ← Busca o role aqui
      .ilike("usuario", usuario)
      .ilike("senha", senha)
      .limit(1);

    if (error) throw error;
    const matchedUser = matchedUsers && matchedUsers[0];

    if (matchedUser) {
      // Credenciais corretas!
      // Prossegue para Etapa 3
    } else {
      alert("Usuário ou senha incorretos!");
    }
  } catch (err) {
    console.error("❌ Erro no fluxo de login:", err);
    alert("Erro ao validar usuário no Supabase.");
  }
}
```

**O que acontece**:

- Consulta a tabela `users` no Supabase
- Busca por usuário e senha correspondentes
- **Retorna**: `usuario`, `nome_completo`, `role`
- Se encontrar, passa para Etapa 3

---

## 3️⃣ Etapa 3: Armazenar Dados na Sessão

**Arquivo**: `assets/js/index.js`

```javascript
if (matchedUser) {
  // PASSO 2: LOGIN BEM-SUCEDIDO

  // Marca como logado
  sessionStorage.setItem("loggedIn", "true");

  // Armazena o nome completo
  sessionStorage.setItem(
    "username",
    matchedUser.nome_completo || matchedUser.usuario
  );

  // ⭐ ARMAZENA O ROLE DO USUÁRIO
  sessionStorage.setItem("role", matchedUser.role || "operador");

  // Registra log de auditoria
  try {
    await supabaseClient.from("system_logs").insert([
      {
        usuario: matchedUser.usuario,
        acao: "LOGIN",
        detalhes: "Acesso realizado",
      },
    ]);
  } catch (logErr) {
    console.error("Erro ao salvar log:", logErr);
  }

  // Notifica API externa (Legado)
  notificarAPIdeLog(matchedUser.usuario);

  // Redireciona para o menu
  window.location.href = "routes/menu.html";
}
```

**O que é armazenado**:

- `loggedIn`: "true"
- `username`: Nome completo do usuário
- `role`: **"operador"**, **"admin"** ou **"master"**

O `role` é salvo no `sessionStorage`, que persiste durante a sessão do navegador.

---

## 4️⃣ Etapa 4: Carregamento do Menu

**Arquivo**: `routes/menu.html`

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
  <!-- Botão visível para todos -->
  <button
    onclick="navegarPara('main.html')"
    class="menu-btn group flex flex-col..."
    data-allowed-roles="operador"
  >
    <i class="fa-solid fa-cloud-arrow-down"></i>
    Baixar Versões
  </button>

  <!-- Botão APENAS para admin e acima -->
  <button
    onclick="navegarPara('auditoria.html')"
    class="menu-btn group flex flex-col..."
    data-allowed-roles="admin"
  >
    <i class="fa-solid fa-shield-halved"></i>
    Auditoria
  </button>

  <!-- Botão APENAS para admin e acima -->
  <button
    onclick="navegarPara('faq.html')"
    class="menu-btn group flex flex-col..."
    data-allowed-roles="admin"
  >
    <i class="fa-solid fa-circle-question"></i>
    Perguntas e Respostas
  </button>
</div>
```

**Atributo `data-allowed-roles`**: Define o acesso mínimo necessário para visualizar o botão.

---

## 5️⃣ Etapa 5: Validação de Permissões (Lado do Cliente)

**Arquivo**: `assets/js/auth.js`

```javascript
export function configurarInterface() {
  // 1. Obtém o role do usuário do sessionStorage
  const roleUsuario = sessionStorage.getItem("role") || "operador";

  // 2. Converte para nível numérico
  const nivelUsuario = niveisDeAcesso[roleUsuario] || 0;

  // 3. Encontra todos os elementos com restrição
  const elementosRestritos = document.querySelectorAll("[data-allowed-roles]");

  // 4. Itera sobre cada elemento
  elementosRestritos.forEach((el) => {
    // 5. Pega os cargos permitidos do atributo
    const cargosString = el.getAttribute("data-allowed-roles");
    const cargosPermitidos = cargosString.split(",");

    // 6. Verifica se o usuário tem nível suficiente
    const temAcesso = cargosPermitidos.some((cargoNecessario) => {
      const nivelNecessario = niveisDeAcesso[cargoNecessario] || 999;
      return nivelUsuario >= nivelNecessario; // ← Comparação de níveis
    });

    // 7. Esconde o botão se não tem acesso
    if (!temAcesso) {
      el.style.display = "none";
    }
  });
}
```

**Exemplo de Validação** (Sistema Granular):

| Usuário | Role        | Botão          | Permissão Requer | Tem Permissão? | Visível? |
| ------- | ----------- | -------------- | ---------------- | -------------- | -------- |
| João    | suporte     | FAQ            | `ver-faq`        | ✅ Sim         | ✅ Sim   |
| João    | suporte     | Auditoria      | `ver-auditoria`  | ❌ Não         | ❌ Não   |
| Maria   | implantacao | Cadastros      | `ver-cadastros`  | ✅ Sim         | ✅ Sim   |
| Maria   | implantacao | Auditoria      | `ver-auditoria`  | ❌ Não         | ❌ Não   |
| Carlos  | admin       | Auditoria      | `ver-auditoria`  | ✅ Sim         | ✅ Sim   |
| Carlos  | admin       | FAQ            | `ver-faq`        | ✅ Sim         | ✅ Sim   |
| Ana     | master      | Qualquer coisa | `*`              | ✅ Sim         | ✅ Sim   |

---

## 5️⃣ Etapa 5: Validação de Permissões (Lado do Cliente)

**Arquivo**: `assets/js/auth.js`

### Função Principal: `temPermissao()`

```javascript
export function temPermissao(permissao) {
  const roleUsuario = sessionStorage.getItem("role") || "suporte";
  const roleDef = permissoesPorRole[roleUsuario];

  if (!roleDef) {
    return false;
  }

  // Master tem acesso a tudo
  if (roleDef.permissoes.includes("*")) {
    return true;
  }

  return roleDef.permissoes.includes(permissao);
}
```

**Como funciona**:

1. Pega o role armazenado em `sessionStorage`
2. Busca a definição de permissões daquele role
3. Se role não existe, retorna `false`
4. Se role é `master` (tem `'*'`), retorna `true`
5. Caso contrário, verifica se a permissão está na lista

### Função de Configuração: `configurarInterface()`

```javascript
export function configurarInterface() {
    const roleUsuario = sessionStorage.getItem("role") || 'suporte';
    const roleDef = permissoesPorRole[roleUsuario];

    if (!roleDef) return;

    const elementosRestritos = document.querySelectorAll('[data-allowed-roles]');

    elementosRestritos.forEach(el => {
        const cargosString = el.getAttribute('data-allowed-roles');
        const cargosPermitidos = cargosString.split(',').map(c => c.trim());

        // Verifica se tem acesso a algum dos cargos listados
        const temAcesso = cargosPermitidos.some(cargoNecessario => {
            return temPermissao(`ver-${cargoNecessario}`) || temPermissao(cargoNecessario);
        });

        if (!temAcesso) {
            el.style.display = 'none'; // Esconde o botão
        }
    });
}

  document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica se está logado
    if (sessionStorage.getItem("loggedIn") !== "true") {
      window.location.href = "../index.html";
      return;
    }

    // 2. Exibe o nome do usuário
    const username = sessionStorage.getItem("username");
    const displayEl = document.getElementById("userNameDisplay");
    if (displayEl && username) {
      displayEl.textContent = username.replace(/['"]+/g, "");
    }

    // 3. ⭐ APLICA AS PERMISSÕES (Esconde botões não autorizados)
    configurarInterface();
  });
</script>
```

**Ordem de Execução**:

1. Verifica se `loggedIn === "true"`
2. Exibe nome do usuário
3. **Chama `configurarInterface()` para esconder elementos restritos**

---

## 📊 Fluxo Visual Completo

````
┌─────────────────────────────────────────────────────────────┐
│                    PÁGINA DE LOGIN                          │
│                    (index.html)                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    Usuário Digita:
                    - Usuário: "maria"
                    - Senha: "senha123"
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              VALIDAÇÃO NO SUPABASE                          │
│              (assets/js/index.js)                           │
│                                                             │
│  SELECT usuario, nome_completo, role                       │
│  FROM users                                                │
│  WHERE usuario = 'maria' AND senha = 'senha123'            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    Retorno: {
                      usuario: "maria",
                      nome_completo: "Maria Silva",
                      role: "admin"
                    }
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│          ARMAZENAR NO SESSIONSTORA GE                       │
│                                                             │
│  sessionStorage.setItem("loggedIn", "true")                │
│  sessionStorage.setItem("username", "Maria Silva")         │
│  sessionStorage.setItem("role", "admin")  ⭐              │
└──────────────────────────┬──────────────────────────────────┘
                           │
              Redireciona para:
              routes/menu.html
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  CARREGAR MENU                              │
│              (routes/menu.html)                             │
│                                                             │
│  document.addEventListener("DOMContentLoaded", ...)        │
│  ├─ Valida: loggedIn === "true" ✅                        │
│  ├─ Exibe: "Olá, Maria Silva" ✅                          │
│  └─ Chama: configurarInterface() ⭐                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│         VALIDAR PERMISSÕES (assets/js/auth.js)             │
│                                                             │
│  1. roleUsuario = "admin" → nivelUsuario = 2               │
│  2. Para cada elemento com data-allowed-roles:             │
│     ├─ [data-allowed-roles="operador"] → 1 >= 2? ❌       │
│     │  ├─ Elemento: "Baixar Versões" → VISÍVEL ✅         │
│     │  └─ Elemento: "Sync" → VISÍVEL ✅                   │
│     ├─ [data-allowed-roles="admin"] → 2 >= 2? ✅          │
│     │  ├─ Elemento: "Auditoria" → VISÍVEL ✅              │
│     │  └─ Elemento: "FAQ" → VISÍVEL ✅                    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
            ┌──────────────────────────────────┐
            │     MENU RENDERIZADO             │
            │  COM BOTÕES CORRETOS             │
            │  - Baixar Versões     ✅         │
            │  - Sync               ✅         │
            │  - Documentação       ✅         │
            │  - Auditoria          ✅ Admin   │
            │  - FAQ                ✅ Admin   │
            │  - Usuários           ✅         │
            └──────────────────────────────────┘
---

## 6️⃣ Etapa 6: Chamada de Proteção na Página

**Arquivo**: `routes/menu.html` (script module)

```javascript
<script type="module">
  import { APP_VERSION } from "../assets/js/config.js";
  import { configurarInterface } from "../assets/js/auth.js";

  document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica se está logado
    if (sessionStorage.getItem("loggedIn") !== "true") {
      window.location.href = "../index.html";
      return;
    }

    // 2. Exibe o nome do usuário
    const username = sessionStorage.getItem("username");
    const displayEl = document.getElementById("userNameDisplay");
    if (displayEl && username) {
      displayEl.textContent = username.replace(/['"]+/g, "");
    }

    // 3. ⭐ APLICA AS PERMISSÕES (Esconde botões não autorizados)
    configurarInterface();
  });
</script>
````

**Ordem de Execução**:

1. Verifica se `loggedIn === "true"`
2. Exibe nome do usuário
3. **Chama `configurarInterface()` para esconder elementos restritos**

---

## 🔒 Proteção Adicional

### Verificação ao Acessar Páginas Restritas

**Arquivo**: `assets/js/auth.js`

```javascript
export function verificarPermissao(cargosPermitidos) {
  const roleUsuario = sessionStorage.getItem("role") || "suporte";

  // Se for array ou string com múltiplos cargos
  const temAcesso = cargosPermitidos.some(
    (cargo) => temPermissao(`ver-${cargo}`) || temPermissao(cargo)
  );

  if (!temAcesso) {
    alert("Acesso Negado: Você não tem permissão suficiente.");
    window.location.href = "menu.html";
    return false;
  }
  return true;
}
```

    const nivelNecessario = niveisDeAcesso[cargoNecessario] || 999;
    return nivelUsuario >= nivelNecessario;

});

if (!temAcesso) {
alert("Acesso Negado: Você não tem permissão suficiente.");
window.location.href = "menu.html";
return false;
}
return true;
}

````

**Uso**: Ao abrir `auditoria.html`, adicionar no `<script>` da página:

```javascript
import { verificarPermissao } from "../assets/js/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!verificarPermissao(["admin"])) {
    return; // Redireciona se não tiver permissão
  }
  // Resto do código da página...
});
````

---

## 📝 Resumo

| Etapa | Arquivo              | Ação                               |
| ----- | -------------------- | ---------------------------------- |
| 1     | `index.html`         | Usuário faz login                  |
| 2     | `assets/js/index.js` | Valida credenciais no Supabase     |
| 3     | `assets/js/index.js` | Armazena role em `sessionStorage`  |
| 4     | `routes/menu.html`   | Carrega página do menu             |
| 5     | `assets/js/auth.js`  | Valida permissões e esconde botões |
| 6     | `routes/menu.html`   | Exibe menu com botões corretos     |

---

## ✅ Checklist de Segurança

- ✅ Role armazenado no `sessionStorage` (não persiste após fechar navegador)
- ✅ Validação de permissões no carregamento da página
- ✅ Botões restritos escondidos com CSS (`display: 'none'`)
- ✅ Proteção adicional ao entrar em páginas (função `verificarPermissao()`)
- ✅ Log de auditoria ao fazer login
- ✅ Hierarquia de níveis evita permissões duplicadas

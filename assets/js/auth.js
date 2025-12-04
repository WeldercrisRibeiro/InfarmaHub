// assets/js/auth.js

/**
 * Sistema de Controle de Acesso Granular (Baseado em Permissões)
 *
 * Em vez de hierarquia linear (nível 1 < nível 2 < nível 3),
 * cada role tem suas próprias permissões específicas.
 */

// Define as permissões específicas de cada role
const permissoesPorRole = {
  suporte: {
    roles: ["suporte"],
    permissoes: [
      "ver-docs",
      "ver-versoes",
      "ver-sync",
      "ver-conteudos",
      "ver-apps",
      "ver-faq",
    ],
  },

    suporteN2: {
    roles: ["suporteN2"],
    permissoes: [
      "ver-docs",
      "ver-versoes",
      "ver-sync",
      "ver-implantacao",
      "ver-conteudos",
      "ver-faq",
      "ver-usuarios",
      "ver-cadastros",
      "ver-apps",
    ],
  },

  implantacao: {
    roles: ["implantacao"],
    permissoes: [
      "ver-docs",
      "ver-apps",
      "ver-versoes",
      "ver-sync",
      "ver-implantacao",
      "ver-conteudos",
      "ver-faq",
      
    ],
  },
  admin: {
    roles: ["admin"],
    permissoes: [
      "ver-docs",
      "ver-versoes",
      "ver-sync",
      "ver-implantacao",
      "ver-conteudos",
      "ver-faq",
      "ver-auditoria",
      "ver-usuarios",
      "ver-cadastros",
      "ver-apps",
    ],
  },
};

// Mapa de elementos para suas permissões requeridas
const mapeamentoPermissoes = {
  auditoria: "ver-auditoria",
  faq: "ver-faq",
  usuarios: "ver-usuarios",
  docs: "ver-docs",
  versoes: "ver-versoes",
  sync: "ver-sync",
  cadastros: "ver-cadastros",
  conteudos: "ver-conteudos",
  apps: "ver-apps",
};

/**
 * Verifica se o usuário tem uma permissão específica
 * @param {string} permissao - Permissão a verificar (ex: 'ver-auditoria')
 * @returns {boolean}
 */
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

/**
 * Verifica se o usuário tem acesso a um módulo específico
 * Mantém compatibilidade com os atributos data-allowed-roles antigos
 * @param {array|string} cargosPermitidos - Cargos ou permissões permitidas
 * @returns {boolean}
 */
export function verificarPermissao(cargosPermitidos) {
  const roleUsuario = sessionStorage.getItem("role") || "suporte";

  // Se for array, converte para verificar permissões
  if (Array.isArray(cargosPermitidos)) {
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

  // Se for string, usa a verificação de permissão
  if (
    temPermissao(`ver-${cargosPermitidos}`) ||
    temPermissao(cargosPermitidos)
  ) {
    return true;
  }

  alert("Acesso Negado: Você não tem permissão suficiente.");
  window.location.href = "menu.html";
  return false;
}

/**
 * Configura a interface escondendo elementos sem permissão
 */
export function configurarInterface() {
  const roleUsuario = sessionStorage.getItem("role") || "suporte";
  const roleDef = permissoesPorRole[roleUsuario];

  if (!roleDef) {
    return;
  }

  const elementosRestritos = document.querySelectorAll("[data-allowed-roles]");

  elementosRestritos.forEach((el) => {
    const cargosString = el.getAttribute("data-allowed-roles");
    const cargosPermitidos = cargosString.split(",").map((c) => c.trim());

    // Verifica se o usuário tem acesso através de permissões
    // Por exemplo, se data-allowed-roles="admin" e o usuário é admin, ele vê
    // Ou se data-allowed-roles="suporte" e o usuário tem permissão "ver-suporte", ele vê
    const temAcesso = cargosPermitidos.some((cargo) => {
      // Se o role é exatamente igual, tem acesso
      if (cargo === roleUsuario) {
        return true;
      }

      // Se não é um role direto, tenta verificar como permissão
      // Exemplo: data-allowed-roles="docs" → verifica permissão "ver-docs"
      return temPermissao(`ver-${cargo}`) || temPermissao(cargo);
    });

    if (!temAcesso) {
      el.style.display = "none"; // Esconde o botão
    }
  });
}

// assets/js/auth.js


const nomesAmigaveisRoles = {
  suporte: "Suporte N1",
  suporteN2: "Suporte N2",
  implantacao: "Implantação",
  admin: "Admin",
};

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
 * Aceita roles ou permissões
 * @param {array|string} cargosPermitidos - Cargos ou permissões permitidas
 * @returns {boolean}
 */
export function verificarPermissao(cargosPermitidos) {
  const roleUsuario = sessionStorage.getItem("role") || "suporte";

  console.log(
    "🔐 verificarPermissao - Role:",
    roleUsuario,
    "| Permitidos:",
    cargosPermitidos
  );

  // Se for array, verifica se o role está na lista OU se tem a permissão
  if (Array.isArray(cargosPermitidos)) {
    const temAcesso = cargosPermitidos.some((cargo) => {
      // Primeiro verifica se é um role exato
      if (cargo === roleUsuario) {
        console.log(`  ✅ Role match: ${cargo} === ${roleUsuario}`);
        return true;
      }

      // Se não é role, tenta verificar como permissão
      const temPerm = temPermissao(`ver-${cargo}`) || temPermissao(cargo);
      console.log(
        `  ${temPerm ? "✅" : "❌"} Permissão: ver-${cargo} → ${temPerm}`
      );
      return temPerm;
    });

    if (!temAcesso) {
      alert("Acesso Negado: Você não tem permissão suficiente.");
      window.location.href = "menu.html";
      return false;
    }
    return true;
  }

  // Se for string, verifica role ou permissão
  if (
    cargosPermitidos === roleUsuario ||
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

  console.log("🔍 configurarInterface - Role do usuário:", roleUsuario);

  if (!roleDef) {
    console.warn("⚠️ Role não encontrado:", roleUsuario);
    return;
  }

  const elementosRestritos = document.querySelectorAll("[data-allowed-roles]");
  console.log(
    "📊 Elementos com restrição encontrados:",
    elementosRestritos.length
  );

  elementosRestritos.forEach((el, index) => {
    const cargosString = el.getAttribute("data-allowed-roles");
    const cargosPermitidos = cargosString.split(",").map((c) => c.trim());

    console.log(
      `Botão ${index}:`,
      el.textContent.trim(),
      "| Roles permitidos:",
      cargosPermitidos
    );

    // Verifica se o usuário tem acesso através de permissões
    const temAcesso = cargosPermitidos.some((cargo) => {
      // Se o role é exatamente igual, tem acesso
      if (cargo === roleUsuario) {
        console.log(`  ✅ ${cargo} === ${roleUsuario} → ACESSO`);
        return true;
      }

      // Se não é um role direto, tenta verificar como permissão
      const temPermissaoVerificada =
        temPermissao(`ver-${cargo}`) || temPermissao(cargo);
      console.log(
        `  ${
          temPermissaoVerificada ? "✅" : "❌"
        } Verificando permissão: ver-${cargo} ou ${cargo} → ${temPermissaoVerificada}`
      );
      return temPermissaoVerificada;
    });

    console.log(`  Resultado: ${temAcesso ? "MOSTRAR" : "ESCONDER"}`);

    if (!temAcesso) {
      el.style.display = "none"; // Esconde o botão
    }
  });

  // Atualiza elementos que exibem o role em formato amigável
  try {
    const friendly = getNomeAmigavelRoleFromSession();
    const roleEls = document.querySelectorAll(
      "[data-role-display], #userRoleDisplay"
    );
    roleEls.forEach((el) => (el.textContent = friendly));
  } catch (err) {
    console.error("Erro ao atualizar exibição do role:", err);
  }
}

/**
 * Retorna o nome amigável para um role
 * @param {string} role
 * @returns {string}
 */
export function getNomeAmigavelRole(role) {
  return nomesAmigaveisRoles[role] || role;
}

/**
 * Retorna o nome amigável com base no role presente na sessionStorage
 * @returns {string}
 */
export function getNomeAmigavelRoleFromSession() {
  const role = sessionStorage.getItem("role") || "suporte";
  return getNomeAmigavelRole(role);
}

// assets/js/index.js (VERSÃO ATUALIZADA COM AUDITORIA)

import { SUPABASE_URL, SUPABASE_ANON_KEY, APP_VERSION } from "./config.js";

// Inicializa o cliente Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Envia uma requisição de notificação para a API de Log (antigo login.js/Telegram)
 */
async function notificarAPIdeLog(usuario) {
  try {
    const resposta = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: usuario }),
    });

    const dados = await resposta.json();
    if (!dados.sucesso) {
      console.warn("Falha ao registrar login na API externa:", dados.mensagem);
    }
  } catch (err) {
    console.error("Erro ao comunicar com a API de Log:", err);
  }
}

async function entrar() {
  const usuario = document.getElementById("usuario")?.value.trim() || "";
  const senha = document.getElementById("password")?.value.trim() || "";

  if (!usuario || !senha) {
    alert("Preencha o usuário e a senha!");
    return;
  }

  try {
    // ------------------------------------
    // PASSO 1: VALIDAÇÃO DE CREDENCIAIS
    // ------------------------------------
    const { data: matchedUsers, error } = await supabaseClient
      .from("users")
      .select("usuario, nome_completo, role") // Traz o role para permissões
      .ilike("usuario", usuario)
      .ilike("senha", senha)
      .limit(1);

    if (error) throw error;
    const matchedUser = matchedUsers && matchedUsers[0];

    if (matchedUser) {
      // ------------------------------------
      // PASSO 2: LOGIN BEM-SUCEDIDO
      // ------------------------------------
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem(
        "username",
        matchedUser.nome_completo || matchedUser.usuario
      );
      // Salva o cargo (se vier vazio, assume operador)
      sessionStorage.setItem("role", matchedUser.role || "operador");

      // ---------------------------------------------------------
      // NOVO: GRAVAR LOG DE AUDITORIA NO SUPABASE
      // ---------------------------------------------------------
      try {
        await supabaseClient.from("system_logs").insert([
          {
            usuario: matchedUser.usuario,
            acao: "LOGIN",
            detalhes: "Acesso realizado",
          },
        ]);
      } catch (logErr) {
        // Apenas loga o erro no console para não travar o login do usuário
        console.error("Erro ao salvar log de auditoria:", logErr);
      }
      // ---------------------------------------------------------

      // Notifica API externa/Telegram (Legado)
      notificarAPIdeLog(matchedUser.usuario);

      // Redireciona
      window.location.href = "routes/menu.html";
    } else {
      alert("Usuário ou senha incorretos! Verifique suas credenciais.");
    }
  } catch (err) {
    console.error("❌ Erro no fluxo de login:", err);
    alert("Erro ao validar usuário no Supabase. Tente novamente.");
  }
}

// Permite chamada via onsubmit no HTML
window.entrar = entrar;

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      const tipo = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = tipo;
      toggleBtn.innerHTML = tipo === "password" ? "🔐" : "🔓";
    });
  }

  const footerEl = document.getElementById("versionFooter");
  if (footerEl) {
    const anoAtual = new Date().getFullYear();
    footerEl.innerHTML = `© ${anoAtual} Weldercris Ribeiro. Versão ${APP_VERSION}`;
  }
});

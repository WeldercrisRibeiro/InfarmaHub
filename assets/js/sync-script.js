import { versoesSync } from "./versoes.js";
import { APP_VERSION } from "./config.js";

// 1. Verificação de Segurança
 if (sessionStorage.getItem("loggedIn") !== "true") {
//   // Se não estiver logado, volta para a raiz
  window.location.href = "../index.html";
}

// 2. Preencher o Datalist com as versões do Sync
function preencherListaSync() {
  const datalist = document.getElementById("versoesSync");
  if (!datalist) return;

  datalist.innerHTML = ""; 

  const optInicial = document.createElement("option");
  optInicial.value = "";
  optInicial.textContent = "Selecione a versão";
  datalist.appendChild(optInicial);

  if (typeof versoesSync !== 'undefined' && Array.isArray(versoesSync)) {
      versoesSync.forEach(v => {
          const opt = document.createElement("option");
          opt.value = v;
          datalist.appendChild(opt);
      });
  } else {
      console.warn("A constante 'versoesSync' não foi encontrada em versoes.js");
  }
}

// 3. Exibir usuário logado
function exibirUsuarioLogado() {
  const footerEl = document.getElementById("versionFooter");
  const username = sessionStorage.getItem("username") || "Usuário";
  
  if (footerEl) {
      const anoAtual = new Date().getFullYear();
      footerEl.innerHTML = `Logado como: <strong>${username}</strong> | © ${anoAtual} Infarma Sync. Versão App ${APP_VERSION}`;
  }
}

// 4. Lógica de Download
function iniciarDownloadSync() {
  const versaoInput = document.getElementById("versao");
  const versao = versaoInput.value.trim();

  if (!versao) {
    alert("Por favor, insira ou selecione uma versão.");
    versaoInput.focus();
    return;
  }

  const url = `http://sync.infarma.com.br/downloads/${versao}.zip`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${versao}.zip`);
  link.target = "_blank"; 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function sair() {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("username");
    // Ajuste para voltar para o login na raiz
    window.location.href = "../index.html";
}

// --- Inicialização ---
document.addEventListener("DOMContentLoaded", () => {
  preencherListaSync();
  exibirUsuarioLogado();

  // Adiciona evento de clique (evita ReferenceError)
  const btn = document.getElementById("btnDownload");
  if (btn) {
      btn.addEventListener("click", iniciarDownloadSync);
  }

  const versaoInput = document.getElementById("versao");
  if (versaoInput) {
    versaoInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") iniciarDownloadSync();
    });
  }
});

// Mantém exposto caso precise chamar via console, mas o clique é automático
window.sair = sair;
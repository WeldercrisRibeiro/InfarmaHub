import { nomesAmigaveiSync, versoesSync } from "./versoes.js";
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

  // Se houver uma lista explícita de versões, use-a e mostre o nome amigável quando houver
  if (Array.isArray(versoesSync) && versoesSync.length) {
    versoesSync.forEach((v) => {
      const opt = document.createElement("option");
      // utiliza mapeamento amigável quando disponível, senão exibe a própria versão
      opt.value =
        nomesAmigaveiSync && nomesAmigaveiSync[v] ? nomesAmigaveiSync[v] : v;
      datalist.appendChild(opt);
    });
    return;
  }

  // Fallback: se não houver array, tenta preencher a partir do objeto nomesAmigaveiSync
  if (nomesAmigaveiSync && typeof nomesAmigaveiSync === "object") {
    Object.values(nomesAmigaveiSync).forEach((val) => {
      const opt = document.createElement("option");
      opt.value = val;
      datalist.appendChild(opt);
    });
    return;
  }

  console.warn(
    "Nenhuma versão encontrada para preencher o datalist 'versoesSync'."
  );
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

  // Se o usuário selecionou um rótulo amigável (ex: "9.31a - 25.03a"),
  // mapeamos de volta para a chave técnica (ex: "9.31a").
  let chave = null;

  // 1) Se já for exatamente uma chave conhecida, usa direto
  if (Array.isArray(versoesSync) && versoesSync.includes(versao)) {
    chave = versao;
  }

  // 2) Se não, tenta encontrar pela tabela de nomes amigáveis
  if (!chave && nomesAmigaveiSync && typeof nomesAmigaveiSync === "object") {
    for (const [k, v] of Object.entries(nomesAmigaveiSync)) {
      if (v === versao) {
        // usuário selecionou exatamente o rótulo
        chave = k;
        break;
      }
      // também aceita formatos como "chave - rótulo"
      if (`${k} - ${v}` === versao) {
        chave = k;
        break;
      }
    }
  }

  // 3) Fallback: se não encontrou, tenta extrair algo parecido com uma chave no início
  if (!chave) {
    const maybe = versao.split(/\s|\-|\//)[0];
    chave = maybe || versao;
  }

  const url = `http://sync.infarma.com.br/downloads/${encodeURIComponent(
    chave
  )}.zip`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${chave}.zip`);
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

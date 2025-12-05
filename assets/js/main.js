import { versoes, nomesAmigaveis, preencherListaVersoes } from "./versoes.js";
import { APP_VERSION } from "./config.js";

// Bloqueia acesso se não estiver logado
if (sessionStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

// Atualiza os executáveis disponíveis conforme a versão
function toggleInput() {
  const select = document.getElementById("versao");
  const input = document.getElementById("versaoCustom");
  input.classList.toggle("hidden", select.value !== "outro");
}

function atualizarExecutaveis() {
  const select = document.getElementById("versao");
  const input = document.getElementById("versaoCustom");
  const versao = select.value === "outro" ? input.value : select.value;
  console.log("Versão escolhida:", versao);
  const container = document.getElementById("executaveis");

  container.innerHTML = ""; // limpa a lista

  if (!versao || !versoes[versao]) return;

  versoes[versao].forEach((exe) => {
    const label = document.createElement("label");
    label.className = "flex items-center gap-4";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = exe;
    input.className = "file-checkbox";

    const span = document.createElement("span");
    // exibe nome amigável, se existir
    span.textContent = nomesAmigaveis[exe] || exe.replace(".CAB", "");
    // adiciona tooltip com nome técnico
    span.title = exe;

    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });
}

// Exibe o nome do usuário logado (lê de sessionStorage)
function exibirUsuarioLogado() {
  // Seleciona todos os elementos com o ID (nesse caso repetido, então uso querySelectorAll)
  const elementos = document.querySelectorAll("#userNameDisplay");
  if (!elementos.length) return;

  const username = sessionStorage.getItem("username");
  const texto = username ? `${username}!` : "Usuário!";

  // Atualiza todos os elementos encontrados
  elementos.forEach((el) => {
    el.textContent = texto;
  });
}

// Executa quando a página carregar
//window.addEventListener('DOMContentLoaded', exibirUsuarioLogado);

document.addEventListener("DOMContentLoaded", () => {
  preencherListaVersoes(); // ← monta a lista dinamicamente
  exibirUsuarioLogado();

  const versaoInput = document.getElementById("versao");
  if (versaoInput) {
    versaoInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") iniciarDownload();
    });
    versaoInput.addEventListener("change", atualizarExecutaveis);
  }
});

function getSelectedFiles() {
  const checkboxes = document.querySelectorAll(".file-checkbox:checked");
  return Array.from(checkboxes).map((cb) => cb.value);
}

function iniciarDownload() {
  const versaoInput = document.getElementById("versao");
  const versao = versaoInput.value.trim();

  if (!versao) {
    alert("Insira a versão desejada!");
    versaoInput.focus();
    return;
  }

  const baseUrl = `https://s3.amazonaws.com/infarma-cv/${encodeURIComponent(
    versao
  )}/`;
  const selectedFiles = getSelectedFiles();

  if (selectedFiles.length === 0) {
    alert("Selecione ao menos um executável para baixar.");
    return;
  }

  let index = 0;

  function baixarProximoArquivo() {
    if (index >= selectedFiles.length) {
      alert("Todos os arquivos foram enviados para download!");
      return;
    }

    const file = selectedFiles[index];
    const fileUrl = baseUrl + file;

    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    index++;
    setTimeout(baixarProximoArquivo, 500); // Pausa para evitar bloqueios
  }

  baixarProximoArquivo();
  window.iniciarDownload = iniciarDownload;
}

function sair() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("username");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // mostra o usuário logado no topo
  exibirUsuarioLogado();
  const versaoInput = document.getElementById("versao");
  if (versaoInput) {
    versaoInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        iniciarDownload();
      }
    });

    versaoInput.addEventListener("change", atualizarExecutaveis);
  }

  const footerEl = document.getElementById("versionFooter");
    if (footerEl) {
        const anoAtual = new Date().getFullYear();
        footerEl.innerHTML = `© ${anoAtual} Weldercris Ribeiro. Versão ${APP_VERSION}`;
    }

  const mensagens = [
        'Nova versão 25.03 disponível para download!',
        
    ];

    let indiceAtual = 0;
    const elemento = document.getElementById("barraAvisos");

    if (elemento) {
        elemento.innerHTML = mensagens[0];
        setInterval(() => {
            // A. Primeiro deixa invisível (Fade Out)
            elemento.classList.remove("opacity-100");
            elemento.classList.add("opacity-0");

            // B. Espera 500ms (tempo da transição) para trocar o texto
            setTimeout(() => {
                indiceAtual = (indiceAtual + 1) % mensagens.length; // Avança para o próximo ou volta ao zero
                elemento.innerHTML = mensagens[indiceAtual]; // Troca o texto

                // C. Deixa visível novamente (Fade In)
                elemento.classList.remove("opacity-0");
                elemento.classList.add("opacity-100");
            }, 500); 

        }, 5000); // Troca a cada 5000 milissegundos (5 segundos)
    }
});


window.iniciarDownload = iniciarDownload;
window.sair = sair;

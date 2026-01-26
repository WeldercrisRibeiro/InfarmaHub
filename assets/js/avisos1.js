/**
 * Sistema de avisos global para toda a aplicação
 * Este módulo gerencia a exibição de mensagens em uma barra de avisos
 */

export function inicializarAvisos() {
  // Cria o elemento de barra de avisos se não existir
  if (!document.getElementById("barraAvisos")) {
    const barraAvisos = document.createElement("div");
    barraAvisos.id = "barraAvisos";
    barraAvisos.className =
      "w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold text-center py-2 px-4 shadow-md fixed top-0 left-0 z-50 transition-opacity duration-500 opacity-100";
    document.body.insertBefore(barraAvisos, document.body.firstChild);
  }

  const mensagens = [
    "Agradeço a parceria meus amigos! Até breve. 🚀 - Weldercris Ribeiro",
  ];

  // CASO QUISER DESEJAR, SÓ COMENTAR A LINHA NO HTML QUE INICIALIZA ESSE MÓDULO  <div id="barraAvisos"

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
        indiceAtual = (indiceAtual + 1) % mensagens.length;
        elemento.innerHTML = mensagens[indiceAtual];

        // C. Deixa visível novamente (Fade In)
        elemento.classList.remove("opacity-0");
        elemento.classList.add("opacity-100");
      }, 500);
    }, 5000); // Troca a cada 5 segundos
  }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarAvisos);
} else {
  inicializarAvisos();
}

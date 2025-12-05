// api/login.js  - API de Log e Telegram
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ sucesso: false, erro: "Método não permitido" });
  }

  try {
    // Recebe apenas o nome de usuário (que já foi validado pelo frontend/Supabase)
    const { usuario } = req.body || {}; 

    if (!usuario) {
      return res.status(400).json({ sucesso: false, erro: "Usuário é obrigatório para registro." });
    }

    // --- Lógica de Registro de IP e Telegram ---

    // Pega data e IP
    const now = new Date();
    const datetime = now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Envia mensagem ao Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("❌ Variáveis TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID não definidas");
    } else {
      const message = `✅ *Login Confirmado!*\n👤 Usuário: ${usuario}\n🕒 Hora: ${datetime}\n🌐 IP: ${ip}`;
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

      try {
        const response = await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
          }),
        });

        const data = await response.json();
        console.log("📩 Resposta do Telegram:", data);
      } catch (err) {
        console.error("❌ Erro ao enviar para o Telegram:", err);
      }
    }

    // Retorno de sucesso (o login principal já ocorreu no frontend)
    return res.status(200).json({ sucesso: true, mensagem: `Registro de login efetuado para ${usuario}.` });

  } catch (error) {
    console.error("❌ Erro interno na API de Log:", error);
    return res.status(500).json({ sucesso: false, erro: "Erro interno no servidor de log." });
  }
}
# Correção de Erro TEF Fiserv
## Erro de Comunicação. Realize o registro do terminal

Ao realizar acesso ao PDV na função de comunicação com o TEF ou até mesmo ao tentar faturar uma venda com forma de pagamento TEF o sistema irá apresentar o seguinte erro:
![Exemplo Local](/img/infarma-varejo//ErroRegistroTerminal.png)

O erro apresentado ocorre nas seguintes situações:

**1 -** PDV foi formatado ou mudou a numeração de caixa

**2 -** Token de registro está incorreto na configuração do TEF.

Para a correção do erro, deve ser solicitado ao setor adminstrativo (Dayanna), a geração de um novo token para configuração no caixa. Informe o CNPJ da loja e a quantidade de PDVs que a loja utiliza para que possa ser gerado o Token de acordo com esses dados.

Com o token em mãos, acesse ao PDV no diretório do sistema `(Normalmente utilizado C:\INFARMA\LOJA\ ou C:\INFARMA\VERSOES\)`


![Exemplo Local](/img/infarma-varejo//ServidorAtivoTEF.png)
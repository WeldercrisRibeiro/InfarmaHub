

# Instalação TEF Fiserv TLS 🔐


## 1 - Atualizando as Dlls.

Para o uso do TEF TLS Fiserv, deve ser utilizado os arquivos a partir da
versão 7.0.117.81.r1. Com isso devem ser trocadas as Dlls usadas no
diretório do PDV.

Para o uso do TEF TLS Fiserv, os arquivos utilizados devem ter a versão
igual ou superior a versão 7.0.117.81.r1. Para isso, é necessário substituir
as Dlls na pasta onde fica o PDV.

<!--• **Segue link para download – [Clisitef - 7.0.117.96.r1.rar](https://infarmacombr-my.sharepoint.com/personal/weldercris_ribeiro_infarma_com_br/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fweldercris%5Fribeiro%5Finfarma%5Fcom%5Fbr%2FDocuments%2FMANUAIS%20VAREJO%2F2%20%2D%20M%C3%93DULO%20VENDAS%2FTEF%2FTLS%2FClisitef%20%2D%207%2E0%2E117%2E96%2Er1%2Erar&parent=%2Fpersonal%2Fweldercris%5Fribeiro%5Finfarma%5Fcom%5Fbr%2FDocuments%2FMANUAIS%20VAREJO%2F2%20%2D%20M%C3%93DULO%20VENDAS%2FTEF%2FTLS&ga=1)** -->

• **Segue link para download do instalador dos arquivos - [Instalador SITEF TLS](https://infarmacombr-my.sharepoint.com/:u:/g/personal/weldercris_ribeiro_infarma_com_br/EUKafEpyF9FIohB5vLrUjVkB1vqjW0Hk4N0V4IoSeXgfEA?e=5dLKXq)**

Acesse a pasta onde está o executável do PDV e cole os arquivos
disponibilizados no link acima.

***Obs.: Normalmente utilizamos a pasta em C:\INFARMA\LOJA***

![Exemplo Local](/img/infarma-varejo//ArquivosTEFTLS.png)


## 2 - Configurando o Firewall do Windows.

É necessário criar as regras de Entradas e Saídas para permitir o uso da
URL e IP de Comunicação da Fiserv. Segue o exemplo abaixo mostrando
o caminho para criação dessas regras.

**Regras de Entrada:**
*Painel de Controle > Windows Defender Firewall > Configurações Avançadas > Regras de Entrada >*
*Nova Regra > Porta > TCP > Portas locais especificas 443,4096 > Permitir a conexão > Nome da*
*Regra > Avançar (até finalizar)*

**Regras de Saída:**
*Painel de Controle > Windows Defender Firewall > Configurações Avançadas > Regras de Saída >*
*Nova Regra > Porta > TCP > Portas locais especificas 443,4096 > Permitir a conexão > Nome da*
*Regra > Avançar (até finalizar)*

- Segue abaixo os links para download do arquivo de liberação
automática de rotas e portas especificadas assim como também um
vídeo demonstrando o procedimento de liberação manual.

  - **Vídeo - [Liberação de Firewall TLSGWP.mp4](https://infarmacombr-my.sharepoint.com/:v:/g/personal/weldercris_ribeiro_infarma_com_br/Efr7crGNWkJNjekPToHUt04B3b8ktIrEnbXbCO8aK5jF1A?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=Bklxy0)**
  - **Arquivo - [TLS-Fiserv.bat](https://infarmacombr-my.sharepoint.com/:u:/g/personal/weldercris_ribeiro_infarma_com_br/EYxPZKehsglPp_Lg0gQhGCUBl9MIOwEjMAvSsoPGWfaevg?e=MpdZZ9)**

## 3 - Cadastro de Lojas

Acesse ao Varejo/Central em Estoque > Arquivo > Lojas > Integrações:
Preencha os campos da seguinte forma:

![Lojas TEF](/img/infarma-varejo//LojaTEF.png)

 - **Cod Loja SITEF:** Repassado pelo Adminstrativo
 - **IP SITEF:** 127.0.0.1



## 4 - Configurando o arquivo CONFITLS.ini
Crie um arquivo com a descrição **CONFITLS.INI** e salve dentro da pasta
onde está o PDV. Esse arquivo deve ser preenchido conforme o exemplo
abaixo.

```
[ConfiguracaoTLS]
TipoComunicacaoExterna=TLSGWP
URLTLS=tls-prod.fiservapp.com
TokenRegistro=XXXX-XXXX-XXXX-XXXX
```

- **TipoComunicacaoExterna:** É onde configuramos o método utilizado
para comunicação. Nesse caso, será necessário utilizarmos o tipo
TLSGWP.

- **URLTLS:** É onde será necessário informar a URL ou IP para
comunicação. Essa informação é disponibilizada pela SiTef.

- **TokenRegistro:** É a configuração utilizada para registro do terminal
SiTef. Esse Token é criado para cada estabelecimento e é
disponibilizado pelo nosso setor administrativo.


![ConfTls](/img/infarma-varejo//conftls.png)

## 5 - Realizando um Teste de Comunicação.

Após a configuração do arquivo CONFTLS, acione a opção **F11 > 60 > 10 >01** do PDV para iniciar o teste de comunicação. Irá aparecer a mensagem abaixo, basta clicar em SIM ou YES para fazer a confirmação.

![ConfTls](/img/infarma-varejo//ConfirmaTLS.png)

Em seguida, acione a opção F11 > 60 > 10 e use a função **“Carga de Tabelas”** para concluir o processo

***Ao finalizar todo o processo de Teste de Comunicação, solicite a liberação do PDV ao nosso***
***setor administrativo para que o mesmo fique apto a operar.***

## 6 - Fazendo a Venda no PDV.

Esse é o processo final para confirmação do funcionamento do serviço. Solicite ao
responsável pelo o estabelecimento que realize o faturamento de uma venda no PDV
recém configurado, utilizando uma das formas de pagamento habilitadas para o TEF.

A finalização da venda indica que o processo foi concluído com sucesso. Caso contrário, será
necessário revisar as etapas realizadas.

 ***<span style={{ color: "RED",backgroundColor: "yellow" }}>ATENÇÃO!!!</span>***


 **<span style={{ color: "red",backgroundColor: "yellow" }}>É importante acionar o nosso setor administrativo logo após o primeiro faturamento usando o TEF, para fins de consulta do status do Terminal do cliente e também a liberação do mesmo para operação.</span>**

## Conclusão!
#### **Parabêns! Você concluiu o Tópico Instalação TEF Fiserv!**

:::tip
Caso haja alguma dúvida ou erro diferente do apresentado nesta documentação, consulte no nosso **[FAQ]** ou a equipe de Suporte para maiores detalhes!
:::



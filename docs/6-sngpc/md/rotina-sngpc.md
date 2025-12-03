---
title: "SNGPC - Informações importantes para o cadastro correto de produtos controlados"
sidebar_position: 1
---


 


**1 -** Acesse no Varejo/Central em Estoque > Arquivo > Produtos;

![Imagem](/img/infarma-varejo/EstoqueProdutos.png)


**2 -** Clique em Edita e clique no botão de Incluir um novo produto ou pesquise um produto na barra de pesquisa e clique no Triângulo para editar um cadastro já feito;

Para criar um novo produto:

![Imagem](/img/infarma-varejo/EditaProduto.png)

Para acessar um produto já existente:

![Imagem](/img/infarma-varejo/EditaProdControlado.png)



3 - Insira as informações mais importantes do medicamento controlado que são:
- **Descrição de acordo com a embalagem**
- **Registro MS** (Deve conter 13 números e geralmente contém na embalagem)
- **Código NCM** (Você pode verificar na nota de entrada do produto)
- **Código CEST** (Pode ser consultado no site **[Convênio ICMS](https://www.confaz.fazenda.gov.br/legislacao/convenios/2018/CV142_18)**)
- **Tipo de Preço = MONITORADO**
- **Tipo de Venda RDC 44 ou Portaria 344.** 

![Imagem](/img/infarma-varejo/InformProdControlado.png)

**Atenção: Deve ser informado o Tipo de Controle se for Portaria 344 para que no envio para a anvisa, esteja dentro do inventário corretamente.**

4 - Feito esse processo, clique para salvar o cadastro.

![Imagem](/img/infarma-varejo/SalvarProdu.png)


## Balanço de Produtos Controlados

1 - Acesse no Varejo em Estoque > Movimento > Balanço/Acerto

Clique em EDITA e em seguida clique no botão + , selecione o tipo **Total** e clique para confirmar. 

**Obs: O tipo de balanço para controlados deve ser sempre do tipo total.**

Salve a numeração do balanço para usar posteriormente. No caso da imagem a seguir é o número x

2 Abra o aplicativo do balanço de Controlados, clique no Menu e em seguida Digitação de Produtos Controlados. (Caso você for fazer o balanço por meio de coletor, ao finalizar ele irá gerar um arquivo e você poderá importar ele na Opção Importação de Arquivo TXT - Rotina mostrada no tópico X)

3  Informe o Número do Balanço feito no Varejo e escolha a opção de Inclusão

- **Inclusão:** serve para incluir um novo item no balanço.
- **Alteração:** Serve para Editar as informações de um produto que foi incluído no balanço.
- **Exclusão:** Serve para excluir do balanço um produto que foi incluído nele.

4 Selecione o Produto, informe o lote, vencimento, a quantidade que deve ficar em estoque e clique em “GRAVA” para armazenar as informações do item, em seguida inclua os outros itens que deseja ajustar a quantidade. Quando finalizar, clique em “fecha”.

Selecione o balanço realizado e clique em Itens no Varejo e clique em Processa. Confirme o código solicitado e clique em OK. Irá aparecer a tela de confirmação, clique em “SIM” para atualizar o estoque de acordo com as informações inseridas.

## Geração de Inventário 

**1 -** Acesse o sistema no Varejo/Central em Controle Fiscal > Movimento > Gerencialmento de Produtos Controlados - SNGPC:

![Produto Controlado](/img/infarma-varejo/ProdControlado.png)

**2 -** Na tela inicial, clique em Opções para configurar o primeiro envio de inventário (caso já tenha enviado o inventário, pode seguir o mesmo processo.)

![Produto Controlado](/img/infarma-varejo/GerenciamentoProdControlado.png)

**3 -** Em Data de Confirmação do Inventário, informe o dia que você irá enviar o inventário e em Data do último movimento gerado/transmitido, informe a data anterior a data de confirmação do inventário.

**Exemplo: Data de confirmação – 04/02 e Data de movimento – 03/02**

![Produto Controlado](/img/infarma-varejo/ConfirmaInventario.png)

Clique em SIM para confirmar a alteração e em seguida clique em **Gera Arq. Invent.**

![Produto Controlado](/img/infarma-varejo/GeraArqInv.png)

**4 -** Certifique-se que a opção de Incluir Produtos Portaria 344 está
marcada, informe o CPF do transmissor/farmaceutico, clique na pasta para selecionar onde o arquivo será salvo e clique em **PROCESSA** para finalizar a geração do arquivo.

![Produto Controlado](/img/infarma-varejo/ProcessaInv.png)

**5 -** Localize o arquivo gerado na pasta selecionada e transforme o arquivo gerado em .ZIP clicando sobre o arquivo com o botão direito, selecione 7zip e adicione para “NOME DO ARQUIV.zip” (para quem usa o programa 7zip).

![alt text](/img/infarma-varejo/CompactaInv.png)
**6 -** Acesse o site da Anvisa para importar o arquivo e informe o e-mail, senha, selecione o arquivo .zip e clique em Enviar.

![alt text](/img/infarma-varejo/EnviaAnvisa.png)


:::tip
Caso haja alguma dúvida ou erro diferente do apresentado nesta documentação, consulte no nosso **[FAQ]** ou a equipe de Suporte para maiores detalhes!
:::

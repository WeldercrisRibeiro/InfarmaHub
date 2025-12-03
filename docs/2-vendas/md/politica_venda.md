# POLITICA DE VENDAS

### Regra de Negócio

A politica de vendas no Varejo, é uma das formas de aplicar descontos diretamente em Vendas no PDV; É possivel aplicar descontos pela política de vendas por meio de algumas opções: 

- Desconto em Venda Regular (Venda comum)
- Venda a Convênio
- Venda a Prazo
- Vendas no Programa Fidelidade.

<!-- [alt text](inc-clientes.png)-->

Após definir a Condição para a venda, logo após deve ser definido a incidência para o produto vendido onde é possível definir por meio de:

- Classificação de produtos
- Grupo de Preços 
- Fabricante
- Produto específico

<!--  ![alt text](/img/infarma-varejo/vendas/politica-de-vendas/inc-produtos.png) -->

***Antes de configurar a rotina pra uso, deve ser observado que para rede de lojas a política de venda criada no central será enviada para todas as lojas; Caso a loja desejar ter uma política individual, deve ser criado diretamente na loja.***


### Configurando uma política de venda
Acesse no *Varejo / Central* em ***Vendas> Arquivo > Politica de Vendas*** e clique no botão EDITA

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/pol-de-vendas.png)

Em seguida, clique no botão ➕ para criar o registro

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/pol-de-vendas-cadastro.png)

Conforme informado acima, é possível definir a politica de venda de acordo com o tipo de venda e o tipo de condição para o produto; Com isso defina o tipo desejado nas incidência.

***Exemplos:***

- ***Política de Venda - vendas regulares para o grupo de preço étíco:***

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/pol-venda-etico.png)

Ao clicar nos três pontos ao lado na incidência de Clientes, é possível definir uma forma de pagamento especifica ou pode deixar em branco para selecionar todas as vendas como mostra a imagem.

- ***Política de Venda - vendas a prazo para a classificação Medicamentos:***

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/pol-venda-med.png)

Assim como na venda regular é possível customizar, definindo uma forma de pagamento especifica, nesse caso é possível definir a politica para um cliente a prazo especifico se desejar.

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/pol-venda-med-cli.png)

- ***Política de Venda - vendas a convênio para o fabricante Medley:***

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/pol-venda-conv.png)

Para definir políticas de vendas, para uma empresa convêniada especifica, basta clicar nos três pontos e definir a empresa

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/pol-venda-conv-empresa.png)

## Parametrizando opções da política
Após definir as opções acima (Tipo e condição Ex: Venda Regular e Grupo de Preço Ético), você deverá customizar as opções para a política e preencher o percentual de desconto que será aplicado.

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/opc-pol-de-venda.png)

Ao lado direito serão definidos os percentuais de desconto para Balcão *(Vendas direto na loja)* e Vendas a domicílio *(Com entrega)*.

*Ex:*

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/percentual-desconto-pol.png)

No lado esquerdo, são alguns opções que podem auxiliar e facilitar aplicação do desconto da política de venda onde listaremos a regra abaixo:

- ***Sobrepor o desconto promocional:***

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/sobrepor-desconto-prm.png)

- ***Complementar o desconto promocional:***

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/complementar-desconto-prm.png)

- ***Acrescentar desconto sobre o preço de Venda:***

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/acrescentar-desc-prc-venda.png)

- ***Bloquear vendas nas condições informadas:*** Como o nome diz, o sistema bloqueará os descontos para as condições feitas acima.

- ***Sugerir desconto no orçamento e PDV 2.0:*** O sistema irá sugerir o valor de desconto ao inserir os produtos dentro das condições feitas, mas terá opção de não adicionar se desejar.

- ***Usar % de rentabilidade mínima configurada:***
Nessa opção, o sistema vai utilizar o percentual de rentabilidade mínima configurada na Classificação de Produtos ou Grupo de Preços e vai usar esse percentual como desconto de acordo com a rentabilidade do produto. (Assunto que será tratado mais detalhamente em breve)

- ***Inserir desconto automático em venda direta no PDV:*** 

O PDV insere o valor de desconto de forma automática.

- ***Usar o maior desconto política x promoção:***

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/utilizar-maior-desconto.png)


<!-- ##Configurando -->

## Fazendo uma venda com política de venda

Acesse no Terminal de Vendas ou PDV e insira um produto que esteja dentro de algumas das incidências configuradas 
(No nosso exemplo,usaremos a incidência por classificação de produtos Medicamentos; Então todos os itens dessa classificação entrará na política de venda)


![alt text](/img/infarma-varejo/vendas/politica-de-vendas/venda-politica.png)

**Observe que as regras criadas na política foram atendidas:**
- Incidência (Classificação de produtos para o exemplo)

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/incidencia-class.png)

- Sugestão de Desconto invés de aplicar direto no sistema e o Percentual definido

![alt text](/img/infarma-varejo/vendas/politica-de-vendas/regra-politica.png)

## Orientações gerais
A política de venda pode ser criada com vários fatores, com isso é ideal entender como funciona a rotina e definir como deseja criar a política. A aplicação do desconto pode ser feita tanto no terminal quanto no PDV. Não esqueça de observar sempre as opções! 

## Conclusão!
#### **Parabêns! Você concluiu o Tópico Política de Vendas!**

:::tip
Caso haja alguma dúvida ou erro diferente do apresentado nesta documentação, consulte no nosso **[FAQ]** ou a equipe de Suporte para maiores detalhes!
:::

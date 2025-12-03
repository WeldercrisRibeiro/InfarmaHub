---
title: Correção de Erro SPED Contribuições 
subtitle: 
---

#### Erro apresentado: CST_PIS/CST_COFINS Tamanho do campo inválido ou incorreto

Ao realizar a importação do arquivo Sped Contribuições e apresentou a crítica abaixo:

![alt text](/img/infarma-varejo/erro-cst-pis-cofins-sped.png)

Para a correção desse erro, você deverá inicialmente acessar ao arquivo gerado pelo sistema e acessar a linha identificada no validador que nesse caso foi a linha 7163.

![alt text](/img/infarma-varejo/erro-cst-pis-cofins-sped-1.png)

Ao verificar a linha, foi identificado que a venda 21656 - destacada na imagem - contém um item com o CST de PIS/COFINS com três dígitos - destacado na parte debaixo da imagem - e por conta disto o validador está apresentando erro de estrutura.

Para correção direta no sistema, use o número do documento do arquivo para acessar ao sistema, que nesse caso foi uma venda. Busque a venda pelo número do Documento e busque o item com o mesmo valor que aparece na linha destacada no validador, que nesse caso foi o item com valor de 17,50 que foi o ASEPTGEL 420g.

![alt text](/img/infarma-varejo/erro-cst-pis-cofins-sped-2.png)

Após a identificação do item, acesse ao cadastro do produto e busque saber o NCM do mesmo.

![alt text](/img/infarma-varejo/erro-cst-pis-cofins-sped-3.png)

Com o NCM anotado, acesse ao cadastro do NCM do produto e abra para visualizar os dados informados na configuração do mesmo. Ao realizar a conferência, foi identificado que o CST de PIS/COFINS das saídas estavam com apenas um dígito e por conta disto acabou causando a inconsistência.

Para a correção, preencha o CST correto - que nesse caso foi somente adicionar o zero à esquerda - e clique em salvar.

![alt text](/img/infarma-varejo/erro-cst-pis-cofins-sped-4.png)

Após a correção, acesse o Reprocessamento de Tributos em Controle Fiscal > Manutenção > Reprocessamento de tributos > Cupons fiscais e informe o período do fechamento, marque a opção Reprocessar Pis/Cofins e clique em Processar.

![alt text](/img/infarma-varejo/erro-cst-pis-cofins-sped-5.png)

Finalizado o reprocessamento, anule o fechamento fiscal e refaça novamente a geração do arquivo SPED Contribuições / SPED PIS/COFINS.

:::tip
Caso haja alguma dúvida ou erro diferente do apresentado nesta documentação, consulte no nosso **[FAQ]** ou a equipe de Suporte para maiores detalhes!
:::

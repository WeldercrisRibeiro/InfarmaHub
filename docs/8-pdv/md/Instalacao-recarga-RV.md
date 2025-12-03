---
title: "Instalação Recarga RV 📲"
---





## Requisitos
Para o cliente conseguir utilizar a Recarga RV, deve ser ter alguns pontos a serem requisitados: 
 - Registro direto com a RV
 - Possuir no mínimo a versão 20.06ab
 - Possuir os dados de login (login, loja e senha) que são repassados pela RV ao cliente.

 ## Instalação

**1.** Acesse no PDV do cliente o arquivo VmdPdv.ini (Verificar no diretório do sistema ou na pasta Windows). 

**2.** Com isso preencha os campos RV e Producao do VmdPdv.ini da seguinte forma: (Tanto os caixas 1.0 e 2.0 irão obdecer essas configurações):
```
RV=1
Producao=1
```
Depois disso, basta abrir e fechar o PDV de novo.
O sistema irá criar novos parâmetros no VmdPdv.ini. Preencha conforme abaixo com os dados que o setor adminstrativo irá repassar:
 
``` 
Loja Primaria=
Nome Primario=
Senha Primaria=
WebService=1
Usuario=4h5n2en6lr1m4ov446btbn567 **(Dados ilustrativos - dados reais serão repassados pelo setor adm)**
Senha=fgfkbiurgsdm56lf **(Dados ilustrativos - dados reais serão repassados pelo setor adm)**
```

**4.** Acesse o PDV e verifique se a função da recarga (F11 > 13) está ativa. Com isso solicite ao cliente para efetuar um teste se possível

![Exemplo Local](/img/infarma-varejo//RecargaRV.png)

## Conclusão!
#### **Parabêns! Você concluiu o Tópico Instalação Recarga RV!**

:::tip
Caso haja alguma dúvida ou erro diferente do apresentado nesta documentação, consulte no nosso **[FAQ]** ou a equipe de Suporte para maiores detalhes!
:::





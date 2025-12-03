---
title: "Instalação Recarga Tendência 📲"
---





## Requisitos
Para o cliente conseguir utilizar a Recarga Tendência, deve ser ter alguns pontos a serem requisitados: 
 - Registro direto com a Tendência
 - Possuir no mínimo a versão 20.06ab
 - Utilizar a recarga webservice da Rede Tendência
 - Possuir os dados de configuração (token, usuário e senha) que são enviados via e-mail.

## Arquivos Necessários
 - shouse.crt
 - shouse.key
 - shouse.pfx

![CertificadoTendencia](/img/infarma-varejo//CertificadoTendencia.png)

 **Os arquivos estão alocados no seguinte link: [Arquivos Tendência](https://infarmacombr-my.sharepoint.com/:u:/g/personal/weldercris_ribeiro_infarma_com_br/EYQgliKkSQdOh1RDhNtfhOIBl2yHqCacWp3r5EuBR2WZ8A?e=ypIIX3)**

 
**<span style={{ color: "RED"}}>Atenção: Os arquivos não devem ser renomeados de forma alguma!</span>**

## Instalação

**1.** Copie e cole os arquivos **shouse.crt**, **shouse.key** e **shouse.pfx** na pasta do executável do PDV;

**2.** Instale o certificado clicando duas vezes no arquivo **shouse.pfx**;
   **Senha do Certificado:** Consulte a equipe de suporte

**3.** Configue o VmdPdv.ini da seguinte forma: (Tanto os caixas 1.0 e 2.0 irão obdecer essas configurações);

```
[Tendencia]
WebService=1
[RECARGA DIGITAL]
F3M=0
REDETREL=0
TENDENCIA=1
RV=0
Producao=1
PinPad=0
Versao=1

```

**4.** Acesse o Varejo/Central em Estoque > Arquivo > Lojas > Outros Dados > Grid Recarga Digital -Tendência. Nesse campo preencha o token, usuário e senha repassados pela Tendência ao cliente. 

![Tendencia](/img/infarma-varejo//Tendencia.png)

## Conclusão!
#### **Parabêns! Você concluiu o Tópico Instalação Recarga Tendência!**

:::tip
Caso haja alguma dúvida ou erro diferente do apresentado nesta documentação, consulte no nosso **[FAQ]** ou a equipe de Suporte para maiores detalhes!
:::




# Correção de Erro NF Devolução - Rejeição: Total do FCP retido anteriormente por Substituição Tributaria difere do somatório dos itens

**Explicação do Erro:**
Significa que os campos % ICMS Interestadual, % ICMS Interno e % FCP Interestadual foram
preenchidos com valor igual a 0% na tabela NFSIT.

Para seguir com a emissão da nota, será necessário informar uma alíquota correspondente ao FCP
ou deixar os campos em branco (que é o que iremos fazer):

**1 – Verifique se os campos realmente estão com valores, antes de executar o update.**
Script para consulta:

```
SELECT Isn_NotSai,vBCFCPSTRet, pFCPSTRet, vFCPSTRet,* FROM NFSIT
WHERE Isn_NotSai = Protocolo da Nota;
```

Casos os campos estejam preenchidos, salve os valores para caso não funcionar,
voltarmos aos valores antigos

**2 – Execute o update zerando os valores dos campos:**

```
BEGIN TRAN
 UPDATE NFSIT
 SET VBCFCPSTRET = '0.00',
PFCPSTRET = '0.00',
 VFCPSTRET = '0.00'
 WHERE ISN_NOTSAI = Protocolo da Nota
--COMMIT
--ROLLBACK
```

**3 – Acesse o Monitor NFe e clica em Reenviar**
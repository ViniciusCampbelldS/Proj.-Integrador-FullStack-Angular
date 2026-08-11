# Site Development TODO

## Escopo Atual
- Frontend apenas neste ciclo.
- Perfis simulados no frontend: `TST` e `Oper?rio`.
- TST: gerencia EPIs, treinamentos, funcion?rios e NRs.
- Oper?rio: acessa o portal e visualiza telas administrativas sem editar.

## Feito
- Login com sele??o de perfil TST/Oper?rio.
- Home, menu principal e notifica??es.
- Portal do Funcion?rio.
- Meus EPIs com relato de estado, upload de imagens e documentos.
- Meus Treinamentos.
- Gest?o de EPIs com busca, status, exporta??o local e a??es administrativas.
- Cadastro/recebimento de EPI com formul?rio e lista local.
- Entrega de EPI com upload, ficha e substitui??o.
- Hist?rico de altera??es de EPI.
- Gest?o de Treinamentos com tabela, sele??o de funcion?rios e edi??o local.
- Abertura de turma com participantes, upload de lista e tabela local.
- Hist?rico de altera??es de treinamentos.
- Gerenciar Funcion?rios com cadastro, edi??o, remo??o, NRs e filtros locais.
- Padr?o visual de largura/responsividade entre as p?ginas principais.

## Regras De Perfil No Frontend
- TST pode editar EPIs, descartar EPIs, alterar estados, exportar relat?rios, editar treinamentos e gerenciar funcion?rios/NRs.
- Oper?rio acessa o portal do funcion?rio e fica sem permiss?o nas a??es administrativas.

## Ainda Pendente Para Integra??o Real
- Conectar formul?rios ao backend.
- Persistir cadastros, edi??es, descartes e turmas no banco.
- Autentica??o real por perfil vinda do backend.
- Exporta??o real para PDF/XLSX/XML/ODF com conte?do formatado.
- Filtros administrativos consumindo dados reais.
- Upload real de documentos e imagens.
- Hist?rico real com timestamp, usu?rio e altera??es vindas do backend.

## Ajustes Finais De Frontend
- Revis?o visual mobile em todas as rotas.
- Conferir textos e acentos finais.
- Revisar estados vazios e mensagens de erro/sucesso.
- Remover arquivos antigos em `lixeira` se n?o forem mais necess?rios.

# GDD / Walkthrough - Ajuda Leiga Contextual

## Objetivo

Adicionar explicacoes simples, acessiveis e sob demanda para termos tecnicos do simulador, ajudando usuarios leigos a entenderem o que cada parte faz.

## Contexto

O simulador usa termos de eletrotecnica como RMS, fluxo, histerese, saturacao, relacao de espiras e corrente magnetizante. Sem explicacao, um iniciante pode mexer nos controles sem entender causa e efeito.

## Fluxo Completo

1. O usuario ve um termo com botao `?`.
2. Ao clicar, uma caixa fixa abre com titulo e tres blocos: explicacao, como usar e quando usar.
3. A explicacao usa linguagem cotidiana e evita matematica pesada.
4. O usuario fecha a caixa pelo `x` ou tecla `Esc`.
5. A simulacao continua rodando sem pausa.

## Regras

- A ajuda deve ser opcional e nao ocupar espaco permanente.
- Cada explicacao deve ser curta, direta e voltada a leigos.
- Cada ajuda deve orientar tambem como usar o conceito em um caso real e quando ele aparece na pratica.
- `Como usar` e `Quando usar` nao devem explicar o botao de ajuda; devem trazer exemplos de bancada, rede eletrica, motor, carga, medicao, manutencao ou dimensionamento.
- Titulos dos blocos usam cores diferentes: explicacao em ciano, como usar em verde e quando usar em amarelo.
- O botao `?` deve ter contraste e foco acessivel.
- O sistema deve ser reutilizavel via `data-help`.
- Nao colocar logica de ajuda no dominio fisico.

## Estados

- Popover fechado.
- Popover aberto com conteudo do termo escolhido.

## Entradas e Saidas

- Entrada: clique em `?` ou tecla `Esc`.
- Saida: caixa de ajuda com titulo, explicacao, como usar e quando usar.

## Feedback ao Usuario

- Botao `?` com cor ciano indica conteudo explicativo.
- Caixa aparece no canto inferior para nao cobrir o painel inteiro.
- Cores dos subtitulos separam leitura conceitual, exemplo pratico de uso e situacao real onde o conceito aparece.
- O fechamento e imediato.

## Criterios de Aceitacao

- Termos principais de controle, leitura, entrada/saida, diagnostico e canvas possuem ajuda.
- Siglas tecnicas possuem explicacao propria: `Vp`, `Vs`, `Is`, `Im`, `Phi`, `RMS`, `FP`, `Np/Ns`, `Hz`, `VA` e `B-H`.
- A interface possui um glossario compacto para consulta rapida.
- A ajuda nao interfere nos sliders, botoes ou animacao.
- A tela continua responsiva.
- A implementacao fica em `src/interfaces`.

## Impactos Tecnicos

- `src/interfaces/helpContent.js` guarda o dicionario de explicacoes.
- `src/interfaces/helpController.js` injeta botoes e controla o popover.
- `index.html` usa atributos `data-help`.
- O glossario visual fica no painel lateral e reutiliza o mesmo dicionario de ajuda.
- Cada item de ajuda aceita os campos `body`, `how` e `when`, com fallback padrao para itens ainda nao especializados.

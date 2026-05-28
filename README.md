# TransFlux 360 - Simulador de Fluxo de Transformadores

O **TransFlux 360** e um simulador educacional interativo para visualizar corrente eletrica, fluxo magnetico, transformacao de tensao e defasagem em transformadores monofasicos e trifasicos.

Ele tambem modela, de forma educacional, magnetizacao do nucleo, saturacao, histerese e corrente magnetizante.

O painel de diagnostico identifica configuracoes ruins, mostra entrada/saida, anima problemas no transformador e oferece som opcional para reforcar o comportamento da simulacao.

Para iniciantes, a interface inclui botoes `?` com explicacoes simples sobre os termos tecnicos.
Tambem ha um glossario de siglas para leitura rapida durante a simulacao.

## Stack

- HTML semantico.
- CSS responsivo com visual de cabine tecnica.
- JavaScript modular.
- Canvas 2D com `requestAnimationFrame`.

## Como Rodar

Na raiz do projeto:

```powershell
npm run serve
```

Abra:

```text
http://localhost:4173
```

## Estrutura

- `index.html`: interface principal.
- `styles.css`: sistema visual.
- `src/domain`: equacoes e regras fisicas.
- `src/application`: estado, tempo e particulas.
- `src/interfaces`: controles DOM e renderizacao Canvas.
- `docs/tasks`: mecanicas e walkthroughs.
- `docs/architecture`: visao arquitetural.
- `docs/decisions`: ADRs.
- `docs/api`: contratos internos.
- `docs/setup`: setup local.

## Documentos Originais

- `documentacao_simulador.md`: blueprint eletromagnetico e UI/UX.
- `plano_implementacao.md`: roteiro macro de implementacao.

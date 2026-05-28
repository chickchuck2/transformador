# GDD / Walkthrough - Audio, Diagnosticos e Problemas

## Objetivo

Tornar o simulador mais intuitivo por meio de feedback sonoro opcional, informacoes claras de entrada/saida, alertas de configuracao e animacoes visuais de problemas.

## Contexto

O usuario pode criar configuracoes ruins ao alterar tensao, frequencia, relacao de espiras, carga e material do nucleo. A interface deve explicar o problema e mostrar sua consequencia sem interromper a exploracao.

## Fluxo Completo

1. O usuario altera parametros do transformador.
2. O dominio avalia leituras de entrada, saida e diagnosticos.
3. A UI exibe resumo de entrada e saida.
4. O painel de diagnostico mostra severidade, problema e acao sugerida.
5. O Canvas adiciona efeitos visuais de problema quando necessario.
6. Se o som estiver habilitado, o audio acompanha fluxo, magnetizacao e alertas.

## Regras

- Som comeca desligado por padrao por seguranca e por politica de navegadores.
- O audio inicia somente apos interacao do usuario.
- Operacao normal gera hum baixo proporcional a frequencia e fluxo.
- Avisos geram tom discreto.
- Falhas graves geram tom mais presente e pulso de alerta.
- Sobretensao secundaria aparece quando `Vs RMS > 260 V`.
- Saida elevada aparece quando `Vs RMS > 220 V`.
- Saturacao grave aparece quando saturacao relativa passa de `40%`.
- Frequencia baixa com tensao alta e tratada como risco de saturacao.
- Carga aberta e informativa, nao falha.

## Estados

- `audio.enabled`: som ligado/desligado.
- `audio.volume`: volume mestre.
- `diagnostics`: lista de problemas ativos.
- Severidades: `ok`, `info`, `warning`, `danger`.

## Entradas e Saidas

- Entradas: checkbox de som, volume, controles fisicos existentes.
- Saidas: painel Entrada/Saida, painel Diagnostico, sons sintetizados, halo de saturacao, faíscas de sobretensao e veu termico de histerese.

## Feedback ao Usuario

- Badge verde: operacao estavel.
- Badge ciano: informacao educacional.
- Badge amarelo: aviso operacional.
- Badge vermelho pulsante: condicao perigosa.
- Faíscas indicam sobretensao ou pico de magnetizacao.
- Borda vermelha vibrante indica nucleo em saturacao.
- Veu quente indica perdas magneticas elevadas.

## Criterios de Aceitacao

- O app funciona com som desligado.
- Ativar som nao deve travar a simulacao.
- Diagnosticos devem atualizar em tempo real.
- Entrada e saida devem mostrar valores resumidos compreensiveis.
- Problemas devem aparecer visualmente no Canvas.
- Documentacao e contratos devem refletir a feature.

## Impactos Tecnicos

- Diagnosticos ficam em `src/domain/diagnostics.js`.
- Estado de audio fica em `src/application/simulatorState.js`.
- Web Audio fica isolado em `src/interfaces/audioEngine.js`.
- DOM apenas apresenta diagnosticos e altera estado.

# GDD / Walkthrough - Simulador TransFlux 360

## Objetivo

Criar um simulador educacional de transformadores monofasicos e trifasicos que mostre, em tempo real, tensao, corrente, fluxo magnetico, relacao de espiras e efeito da carga.

## Contexto

O usuario deve conseguir observar grandezas invisiveis: movimento de eletrons nas bobinas, brilho do fluxo no nucleo ferromagnetico, defasagem trifasica de 120 graus e atraso de corrente em carga indutiva.

## Fluxo Completo

1. O usuario abre `index.html`.
2. O simulador inicia em modo monofasico, carga resistiva, 127 V e 60 Hz.
3. O canvas principal desenha nucleo, bobinas, particulas e aura magnetica.
4. O osciloscopio inferior plota Vp, Vs, Is e Phi.
5. O painel lateral permite mudar modo de fase, tensao, frequencia, relacao Np/Ns, zoom e carga.
6. As metricas e formulas sao atualizadas a cada frame.

## Regras

- Modo monofasico usa uma senoide base.
- Modo trifasico usa tres fases com defasagem de 120 graus.
- Carga aberta zera a corrente secundaria.
- Carga resistiva mantem corrente em fase com a tensao secundaria.
- Carga indutiva atrasa a corrente em 90 graus.
- O fluxo magnetico e modelado como integral visual da tensao, defasado em 90 graus.
- A tensao secundaria RMS e calculada por `Vs = Vp / (Np/Ns)`.
- O nucleo possui permeabilidade ajustavel, joelho de saturacao e histerese.
- A corrente de magnetizacao cresce de forma nao linear quando o fluxo ideal ultrapassa o joelho de saturacao.
- O painel B-H mostra a relacao instantanea entre campo magnetizante `H` e densidade relativa de fluxo `B`.

## Estados

- `running`: simulacao ativa ou pausada.
- `phaseMode`: `single` ou `three`.
- `loadType`: `open`, `resistive` ou `inductive`.
- Parametros analogicos: `voltage`, `frequency`, `turnsRatio`, `zoom`.
- Parametros do nucleo: `corePermeability`, `coreSaturation`, `hysteresis`.
- Canais do osciloscopio: `vp`, `vs`, `is`, `phi`, `im`.

## Entradas e Saidas

- Entradas: botoes segmentados e sliders.
- Saidas: canvas principal, osciloscopio, painel B-H, leituras RMS/fator de potencia/fluxo/magnetizacao/saturacao e formulas dinamicas.

## Feedback ao Usuario

- Brilho do nucleo aumenta com modulo do fluxo.
- Halo vermelho indica saturacao crescente.
- Particulas aceleram, invertem sentido ou param conforme corrente instantanea.
- O osciloscopio confirma fase, defasagem e amplitude.
- A curva `Im` mostra corrente magnetizante e picos de saturacao.
- Botao de pausa troca estado visual e acessivel.

## Criterios de Aceitacao

- O app roda em navegador moderno via servidor estatico.
- Alteracoes nos controles modificam a simulacao sem recarregar a pagina.
- O modo trifasico exibe tres bobinas/fases e curvas defasadas.
- A carga aberta para a corrente secundaria.
- A carga indutiva mostra atraso da curva de corrente.
- Controles de nucleo alteram leituras, brilho e curva B-H.
- Canais do osciloscopio podem ser ligados e desligados.
- A interface se adapta a desktop e mobile sem sobreposicao intencional de texto.

## Impactos Tecnicos

- A logica fisica fica em `src/domain`.
- Estado e particulas ficam em `src/application`.
- DOM e Canvas ficam em `src/interfaces`.
- A implementacao e vanilla JS para reduzir dependencias na primeira iteracao.

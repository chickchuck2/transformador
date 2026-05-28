# Contratos Internos da Simulacao

## SimulatorState

```js
{
  running: boolean,
  time: number,
  frequency: number,
  voltage: number,
  turnsRatio: number,
  phaseMode: "single" | "three",
  loadType: "open" | "resistive" | "inductive",
  zoom: number,
  coreSaturation: number,
  corePermeability: number,
  hysteresis: number,
  channels: {
    vp: boolean,
    vs: boolean,
    is: boolean,
    phi: boolean,
    im: boolean
  },
  audio: {
    enabled: boolean,
    volume: number
  },
  diagnostics: Array<Diagnostic>
}
```

## Diagnostic

```js
{
  severity: "ok" | "info" | "warning" | "danger",
  code: string,
  title: string,
  detail: string
}
```

## Funcoes de Dominio

- `primaryVoltageAt(time, state, phaseIndex)`: tensao primaria instantanea.
- `secondaryVoltageAt(time, state, phaseIndex)`: tensao secundaria instantanea com oposicao de Lenz.
- `primaryFluxAt(time, state, phaseIndex)`: fluxo relativo defasado da tensao.
- `idealFluxAt(time, state, phaseIndex)`: fluxo antes da compressao por saturacao.
- `saturationLevelAt(time, state, phaseIndex)`: percentual educacional de saturacao.
- `magnetizingCurrentAt(time, state, phaseIndex)`: corrente magnetizante relativa.
- `hysteresisPointAt(time, state, phaseIndex)`: ponto `B-H` para o painel de histerese.
- `secondaryCurrentAt(time, state, phaseIndex)`: corrente secundaria conforme carga.
- `secondaryVoltageRms(state)`: tensao secundaria RMS.
- `powerFactor(loadType)`: fator de potencia educacional aproximado.

## Funcoes de Diagnostico

- `inputReadings(state)`: resumo de entrada.
- `outputReadings(state)`: resumo de saida.
- `evaluateDiagnostics(state)`: lista de problemas ativos.
- `worstSeverity(diagnostics)`: maior severidade ativa.

## Renderizadores

- `SimulationRenderer.render(state, particles)`: desenha transformador, bobinas, particulas e fluxo.
- `ScopeRenderer.render(state)`: desenha grade e ondas do osciloscopio.
- `AudioEngine.update(state)`: sintetiza hum e alertas com Web Audio quando habilitado.

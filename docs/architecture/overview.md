# Arquitetura - TransFlux 360

## Camadas

- `src/domain`: funcoes puras de eletrotecnica, defasagem, tensao, corrente, fluxo e descricoes fisicas.
- `src/application`: estado da simulacao, atualizacao temporal e sistema de particulas.
- `src/interfaces`: integracao com DOM, Web Audio, controles e renderizadores Canvas.
- `src/interfaces/helpContent.js`: dicionario de explicacoes leigas para termos visiveis.
- `src/interfaces/helpController.js`: injeta botoes `?` e controla o popover de ajuda.

## Fluxo de Dados

1. `src/main.js` cria estado, particulas e renderizadores.
2. `requestAnimationFrame` calcula `deltaSeconds`.
3. `stepState` avanca o tempo.
4. `refreshDiagnostics` atualiza problemas ativos.
5. `updateParticles` aplica as grandezas fisicas instantaneas.
6. Renderizadores leem o estado e desenham a experiencia visual.
7. `domControls` sincroniza inputs, metricas, diagnosticos e formulas.
8. `AudioEngine` sintetiza feedback sonoro opcional.
9. `helpController` apresenta explicacoes contextuais sob demanda.

## Principios

- O dominio nao acessa DOM nem Canvas.
- A interface nao reimplementa equacoes.
- Diagnosticos sao calculados no dominio e apenas apresentados na interface.
- O estado central e simples e serializavel.
- Renderizacao e fisica sao separadas para facilitar testes futuros.

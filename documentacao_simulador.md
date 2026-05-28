# Documentação Técnica e Conceitual: Simulador de Fluxo de Transformadores

Este documento serve como o **Guia de Especificação e Blueprint Eletromagnético** para a criação do simulador interativo de transformadores monofásicos e trifásicos. O objetivo principal deste projeto é traduzir conceitos complexos de eletromagnetismo e engenharia elétrica em uma interface visual fluida, altamente explicativa e esteticamente premium.

---

## 🌌 1. Visão Geral do Projeto

O **TransFlux 360** é um simulador educacional focado na visualização de grandezas invisíveis a olho nu: **corrente elétrica** (fluxo de elétrons) e **fluxo magnético** (indução no núcleo de ferro). 

Ao alternar entre sistemas monofásicos e trifásicos, o usuário deve compreender instantaneamente a diferença na entrega de potência, na defasagem angular de $120^\circ$ e no comportamento de cargas indutivas e resistivas.

```
+-----------------------------------------------------------------+
|                         TRANSFLUX 360                           |
+-----------------------------------+-----------------------------+
|                                   |  [ CONTROLES INTERATIVOS ]  |
|  [ ÁREA DO CANVAS DE SIMULAÇÃO ]  |                             |
|                                   |  - Fase: [Mono] vs [Tri]    |
|   - Bobinas primárias/secundárias |  - Tensão: 50V - 440V       |
|   - Partículas de elétrons        |  - Frequência: 10Hz - 120Hz |
|   - Brilho de fluxo magnético     |  - Relação: 0.25 - 4.0      |
|                                   |  - Carga: [Abe] [Res] [Ind] |
|                                   +-----------------------------|
|                                   |  [ FÓRMULAS DINÂMICAS ]     |
+-----------------------------------+                             |
|  [ OSCILOSCÓPIO DIGITAL ]         |  - Exibição de equações     |
|  - Curvas de V, I, Phi em tempo   |  - Status do sistema        |
|    real com grid escuro neon      |                             |
+-----------------------------------+-----------------------------+
```

---

## 📚 2. Princípios Físicos Modelados

A fidelidade física é a espinha dorsal da simulação. O software modela três pilares fundamentais do eletromagnetismo:

### A. Lei da Indução de Faraday-Lenz
A tensão induzida no enrolamento secundário é proporcional à taxa de variação temporal do fluxo magnético através da bobina:

$$V_s(t) = -N_s \frac{d\Phi(t)}{dt}$$

O sinal negativo (Lei de Lenz) indica que o sentido da corrente induzida opõe-se à variação do fluxo magnético que a produz. No simulador, isso se reflete na direção das partículas no secundário em relação ao primário.

### B. Comportamento Monofásico vs. Trifásico
1.  **Monofásico:** Apenas uma onda senoidal de tensão. O fluxo magnético pulsa longitudinalmente no núcleo e passa por zero $2 \times$ por ciclo.
2.  **Trifásico:** Três ondas defasadas em $120^\circ$ elétricos ($\frac{2\pi}{3}$ radianos).
    *   As tensões instantâneas são dadas por:
        $$V_A(t) = V_m \cdot \sin(\omega t)$$
        $$V_B(t) = V_m \cdot \sin(\omega t - 120^\circ)$$
        $$V_C(t) = V_m \cdot \sin(\omega t - 240^\circ)$$
    *   No núcleo de 3 colunas, o fluxo magnético total é a superposição dos três fluxos:
        $$\Phi_{Total}(t) = \Phi_A(t) + \Phi_B(t) + \Phi_C(t) = 0$$ (em sistema equilibrado)
    *   Esta propriedade física evita a necessidade de um caminho magnético de retorno, pois o fluxo de uma coluna sempre retorna pelas outras duas. **Isso deve ser ilustrado de forma brilhante com a fusão das cores dos fluxos magnéticos no núcleo.**

### C. Tipos de Carga e Fator de Potência (Desfasamento)
A relação de fase entre a tensão secundária ($V_s$) e a corrente secundária ($I_s$) muda de acordo com a carga conectada:

*   **Circuito Aberto:** $I_s = 0$. Os elétrons no secundário permanecem estáticos, mas a oscilação de tensão ainda ocorre no primário.
*   **Carga Resistiva:** Corrente em fase com a tensão ($\theta = 0^\circ$). Os elétrons no secundário movem-se em perfeita sincronia temporal com a tensão induzida.
*   **Carga Indutiva:** A corrente atrasa-se em relação à tensão ($\theta \approx 90^\circ$ em indutor ideal). No simulador, a animação das partículas de corrente começará a mover-se apenas um quarto de ciclo depois que a onda de tensão atingir seu pico, criando um contraste visual fantástico.

---

## 🎨 3. Especificações da Interface Visual (UI/UX)

A interface deve parecer uma **cabine de controle de uma subestação de energia moderna** integrada a um laboratório de alta tecnologia.

### Paleta de Cores Eletromagnéticas

| Elemento | Cor Hex / HSL | Efeito Visual | Significado Físico |
| :--- | :--- | :--- | :--- |
| **Fundo Principal** | `#080b11` | Profundo, opaco | Isolamento elétrico visual |
| **Painéis Glass** | `rgba(17, 24, 39, 0.65)` | Backdrop blur $16px$ | Organização de controles |
| **Fase A / Monofásico**| `#FF6B00` | Brilho neon laranja | Condutor sob tensão senoidal padrão |
| **Fase B** | `#00F0FF` | Ciano elétrico ativo | Segunda fase trifásica |
| **Fase C** | `#FF007F` | Magenta vibrante | Terceira fase trifásica |
| **Secundário** | `#A855F7` | Violeta profundo | Tensão induzida/transformada |
| **Núcleo de Ferro** | `#1F2937` a `#374151` | Gradiente com borda metálica | Núcleo ferromagnético laminado |
| **Fluxo Magnético** | `#EAB308` | Aura brilhante difusa | Linhas de campo de indução |

---

## 🖥️ 4. Arquitetura do Software e Lógica do Motor (Canvas)

A simulação é baseada em um loop contínuo de renderização de alta precisão (`requestAnimationFrame`) que processa duas tarefas simultâneas: **atualização da física das partículas** e **redesenho de elementos gráficos**.

### A. Estrutura do Estado (State Pattern)
O comportamento de todo o simulador é governado por um único objeto central de estado:

```javascript
const SimulatorState = {
    running: true,
    time: 0,
    frequency: 60,       // Hertz
    voltage: 127,        // Volts no primário
    turnsRatio: 1.0,     // Np / Ns
    phaseMode: 'single', // 'single' ou 'three'
    loadType: 'resistive', // 'open', 'resistive', 'inductive'
    zoom: 1.0
};
```

### B. Algoritmo de Animação de Partículas (Elétrons)
Cada elétron é representado como um ponto que se desloca ao longo de um caminho paramétrico pré-calculado (a espiral da bobina).

1.  **Definição do Caminho:** A bobina é modelada como uma série de curvas de Bezier ou linhas conectadas que imitam espiras 3D projetadas em 2D.
2.  **Cálculo da Velocidade:**
    $$Velocidade(t) = AmplitudeCorrente \cdot \sin(\omega t - \phi)$$
3.  **Movimentação:** A cada frame, a coordenada paramétrica $s$ (de $0$ a $1$) de cada partícula é incrementada:
    $$s_{novo} = s_{antigo} + Velocidade(t) \cdot \Delta t$$
    Se $s$ ultrapassar $1$ ou cair abaixo de $0$, a partícula faz o *looping* para a próxima espira ou condutor de retorno.

### C. Simulação de Fluxo Magnético no Núcleo
O fluxo magnético $\Phi(t)$ é desenhado usando gradientes radiais sobrepostos nas colunas do núcleo do transformador.

*   **Monofásico:** Uma máscara de transparência (alfa) é atualizada com base na função $|\cos(\omega t)|$. O gradiente dourado acende e apaga nas pernas esquerda e direita, alternando a direção visual das flechas de fluxo.
*   **Trifásico:** Como os fluxos são defasados por $120^\circ$, o brilho de cada uma das três pernas físicas oscila de forma assíncrona. Quando o brilho da perna central decai, as pernas laterais brilham intensamente com polaridades opostas, simulando visualmente a conservação do fluxo magnético no circuito fechado de ferro.

---

## 📈 5. O Osciloscópio Digital

O painel inferior abriga um osciloscópio de varredura clássico com linhas de grade finas (`rgba(255, 255, 255, 0.05)`).

```javascript
// Exemplo conceitual da lógica de plotagem no Canvas
function plotOscilloscope(canvas, ctx, state) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    
    // Plotar Tensão
    ctx.strokeStyle = '#ff6b00';
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
        let t = state.time - (canvas.width - x) * 0.0001;
        let y = canvas.height/2 + Math.sin(2 * Math.PI * state.frequency * t) * (state.voltage * 0.1);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
}
```

*   **Curva de Tensão ($V$):** Plotada em laranja para o primário e roxo para o secundário.
*   **Curva de Corrente ($I$):** Deslocada no eixo temporal de acordo com a seleção de carga (perfeitamente alinhada na carga resistiva e deslocada para a direita na carga indutiva).
*   **Curva de Fluxo ($\Phi$):** Sempre defasada em exatamente $90^\circ$ em relação à tensão de entrada.

---

## 🎓 6. Roteiro Educacional para Exploração

A documentação conceitual prevê os seguintes experimentos que podem ser conduzidos na interface:

1.  **Experimento do Elevador de Tensão:** Ajustar a relação de espiras para $0.25$ (primário com menos voltas que o secundário). Observar como a corrente diminui (partículas mais lentas) no secundário, mas a tensão duplica no osciloscópio.
2.  **Experimento da Carga Aberta:** Colocar o seletor de carga em "Aberto". Observar que, embora exista fluxo magnético concluído no núcleo e tensão no secundário, as partículas de corrente do secundário ficam completamente inertes.
3.  **Experimento Trifásico Harmonioso:** Mudar para o modo trifásico e focar o olhar no ponto central do núcleo superior. Perceber como a energia magnética flui suavemente entre as colunas sem nunca zerar, comprovando a superioridade mecânica e de torque dos motores trifásicos.

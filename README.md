# ⚡ TransFlux 360 - Simulador Eletromagnético de Transformadores

[![Simulação Ativa](https://img.shields.io/badge/Status-Documentado-orange?style=for-the-badge)](file:///c:/Users/chick/Desktop/transformador/documentacao_simulador.md)
[![Arquitetura](https://img.shields.io/badge/Architecture-Clean--Arch-blueviolet?style=for-the-badge)](file:///c:/Users/chick/Desktop/transformador/CONTRIBUTING.md)
[![Aesthetics](https://img.shields.io/badge/Design-Glassmorphism_Dark-blue?style=for-the-badge)](#-design-visual-e-aestetics)

O **TransFlux 360** é uma plataforma educacional e simulador interativo de alta fidelidade visual projetado para navegadores modernos. A aplicação tem como propósito principal **tornar visíveis os fenômenos invisíveis do eletromagnetismo**: o fluxo de elétrons (corrente elétrica) e o acoplamento magnético (fluxo magnético $\Phi$) que ocorrem no núcleo de ferro de transformadores monofásicos e trifásicos.

---

## 🔮 Recursos Principais

*   **Simulação Dual de Fases:**
    *   **Modo Monofásico:** Visualização de uma onda senoidal única com fluxo pulsante no núcleo de duas colunas.
    *   **Modo Trifásico:** Demonstração interativa de 3 ondas defasadas em $120^\circ$ elétricos, mostrando graficamente como os fluxos se equilibram perfeitamente em um núcleo de 3 colunas ($\Phi_A + \Phi_B + \Phi_C = 0$).
*   **Partículas Dinâmicas (Elétrons):** Partículas brilhantes neon que se movem ao longo dos enrolamentos com velocidade e direção governadas pelas leis da corrente alternada em tempo real.
*   **Ajustes Físicos Interativos:** Sliders de precisão para controlar a tensão primária ($V_{in}$), frequência ($f$) e a relação de espiras do transformador ($N_p/N_s$ - elevador ou rebaixador).
*   **Fator de Potência Visual:** Seletores de carga (resistiva e indutiva) que mostram fisicamente a corrente atrasando-se em relação à tensão sob carga indutiva.
*   **Osciloscópio Digital Real-time:** Um gráfico de varredura digital embutido que plota dinamicamente as ondas de Tensão ($V$), Corrente ($I$) e Fluxo ($\Phi$).

---

## 🏗️ Estrutura do Projeto e Clean Architecture

O projeto adota uma arquitetura em camadas bem definida para separar regras físicas puras da interface visual, facilitando a manutenção e futuras contribuições.

```
transformador/
├── docs/                      # Decisões de design e planos técnicos
│   ├── documentacao_simulador.md # Especificação científica e física master
│   └── plano_implementacao.md  # Fases macros de engenharia de software
├── src/
│   ├── domain/                # 🔬 Regras Físicas e Fórmulas Puras (Matemática Pura)
│   │   └── electromagnetism.js # Equações de Faraday, Lenz, defasagens e cargas
│   ├── application/           # ⚙️ Orquestração e Gerenciamento de Estado
│   │   └── state.js           # SimulatorState e loop de eventos principal
│   └── interfaces/            # 🎨 UI, Canvas 2D e Renderização Visual
│       ├── domHandlers.js     # Captura de sliders e alteração de textos
│       ├── canvasEngine.js    # Renderizador das bobinas, núcleo e partículas
│       └── oscilloscope.js    # Renderizador das curvas senoidais na tela do osciloscópio
├── index.html                 # Estrutura semântica e controles
├── styles.css                 # Estilos visuais no tema Sleek Dark e Glassmorphism
├── CONTRIBUTING.md            # Padrões e regras de qualidade para contribuidores
└── README.md                  # Este guia intuitivo de introdução
```

### Detalhamento das Camadas do Código

```
      ┌─────────────────────────────────────────────────────────┐
      │                      INTERFACES                         │
      │   (DOM, Canvas 2D, Eventos de Mouse, CSS/HTML)          │
      └───────────┬─────────────────────────────────▲───────────┘
                  │ Atualiza Estado                 │ Renderiza Dados
                  ▼                                 │
      ┌─────────────────────────────────────────────┴───────────┐
      │                      APPLICATION                        │
      │   (SimulatorState, Loop de Animação, Time-control)      │
      └───────────┬─────────────────────────────────▲───────────┘
                  │ Solicita Física                 │ Retorna Cálculos
                  ▼                                 │
      ┌─────────────────────────────────────────────┴───────────┐
      │                        DOMAIN                           │
      │   (Fórmulas de Faraday, Leis de Defasagem, Fases)       │
      └─────────────────────────────────────────────────────────┘
```

---

## 📚 Física Simplificada: Como Ler o Simulador

Para aproveitar ao máximo o simulador, preste atenção aos seguintes fenômenos físicos refletidos na interface:

### 1. A Relação de Espiras ($N_p/N_s$)
*   Se a relação for menor que $1.0$ (ex: $0.5$): O transformador é **elevador**. Você verá menos voltas de fio no primário e muitas no secundário. A tensão no osciloscópio secundário será maior.
*   Se for maior que $1.0$ (ex: $2.0$): O transformador é **rebaixador**. Você verá muitas voltas no primário e poucas no secundário. A tensão secundária diminui, mas a corrente é capaz de subir.

### 2. O Equilíbrio Trifásico
No modo trifásico, as três pernas do transformador oscilam em brilho dourado de maneira assíncrona. Observe que em qualquer instante do tempo, **o brilho total (energia magnética) somado das colunas é constante**, o que elimina as oscilações de potência comuns em redes monofásicas.

### 3. A Carga Indutiva
Ao selecionar "Indutiva", observe as partículas de elétrons do secundário. Elas não mudam de direção no instante em que a tensão secundária cruza o zero. O movimento das partículas fica **visivelmente atrasado**, ilustrando fisicamente o conceito de reatância indutiva e defasagem de corrente.

---

## 🚀 Como Executar

Por ser construído inteiramente com tecnologias nativas (**HTML5 sem frameworks, Vanilla CSS e Vanilla JS**), o projeto não requer nenhuma etapa complexa de compilação ou instalação.

### Opção 1: Direto no Navegador (Mais Rápido)
1. Dê um duplo clique no arquivo [index.html](file:///c:/Users/chick/Desktop/transformador/index.html) para abri-lo diretamente em qualquer navegador moderno.

### Opção 2: Servidor Local Leve (Recomendado)
Para garantir o carregamento correto de módulos ES6 em JavaScript localmente sem erros de CORS, execute um servidor leve na pasta do projeto:

**Via Python:**
```bash
python -m http.server 8000
```
Abra no navegador: `http://localhost:8000`

**Via Node.js (se instalado):**
```bash
npx serve .
```

---

## 🤝 Diretrizes para Contribuição

Antes de propor alterações no código, consulte o arquivo [CONTRIBUTING.md](file:///c:/Users/chick/Desktop/transformador/CONTRIBUTING.md) para garantir a consistência das camadas e a performance do motor gráfico.

### Padrões Fundamentais:
1.  **Regra de Ouro:** Não quebre a separação de conceitos. Nenhuma fórmula física de Faraday/Lenz deve estar escrita dentro de arquivos de renderização do Canvas ou DOM (`interfaces`). Toda matemática deve pertencer puramente ao `domain`.
2.  **Performance:** O loop do canvas roda a 60 quadros por segundo. Evite criar arrays, instanciar objetos pesados ou realizar cálculos complexos de busca de elementos no DOM dentro da função de desenho.

---

⚡ *TransFlux 360 - Visualizando a força invisível que move o mundo.*

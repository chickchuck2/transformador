# Plano de Implementação - Simulador TransFlux

Este plano descreve o roteiro técnico detalhado para transformar a ideia conceitual documentada em uma aplicação interativa viva rodando em navegadores modernos.

---

## 📅 Roteiro de Desenvolvimento (Fases)

### Fase 1: Fundação do Layout Semântico e Sistema de Design (HTML/CSS)
*   Montagem do arcabouço HTML estruturado sob rígidos padrões de acessibilidade (ARIA labels, semântica).
*   Estabelecer a paleta escura profunda com cores vibrantes HSL para as fases (Laranja Cobre, Ciano Neon, Rosa Magenta) e roxo para o circuito secundário.
*   Acabamento estético de Glassmorphism com bordas brilhantes difusas e sombras neon.

### Fase 2: Construção do Motor Eletromagnético (Canvas 2D)
*   Desenvolvimento do loop de renderização baseado em `requestAnimationFrame` para física suave a 60fps estáveis.
*   Codificação dos vetores paramétricos para desenhar as bobinas tridimensionais achatadas em 2D.
*   Criação das rotas e nós ferromagnéticos para o fluxo magnético oscilante.

### Fase 3: Dinâmica de Partículas e Campos Fluídos
*   Implementação física das partículas de elétrons com velocidades regidas pela corrente instantânea:
    $$i(t) = i_0 \cdot \sin(\omega t - \theta)$$
*   Desenho e modulação do brilho magnético com mapas de opacidade nas pernas ferrosas do transformador.

### Fase 4: O Osciloscópio Digital
*   Desenho dinâmico das ondas senoidais de Tensão ($V$), Corrente ($I$) e Fluxo ($\Phi$) em tempo real com grade milimetrada.
*   Controle individual dos canais via checkboxes na interface.

### Fase 5: Conectores e Painel de Controle
*   Vincular sliders de Frequência, Tensão, Fator de Espiras e Seletores de Cargas diretamente ao motor físico do JavaScript.
*   Validação de renderização suave e sem perdas de frame.

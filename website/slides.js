// =============================================================
//  DADOS DOS SLIDES — Transformadores Elétricos
// =============================================================

const SLIDES = [

// ── 01 ─ CAPA ─────────────────────────────────────────────
{
  title: "Transformadores Elétricos",
  short: "Capa",
  html: `
    <div class="slide-hero">
      <div class="hero-badge">⚡</div>
      <h1 class="hero-title">Transformadores<br>Elétricos</h1>
      <p class="hero-sub">Como funcionam, tipos, aplicações e muito mais</p>
      <div class="hero-desc">
        Um mergulho completo nos dispositivos que tornam possível
        a distribuição de energia elétrica no mundo moderno.
      </div>
    </div>
  `
},

// ── 02 ─ CONCEITO ─────────────────────────────────────────
{
  title: "O que é um Transformador?",
  short: "Conceito",
  html: `
    <div class="slide-tag">⚙️ Definição</div>
    <h2 class="slide-title">O que é um Transformador?</h2>
    <p class="slide-text">
      Um transformador é um <strong style="color:var(--text-heading)">dispositivo elétrico estático</strong>
      que transfere energia elétrica entre dois ou mais circuitos, alterando os níveis de tensão e
      corrente — sem mudar a frequência e sem contato elétrico direto.
    </p>
    <div class="divider"></div>
    <div class="section-title">Características Fundamentais</div>
    <ul class="bullet-list">
      <li>Funciona exclusivamente com <strong>Corrente Alternada (CA)</strong></li>
      <li>Utiliza o princípio da <strong>indução eletromagnética</strong></li>
      <li>Não possui partes móveis</li>
      <li>Mantém praticamente a mesma potência entre entrada e saída</li>
    </ul>
    <div class="divider"></div>
    <div class="card" style="background:rgba(0,212,255,0.05); border-color:rgba(0,212,255,0.25);">
      <p style="font-size:0.88rem; color:var(--text-muted); font-style:italic;">
        📌 A potência de entrada é praticamente igual à de saída —
        apenas a tensão e a corrente se transformam.
      </p>
    </div>
  `
},

// ── 03 ─ INDUÇÃO ELETROMAGNÉTICA ──────────────────────────
{
  title: "Indução Eletromagnética",
  short: "Indução Eletromagnética",
  html: `
    <div class="slide-tag">🔬 Princípio Físico</div>
    <h2 class="slide-title">A Base de Tudo: Indução Eletromagnética</h2>
    <p class="slide-text">
      Descoberta por <strong style="color:var(--text-heading)">Michael Faraday</strong>, a indução
      eletromagnética é o fenômeno em que a variação de um campo magnético nas proximidades de um
      condutor gera uma corrente elétrica.
    </p>
    <div class="notice">
      ⚠️ <span>Um campo magnético <strong>estático (parado)</strong> não gera energia.
      A "mágica" só acontece quando há <strong>variação</strong> na intensidade do campo.</span>
    </div>
    <div class="section-title">Três Pontos da Lei de Faraday-Lenz</div>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h4>Campo Magnético Variável</h4>
          <p>O campo precisa estar em movimento ou mudança constante para que qualquer efeito ocorra.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h4>Fluxo Magnético</h4>
          <p>É a quantidade de "linhas" do campo magnético que atravessam a área de um circuito.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h4>Força Eletromotriz (Tensão)</h4>
          <p>Quando o fluxo muda, os elétrons do fio são "empurrados", criando uma tensão elétrica.</p>
        </div>
      </div>
    </div>
    <div class="formula-block">
      <div class="formula-text">V₁ / V₂ = N₁ / N₂</div>
      <div class="formula-legend">V = tensão &nbsp;|&nbsp; N = número de espiras</div>
    </div>
  `
},

// ── 04 ─ COMPONENTES ──────────────────────────────────────
{
  title: "Componentes do Transformador",
  short: "Componentes",
  html: `
    <div class="slide-tag">🔩 Estrutura</div>
    <h2 class="slide-title">Estrutura Interna do Transformador</h2>
    <p class="slide-text">
      Um transformador é formado por componentes simples, mas de alta precisão.
      Cada peça tem um papel essencial no processo de transferência de energia.
    </p>
    <div class="divider"></div>
    <div class="card card-num">
      <div class="n">1</div>
      <div class="content"><h4>Núcleo Magnético</h4><p>Feito de chapas de aço silício empilhadas. Concentra, guia e conduz o fluxo magnético, reduzindo perdas por dispersão.</p></div>
    </div>
    <div class="card card-num">
      <div class="n">2</div>
      <div class="content"><h4>Enrolamento Primário</h4><p>Conectado à fonte de energia (entrada). Recebe a tensão de entrada e cria o campo magnético variável.</p></div>
    </div>
    <div class="card card-num">
      <div class="n">3</div>
      <div class="content"><h4>Enrolamento Secundário</h4><p>Conectado à carga (saída). Recebe o fluxo magnético e entrega a energia com nova tensão e corrente.</p></div>
    </div>
    <div class="card card-num">
      <div class="n">4</div>
      <div class="content"><h4>Isolamento</h4><p>Materiais especiais entre fios, enrolamentos e núcleo. Evita curtos-circuitos e garante segurança elétrica.</p></div>
    </div>
    <div class="card card-num">
      <div class="n">5</div>
      <div class="content"><h4>Caixa e Meio Isolante</h4><p>Geralmente com óleo isolante — resfria internamente e protege contra umidade e danos mecânicos.</p></div>
    </div>
    <div class="card card-num">
      <div class="n">6</div>
      <div class="content"><h4>Terminais / Conectores</h4><p>Pontos físicos de ligação com a rede elétrica ou a carga do circuito externo.</p></div>
    </div>
  `
},

// ── 05 ─ FUNCIONAMENTO PASSO A PASSO ──────────────────────
{
  title: "Funcionamento Passo a Passo",
  short: "Como Funciona",
  html: `
    <div class="slide-tag">🔄 Operação</div>
    <h2 class="slide-title">Como o Transformador Funciona?</h2>
    <p class="slide-subtitle">O fluxo completo de operação</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h4>Entrada</h4>
          <p>Energia em corrente alternada (CA) é aplicada no enrolamento primário.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h4>Conversão Eletromagnética</h4>
          <p>Energia elétrica → energia magnética. A corrente alternada cria um campo magnético variável que cresce, diminui e inverte constantemente.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h4>Transferência pelo Núcleo</h4>
          <p>O campo magnético variável se propaga pelo núcleo e alcança o enrolamento secundário, cortando suas espiras.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h4>Reconversão</h4>
          <p>Energia magnética → energia elétrica. A variação do campo induz uma nova tensão no enrolamento secundário, com valor proporcional ao número de espiras.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">5</div>
        <div class="step-body">
          <h4>Saída</h4>
          <p>A energia é entregue ao circuito ou carga conectada ao secundário, com tensão e corrente adequadas ao uso.</p>
        </div>
      </div>
    </div>
    <div class="notice">
      ⚡ <span><strong>Não há contato elétrico direto</strong> entre primário e secundário.
      A transferência ocorre <em>apenas</em> por campo magnético.</span>
    </div>
  `
},

// ── 06 ─ FÓRMULA E RELAÇÃO ────────────────────────────────
{
  title: "Fórmula e Relação de Transformação",
  short: "Fórmula (k)",
  html: `
    <div class="slide-tag">📐 Matemática</div>
    <h2 class="slide-title">A Fórmula Chave dos Transformadores</h2>
    <p class="slide-subtitle">Relação de Transformação (k)</p>
    <div class="formula-block">
      <div class="formula-text">k = N₁/N₂ = V₁/V₂ = I₂/I₁</div>
      <div class="formula-legend">
        k = relação de transformação &nbsp;|&nbsp;
        N = nº de espiras &nbsp;|&nbsp;
        V = tensão &nbsp;|&nbsp;
        I = corrente
      </div>
    </div>
    <div class="section-title">Interpretação dos Resultados</div>
    <div class="k-cards">
      <div class="k-card" style="border-color:rgba(239,68,68,0.35)">
        <div class="k-val" style="color:#EF4444">k &gt; 1</div>
        <p>Secundário tem <strong>menos</strong> espiras → tensão de saída <strong>menor</strong> → Transformador <strong>Abaixador</strong></p>
      </div>
      <div class="k-card" style="border-color:rgba(16,185,129,0.35)">
        <div class="k-val" style="color:#10B981">k &lt; 1</div>
        <p>Secundário tem <strong>mais</strong> espiras → tensão de saída <strong>maior</strong> → Transformador <strong>Elevador</strong></p>
      </div>
      <div class="k-card" style="border-color:rgba(0,212,255,0.35)">
        <div class="k-val">k = 1</div>
        <p>Mesma quantidade de espiras → tensão igual → Transformador de <strong>Isolamento</strong></p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="card" style="background:rgba(124,58,237,0.06); border-color:rgba(124,58,237,0.3);">
      <p style="font-size:0.88rem; color:var(--text-dim);">
        ⚖️ <strong style="color:var(--text-heading)">Conservação de energia:</strong>
        P = V × I — quando a tensão sobe, a corrente cai e vice-versa.
        A potência total permanece praticamente constante.
      </p>
    </div>
  `
},

// ── 07 ─ POR QUE NÃO FUNCIONA COM CC ─────────────────────
{
  title: "Por que NÃO funciona com CC?",
  short: "CA vs CC",
  html: `
    <div class="slide-tag">🚫 Limitação Fundamental</div>
    <h2 class="slide-title">Por que Transformadores NÃO Funcionam com CC?</h2>
    <div class="two-panels" style="margin-top:24px">
      <div class="panel green">
        <div class="panel-icon">✅</div>
        <h3>Corrente Alternada (CA)</h3>
        <ul>
          <li>Muda de direção 60×/s (no Brasil)</li>
          <li>Campo magnético varia constantemente</li>
          <li>Variação "corta" as espiras do secundário</li>
          <li>Induz nova tensão → transferência funciona</li>
        </ul>
        <div style="margin-top:12px; padding:8px 12px; background:rgba(16,185,129,0.1); border-radius:8px; font-size:0.78rem; color:#6EE7B7; font-family:var(--font-mono);">
          CA variável → Campo variável → Indução ✅
        </div>
      </div>
      <div class="panel red">
        <div class="panel-icon">⛔</div>
        <h3>Corrente Contínua (CC)</h3>
        <ul>
          <li>Valor estável, sempre na mesma direção</li>
          <li>Campo magnético fica parado, estático</li>
          <li>Campo estático não induz tensão alguma</li>
          <li>Resultado: nenhuma transferência de energia</li>
        </ul>
        <div style="margin-top:12px; padding:8px 12px; background:rgba(239,68,68,0.1); border-radius:8px; font-size:0.78rem; color:#FCA5A5; font-family:var(--font-mono);">
          CC fixa → Campo fixo → Sem indução ⛔
        </div>
      </div>
    </div>
    <div class="notice notice-danger" style="margin-top:20px;">
      🔥 <span><strong>Risco grave:</strong> Ligar CC no primário pode <strong>queimar o transformador</strong>.
      Sem a "resistência magnética" da CA (reatância), a corrente fica altíssima,
      o fio superaquece e o isolamento derrete — causando curto ou incêndio.</span>
    </div>
  `
},

// ── 08 ─ ANALOGIA ─────────────────────────────────────────
{
  title: "Analogia: CA vs. CC",
  short: "Analogia da Colher",
  html: `
    <div class="slide-tag">💡 Entendendo com Analogia</div>
    <h2 class="slide-title">Entendendo com uma Analogia</h2>
    <p class="slide-subtitle">Corrente Alternada × Corrente Contínua — de forma visual</p>
    <div class="two-panels" style="margin-top:24px">
      <div class="panel blue" style="text-align:center">
        <div style="font-size:3rem; margin-bottom:12px;">🥄💧</div>
        <h3>Corrente Alternada (CA)</h3>
        <p style="margin-top:10px; line-height:1.7;">
          É como <strong>mexer uma colher</strong> dentro de um balde de água.<br><br>
          O movimento cria <strong>ondas</strong> que se propagam pelo líquido e
          alcançam o outro lado — assim como o campo magnético variável
          atravessa o núcleo e induz tensão no secundário.
        </p>
      </div>
      <div class="panel" style="text-align:center; border-color:rgba(100,116,139,0.3)">
        <div style="font-size:3rem; margin-bottom:12px;">🥄🚫</div>
        <h3 style="color:var(--text-muted)">Corrente Contínua (CC)</h3>
        <p style="margin-top:10px; line-height:1.7; color:var(--text-muted);">
          É como <strong>deixar a colher parada</strong> dentro da água.<br><br>
          Sem movimento, <strong>nenhuma onda</strong> é criada.
          Nada se propaga, nada acontece do outro lado —
          assim como o campo estático não induz nada no secundário.
        </p>
      </div>
    </div>
    <div class="closing-card" style="margin-top:24px; padding:20px 28px">
      <p style="font-size:0.95rem; color:var(--text-dim); line-height:1.7;">
        🎯 <strong style="color:var(--accent)">Moral da analogia:</strong>
        Sem movimento, não há indução. Sem indução, não há transformação.
        O transformador precisa de variação para existir.
      </p>
    </div>
  `
},

// ── 09 ─ TIPOS — VISÃO GERAL ──────────────────────────────
{
  title: "Tipos de Transformadores",
  short: "Tipos (visão geral)",
  html: `
    <div class="slide-tag">🗂️ Classificação</div>
    <h2 class="slide-title">Tipos de Transformadores</h2>
    <p class="slide-subtitle">Classificação por função e por sistema elétrico</p>
    <div class="section-title">Por Função</div>
    <div class="card">
      <div style="display:flex; gap:14px; align-items:flex-start">
        <span style="font-size:1.8rem">⬆️</span>
        <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:4px;">Elevador</h4>
        <p style="font-size:0.88rem; color:var(--text-dim)">Aumenta a tensão de saída. Secundário tem <strong>mais espiras</strong> que o primário. Ex: saída de usinas elétricas.</p></div>
      </div>
    </div>
    <div class="card">
      <div style="display:flex; gap:14px; align-items:flex-start">
        <span style="font-size:1.8rem">⬇️</span>
        <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:4px;">Abaixador</h4>
        <p style="font-size:0.88rem; color:var(--text-dim)">Reduz a tensão de saída. Secundário tem <strong>menos espiras</strong>. Ex: postes de distribuição, carregadores.</p></div>
      </div>
    </div>
    <div class="card">
      <div style="display:flex; gap:14px; align-items:flex-start">
        <span style="font-size:1.8rem">🔄</span>
        <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:4px;">Isolamento (1:1)</h4>
        <p style="font-size:0.88rem; color:var(--text-dim)">Mesma tensão, mas separa eletricamente os circuitos. Primário = secundário em espiras. Ex: equipamentos médicos.</p></div>
      </div>
    </div>
    <div class="section-title">Por Sistema Elétrico</div>
    <div class="two-panels">
      <div class="panel blue">
        <h3>Monofásico</h3>
        <p>Opera com uma única fase (+neutro). Menor porte. Uso residencial e comercial simples.</p>
      </div>
      <div class="panel purple">
        <h3>Trifásico</h3>
        <p>Opera com 3 fases defasadas em 120°. Alta potência. Uso industrial e transmissão.</p>
      </div>
    </div>
    <div class="notice">
      ⚡ <span>Todos os tipos seguem a mesma regra: <strong>só funcionam com Corrente Alternada.</strong></span>
    </div>
  `
},

// ── 10 ─ MONOFÁSICO ───────────────────────────────────────
{
  title: "Transformador Monofásico",
  short: "Monofásico",
  html: `
    <div class="slide-tag">🔵 Tipo de Transformador</div>
    <h2 class="slide-title">Transformador Monofásico</h2>
    <p class="slide-text">
      Opera com uma única linha de fase (e neutro, ou duas fases). Ideal para demandas menores de energia.
    </p>
    <div class="two-panels">
      <div class="panel green">
        <h3>✅ Vantagens</h3>
        <div class="vd-item"><span class="vd-icon">💰</span><div class="vd-content"><h4>Custo inicial menor</h4><p>Menos material (cobre e ferro) na fabricação.</p></div></div>
        <div class="vd-item"><span class="vd-icon">🔧</span><div class="vd-content"><h4>Manutenção simplificada</h4><p>Estrutura mais simples: reparo e substituição mais rápidos.</p></div></div>
        <div class="vd-item"><span class="vd-icon">🌾</span><div class="vd-content"><h4>Versatilidade rural</h4><p>Muito utilizado em redes de distribuição rural, onde a carga é dispersa.</p></div></div>
      </div>
      <div class="panel red">
        <h3>❌ Desvantagens</h3>
        <div class="vd-item"><span class="vd-icon">⚡</span><div class="vd-content"><h4>Baixa capacidade de potência</h4><p>Não adequado para grandes indústrias ou alta potência.</p></div></div>
        <div class="vd-item"><span class="vd-icon">〰️</span><div class="vd-content"><h4>Potência pulsante</h4><p>Oscilações inerentes, não ideal para motores industriais pesados.</p></div></div>
        <div class="vd-item"><span class="vd-icon">📦</span><div class="vd-content"><h4>Maior volume em banco</h4><p>Para atingir potência de um trifásico, vários monofásicos em banco ocupam mais espaço.</p></div></div>
      </div>
    </div>
    <div class="section-title">Aplicações Típicas</div>
    <ul class="bullet-list">
      <li>Redes de distribuição secundária (127 V / 220 V residencial)</li>
      <li>Isolamento e segurança em circuitos sensíveis</li>
      <li>Autotransformadores domésticos (adaptadores de tensão)</li>
      <li>Iluminação pública em postes</li>
      <li>Eletrônicos e aparelhos domésticos</li>
    </ul>
  `
},

// ── 11 ─ TRIFÁSICO ────────────────────────────────────────
{
  title: "Transformador Trifásico",
  short: "Trifásico",
  html: `
    <div class="slide-tag">🟣 Tipo de Transformador</div>
    <h2 class="slide-title">Transformador Trifásico</h2>
    <p class="slide-text">
      Opera com três fases de corrente alternada, defasadas 120° entre si.
      Indispensável para aplicações industriais e de grande potência.
    </p>
    <div class="card" style="margin-bottom:20px; background:rgba(124,58,237,0.06); border-color:rgba(124,58,237,0.3)">
      <p style="font-size:0.86rem; color:var(--text-dim);">
        🏗️ <strong style="color:var(--text-heading)">Estrutura:</strong> Três conjuntos de enrolamentos (primário e secundário para cada fase),
        todos no mesmo núcleo ou em núcleos separados.
      </p>
    </div>
    <div class="two-panels">
      <div class="panel green">
        <h3>✅ Vantagens</h3>
        <div class="vd-item"><span class="vd-icon">⚡</span><div class="vd-content"><h4>Alta potência</h4><p>Essencial para fábricas, grandes comércios e maquinários pesados.</p></div></div>
        <div class="vd-item"><span class="vd-icon">⚖️</span><div class="vd-content"><h4>Maior eficiência</h4><p>Distribuição equilibrada com menor variação de tensão.</p></div></div>
        <div class="vd-item"><span class="vd-icon">📦</span><div class="vd-content"><h4>Mais compacto</h4><p>Para mesma alta potência, menor e mais leve que três monofásicos.</p></div></div>
        <div class="vd-item"><span class="vd-icon">🕰️</span><div class="vd-content"><h4>Vida útil prolongada</h4><p>Menor desgaste; excelente valor a longo prazo.</p></div></div>
      </div>
      <div class="panel red">
        <h3>❌ Desvantagens</h3>
        <div class="vd-item"><span class="vd-icon">💸</span><div class="vd-content"><h4>Custo inicial mais elevado</h4><p>Maior investimento na compra e instalação, com cabos e disjuntores mais robustos.</p></div></div>
        <div class="vd-item"><span class="vd-icon">👨‍🔧</span><div class="vd-content"><h4>Manutenção complexa</h4><p>Conserto de falhas internas exige técnicos altamente qualificados.</p></div></div>
      </div>
    </div>
    <div class="section-title">Aplicações Típicas</div>
    <ul class="bullet-list">
      <li>Transmissão de energia elétrica em alta tensão</li>
      <li>Grandes redes de distribuição urbana e industrial</li>
      <li>Usinas hidrelétricas, termelétricas e eólicas</li>
      <li>Motores industriais e automação</li>
    </ul>
  `
},

// ── 12 ─ LIGAÇÕES ─────────────────────────────────────────
{
  title: "Ligações: Estrela e Triângulo",
  short: "Estrela e Triângulo",
  html: `
    <div class="slide-tag">🔗 Conexões Trifásicas</div>
    <h2 class="slide-title">Tipos de Ligação em Trifásicos</h2>
    <p class="slide-subtitle">Estrela (Y) e Triângulo (Δ)</p>
    <div class="two-panels" style="margin-top:20px">
      <div class="panel blue">
        <div style="font-size:2.5rem; text-align:center; margin-bottom:10px;">Y</div>
        <h3>Ligação Estrela (Y)</h3>
        <p style="margin-bottom:10px;"><strong>Como funciona:</strong> Uma ponta de cada enrolamento é ligada em um ponto comum (neutro). As outras pontas formam as saídas de fase.</p>
        <ul>
          <li>Gera 2 tensões: fase-fase e fase-neutro</li>
          <li>Ex: 220 V entre fases / 127 V fase-neutro</li>
          <li>Muito usada em distribuição residencial</li>
        </ul>
      </div>
      <div class="panel purple">
        <div style="font-size:2.5rem; text-align:center; margin-bottom:10px;">Δ</div>
        <h3>Ligação Triângulo (Δ)</h3>
        <p style="margin-bottom:10px;"><strong>Como funciona:</strong> Enrolamentos ligados em sequência, formando um triângulo fechado. Não há ponto neutro.</p>
        <ul>
          <li>Só tensão entre fases (sem neutro)</li>
          <li>Usado em transmissão e indústrias</li>
          <li>Aplicações que não necessitam de neutro</li>
        </ul>
      </div>
    </div>
    <div class="section-title">Ligações Combinadas</div>
    <div class="card">
      <p style="font-size:0.88rem; color:var(--text-dim); line-height:1.7;">
        As combinações <strong style="color:var(--text-heading)">Estrela-Triângulo (Y-Δ)</strong>,
        <strong style="color:var(--text-heading)">Triângulo-Estrela (Δ-Y)</strong> e outras são usadas
        para ajustar tensões e atender necessidades específicas da rede elétrica.
      </p>
    </div>
    <div class="notice">
      ℹ️ <span>Em monofásicos, a ligação é simples: entrada no primário, saída no secundário, conforme a relação de espiras definida.</span>
    </div>
  `
},

// ── 13 ─ EXEMPLOS PRÁTICOS ────────────────────────────────
{
  title: "Exemplos Práticos",
  short: "Exemplos Práticos",
  html: `
    <div class="slide-tag">📍 Casos Reais</div>
    <h2 class="slide-title">Transformadores na Prática</h2>
    <p class="slide-subtitle">De onde vem a energia que usamos todos os dias?</p>
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex; gap:16px; align-items:flex-start">
        <span style="font-size:2rem">🏙️</span>
        <div>
          <h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:4px">Rede de Distribuição</h4>
          <p style="font-size:0.86rem; color:var(--text-muted); margin-bottom:6px">📍 Postes, subestações, ruas das cidades.</p>
          <p style="font-size:0.88rem; color:var(--text-dim)">Abaixa a tensão das linhas (ex: 13.800 V) para a tensão residencial (127 V ou 220 V).</p>
          <span style="display:inline-block; margin-top:6px; font-size:0.72rem; background:rgba(239,68,68,0.12); color:#FCA5A5; border-radius:4px; padding:2px 8px; border:1px solid rgba(239,68,68,0.3)">Tipo: Abaixador</span>
        </div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex; gap:16px; align-items:flex-start">
        <span style="font-size:2rem">📱</span>
        <div>
          <h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:4px">Carregadores e Eletrônicos</h4>
          <p style="font-size:0.86rem; color:var(--text-muted); margin-bottom:6px">📍 Carregadores de celular, notebooks, roteadores.</p>
          <p style="font-size:0.88rem; color:var(--text-dim)">Reduz a tensão da tomada (127 V / 220 V) para valores seguros ao circuito interno (5 V, 12 V, 19 V).</p>
          <span style="display:inline-block; margin-top:6px; font-size:0.72rem; background:rgba(239,68,68,0.12); color:#FCA5A5; border-radius:4px; padding:2px 8px; border:1px solid rgba(239,68,68,0.3)">Tipo: Abaixador</span>
        </div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex; gap:16px; align-items:flex-start">
        <span style="font-size:2rem">⚡</span>
        <div>
          <h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:4px">Usinas de Geração</h4>
          <p style="font-size:0.86rem; color:var(--text-muted); margin-bottom:6px">📍 Saída de usinas hidrelétricas, termelétricas e eólicas.</p>
          <p style="font-size:0.88rem; color:var(--text-dim)">Eleva a tensão gerada (ex: 13,8 kV) para valores altíssimos (138 kV, 230 kV, 500 kV), reduzindo perdas na transmissão.</p>
          <span style="display:inline-block; margin-top:6px; font-size:0.72rem; background:rgba(16,185,129,0.12); color:#6EE7B7; border-radius:4px; padding:2px 8px; border:1px solid rgba(16,185,129,0.3)">Tipo: Elevador</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div style="display:flex; gap:16px; align-items:flex-start">
        <span style="font-size:2rem">🏥</span>
        <div>
          <h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:4px">Transformador de Isolamento</h4>
          <p style="font-size:0.86rem; color:var(--text-muted); margin-bottom:6px">📍 Equipamentos médicos, laboratórios, indústrias.</p>
          <p style="font-size:0.88rem; color:var(--text-dim)">Mantém a mesma tensão, mas separa eletricamente os dois circuitos, eliminando risco de choque.</p>
          <span style="display:inline-block; margin-top:6px; font-size:0.72rem; background:rgba(0,212,255,0.12); color:var(--accent); border-radius:4px; padding:2px 8px; border:1px solid rgba(0,212,255,0.3)">Tipo: 1:1 — Isolamento</span>
        </div>
      </div>
    </div>
  `
},

// ── 14 ─ APLICAÇÕES POR SETOR ─────────────────────────────
{
  title: "Aplicações por Setor",
  short: "Aplicações por Setor",
  html: `
    <div class="slide-tag">🌐 Presença Global</div>
    <h2 class="slide-title">Onde os Transformadores São Usados?</h2>
    <p class="slide-subtitle">Presença essencial em toda infraestrutura elétrica moderna</p>
    <div style="display:flex; flex-direction:column; gap:12px; margin-top:20px">
      <div class="card">
        <div style="display:flex; gap:14px; align-items:center">
          <span style="font-size:1.8rem">⚡</span>
          <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:3px">Transmissão de Energia</h4>
          <p style="font-size:0.86rem; color:var(--text-dim)">Elevadores sobem a tensão para 138 kV, 230 kV ou 500 kV — permite transportar energia por centenas de km com mínimas perdas.</p></div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex; gap:14px; align-items:center">
          <span style="font-size:1.8rem">🏙️</span>
          <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:3px">Distribuição Urbana</h4>
          <p style="font-size:0.86rem; color:var(--text-dim)">Subestações e postes abaixam de 13,8 kV para 127 V / 220 V, alimentando residências, comércios e serviços públicos.</p></div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex; gap:14px; align-items:center">
          <span style="font-size:1.8rem">📱</span>
          <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:3px">Equipamentos Eletrônicos</h4>
          <p style="font-size:0.86rem; color:var(--text-dim)">Fontes e carregadores reduzem a tensão da tomada para 5 V, 12 V, 19 V para alimentar aparelhos com segurança.</p></div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex; gap:14px; align-items:center">
          <span style="font-size:1.8rem">🏥</span>
          <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:3px">Isolamento Elétrico</h4>
          <p style="font-size:0.86rem; color:var(--text-dim)">Hospitais, laboratórios e ambientes críticos usam transformadores de isolamento para eliminar risco de choque.</p></div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex; gap:14px; align-items:center">
          <span style="font-size:1.8rem">🏭</span>
          <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:3px">Indústria</h4>
          <p style="font-size:0.86rem; color:var(--text-dim)">Alimenta motores, máquinas e sistemas de automação com os níveis de tensão exatos que cada equipamento exige.</p></div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex; gap:14px; align-items:center">
          <span style="font-size:1.8rem">📊</span>
          <div><h4 style="font-family:var(--font-heading); font-weight:700; color:var(--text-heading); margin-bottom:3px">Medição e Proteção</h4>
          <p style="font-size:0.86rem; color:var(--text-dim)">Transformadores de corrente (TC) e tensão (TP) operam em medidores e relés, monitorando e protegendo os sistemas elétricos.</p></div>
        </div>
      </div>
    </div>
  `
},

// ── 15 ─ VANTAGENS E DESVANTAGENS ─────────────────────────
{
  title: "Vantagens e Desvantagens",
  short: "Vantagens e Desvantagens",
  html: `
    <div class="slide-tag">⚖️ Análise</div>
    <h2 class="slide-title">Vantagens e Desvantagens</h2>
    <div class="two-panels" style="margin-top:24px">
      <div class="panel green">
        <h3>✅ Vantagens</h3>
        <div class="vd-item"><span class="vd-icon">📈</span><div class="vd-content"><h4>Alta Eficiência</h4><p>95–98% de rendimento em modelos grandes. Quase toda energia de entrada é entregue.</p></div></div>
        <div class="vd-item"><span class="vd-icon">🔩</span><div class="vd-content"><h4>Sem Partes Móveis</h4><p>Pouca manutenção, vida útil longa, alta confiabilidade.</p></div></div>
        <div class="vd-item"><span class="vd-icon">📡</span><div class="vd-content"><h4>Fácil Ajuste de Tensão</h4><p>Transmite energia a longas distâncias com pouca perda. Adapta para qualquer uso.</p></div></div>
        <div class="vd-item"><span class="vd-icon">🛡️</span><div class="vd-content"><h4>Segurança Elétrica</h4><p>Isola circuitos, reduzindo riscos de choque elétrico.</p></div></div>
        <div class="vd-item"><span class="vd-icon">💰</span><div class="vd-content"><h4>Custo-Benefício</h4><p>Barato em relação à sua função essencial na infraestrutura elétrica.</p></div></div>
      </div>
      <div class="panel red">
        <h3>❌ Desvantagens</h3>
        <div class="vd-item"><span class="vd-icon">⛔</span><div class="vd-content"><h4>Só com CA</h4><p>Inútil para corrente contínua; ligar CC pode queimar o equipamento.</p></div></div>
        <div class="vd-item"><span class="vd-icon">📉</span><div class="vd-content"><h4>Perdas Existentes</h4><p>Pequenas, mas reais: perdas magnéticas (núcleo) e elétricas (fios).</p></div></div>
        <div class="vd-item"><span class="vd-icon">⚖️</span><div class="vd-content"><h4>Tamanho e Peso</h4><p>Grandes transformadores são volumosos e muito pesados.</p></div></div>
        <div class="vd-item"><span class="vd-icon">🛢️</span><div class="vd-content"><h4>Risco do Meio Isolante</h4><p>Modelos com óleo podem vazar, causando risco ambiental ou incêndio.</p></div></div>
        <div class="vd-item"><span class="vd-icon">🌡️</span><div class="vd-content"><h4>Sensibilidade a Sobrecarga</h4><p>Corrente acima do limite provoca superaquecimento e danos permanentes.</p></div></div>
      </div>
    </div>
  `
},

// ── 16 ─ COMPARATIVO ──────────────────────────────────────
{
  title: "Monofásico × Trifásico",
  short: "Comparativo",
  html: `
    <div class="slide-tag">📊 Comparativo</div>
    <h2 class="slide-title">Monofásico × Trifásico</h2>
    <p class="slide-subtitle">Qual escolher e quando?</p>
    <table class="comp-table" style="margin-top:24px">
      <thead>
        <tr>
          <th>Critério</th>
          <th>Monofásico</th>
          <th>Trifásico</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Fases</td><td>1 fase (+ neutro)</td><td>3 fases defasadas 120°</td></tr>
        <tr><td>Potência</td><td>Menor porte</td><td>Alta potência</td></tr>
        <tr><td>Eficiência</td><td>Adequada para baixa demanda</td><td>Superior para alta demanda</td></tr>
        <tr><td>Custo inicial</td><td>✅ Menor</td><td>❌ Maior</td></tr>
        <tr><td>Manutenção</td><td>✅ Simples e acessível</td><td>❌ Exige especializado</td></tr>
        <tr><td>Tamanho</td><td>Compacto (unitário)</td><td>Compacto p/ mesma alta potência</td></tr>
        <tr><td>Aplicação ideal</td><td>Residências, pequenos comércios, rural</td><td>Indústrias, grandes redes, transmissão</td></tr>
      </tbody>
    </table>
    <div class="two-panels" style="margin-top:20px">
      <div class="panel blue" style="text-align:center">
        <div style="font-size:1.5rem; margin-bottom:6px">🏠🛒🌾</div>
        <h3>Use Monofásico</h3>
        <p>Residências, pequenos negócios, rural</p>
      </div>
      <div class="panel purple" style="text-align:center">
        <div style="font-size:1.5rem; margin-bottom:6px">🏭⚡🔧</div>
        <h3>Use Trifásico</h3>
        <p>Indústrias, motores e alta potência</p>
      </div>
    </div>
  `
},

// ── 17 ─ CAMINHO DA ENERGIA ───────────────────────────────
{
  title: "O Caminho da Energia",
  short: "Caminho da Energia",
  html: `
    <div class="slide-tag">🗺️ Fluxo do Sistema Elétrico</div>
    <h2 class="slide-title">O Caminho da Energia Elétrica</h2>
    <p class="slide-subtitle">Da usina de geração até a sua tomada</p>
    <div class="flow" style="margin-top:24px">
      <div class="flow-item">
        <div class="fi-icon">🏭</div>
        <h4>Usina de Geração</h4>
        <p>Gera energia a ~13,8 kV</p>
      </div>
      <div class="flow-arrow">▼</div>
      <div class="flow-item" style="border-color:rgba(16,185,129,0.4)">
        <div class="fi-icon">⬆️</div>
        <h4>Transformador Elevador</h4>
        <p>Sobe para 138 kV / 230 kV / 500 kV</p>
      </div>
      <div class="flow-arrow">▼</div>
      <div class="flow-item">
        <div class="fi-icon">⚡</div>
        <h4>Linhas de Transmissão</h4>
        <p>Alta tensão percorre centenas de km com pouca perda</p>
      </div>
      <div class="flow-arrow">▼</div>
      <div class="flow-item">
        <div class="fi-icon">🏢</div>
        <h4>Subestação de Distribuição</h4>
        <p>Reduz para ~13,8 kV (média tensão)</p>
      </div>
      <div class="flow-arrow">▼</div>
      <div class="flow-item" style="border-color:rgba(239,68,68,0.4)">
        <div class="fi-icon">⬇️</div>
        <h4>Transformador de Poste</h4>
        <p>Abaixa para 127 V ou 220 V (baixa tensão)</p>
      </div>
      <div class="flow-arrow">▼</div>
      <div class="flow-item">
        <div class="fi-icon">🏠</div>
        <h4>Residências e Comércios</h4>
        <p>Energia pronta para uso seguro</p>
      </div>
      <div class="flow-arrow">▼</div>
      <div class="flow-item">
        <div class="fi-icon">📱</div>
        <h4>Carregadores e Fontes</h4>
        <p>Reduzem ainda mais: 5 V, 12 V, 19 V para os aparelhos</p>
      </div>
    </div>
    <div class="notice" style="margin-top:20px">
      ⚡ <span>Os transformadores estão em <strong>cada etapa</strong> deste caminho.
      Sem eles, seria impossível transmitir energia elétrica de forma eficiente em larga escala.</span>
    </div>
  `
},

// ── 18 ─ PONTOS-CHAVE ─────────────────────────────────────
{
  title: "Pontos-Chave para Fixação",
  short: "Pontos-Chave",
  html: `
    <div class="slide-tag">📌 Revisão</div>
    <h2 class="slide-title">Pontos-Chave para Fixar</h2>
    <p class="slide-subtitle">O essencial que você precisa saber sobre transformadores</p>
    <div style="display:flex; flex-direction:column; gap:10px; margin-top:20px">
      ${[
        ["1️⃣", "Transfere energia entre circuitos sem contato físico — apenas por indução eletromagnética."],
        ["2️⃣", "Funciona <strong>exclusivamente com CA</strong>. CC não produz variação de campo → sem indução."],
        ["3️⃣", "Fórmula central: <code style='font-family:var(--font-mono);color:var(--accent)'>k = N₁/N₂ = V₁/V₂ = I₂/I₁</code>"],
        ["4️⃣", "A potência é conservada: quando a tensão sobe, a corrente cai — e vice-versa."],
        ["5️⃣", "<strong>Monofásico</strong> = uso residencial e simples. <strong>Trifásico</strong> = uso industrial e alta potência."],
        ["6️⃣", "Ligações em <strong>Estrela (Y)</strong> e <strong>Triângulo (Δ)</strong> definem as tensões disponíveis no trifásico."],
        ["7️⃣", "Presentes em todas as etapas do sistema elétrico: geração → transmissão → distribuição → uso final."],
        ["8️⃣", "São altamente eficientes (<strong>95–98%</strong>) e não têm partes móveis."],
        ["9️⃣", "Ligar corrente contínua pode causar <strong>superaquecimento e destruição</strong> do equipamento."],
        ["🔟", "Invisíveis no cotidiano, mas <strong>absolutamente essenciais</strong> para que a civilização moderna funcione."]
      ].map(([num, txt]) => `
        <div class="card" style="padding:12px 18px">
          <div style="display:flex; gap:12px; align-items:flex-start">
            <span style="font-size:1.1rem; flex-shrink:0">${num}</span>
            <p style="font-size:0.9rem; color:var(--text-dim); line-height:1.6">${txt}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `
},

// ── 19 ─ ENCERRAMENTO ─────────────────────────────────────
{
  title: "Conclusão",
  short: "Encerramento",
  html: `
    <div class="slide-tag">🏁 Finalização</div>
    <h2 class="slide-title">Conclusão</h2>
    <p class="slide-subtitle">Transformadores: o coração invisível do mundo elétrico</p>
    <div class="closing-card" style="margin-top:24px">
      <h3>Por que isso tudo importa?</h3>
      <p>
        Os transformadores são dispositivos simples em conceito,
        mas extraordinários em importância.<br><br>
        Sem eles, seria impossível transmitir energia de usinas para cidades distantes,
        alimentar com segurança todos os aparelhos do nosso dia a dia
        ou sustentar a infraestrutura de hospitais, indústrias e residências.
      </p>
    </div>
    <div class="quote-block">
      "A eletricidade é a ferramenta mais poderosa que a humanidade já criou.
      O transformador é o que a torna utilizável."
    </div>
    <div class="section-title">O que aprendemos</div>
    <ul class="bullet-list">
      <li>O princípio da indução eletromagnética de Faraday</li>
      <li>A estrutura interna e os componentes do transformador</li>
      <li>A diferença entre elevadores, abaixadores e de isolamento</li>
      <li>Por que a CC não funciona com transformadores</li>
      <li>Monofásico vs. Trifásico: quando usar cada um</li>
      <li>O caminho completo da energia elétrica até você</li>
    </ul>
    <div class="refs">
      <strong>Referências:</strong> Brasil Escola · Toda Matéria · Canal YouTube: Mentalidade De Engenharia
    </div>
    <div style="text-align:center; margin-top:28px">
      <div style="font-size:3rem; filter:drop-shadow(0 0 16px var(--accent))">⚡</div>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-top:8px">Fim da apresentação</p>
    </div>
  `
}

]; // fim SLIDES


// =============================================================
//  LÓGICA DE NAVEGAÇÃO
// =============================================================

let current = 0;

function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `<div class="sidebar-label">Slides</div>`;
  SLIDES.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'sidebar-item' + (i === 0 ? ' active' : '');
    el.dataset.index = i;
    el.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span>
                    <span class="label">${s.short}</span>`;
    el.addEventListener('click', () => goTo(i));
    sidebar.appendChild(el);
  });
}

function render(animate = true) {
  const view    = document.getElementById('slide-view');
  const counter = document.getElementById('slide-counter');
  const fill    = document.getElementById('progress-fill');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  // Animação de saída
  if (animate && view.innerHTML) {
    view.classList.add('slide-out');
    setTimeout(() => {
      view.classList.remove('slide-out');
      _doRender();
    }, 200);
  } else {
    _doRender();
  }

  function _doRender() {
    const s = SLIDES[current];
    view.innerHTML = s.html;
    counter.textContent = `${current + 1} / ${SLIDES.length}`;
    fill.style.width = `${((current + 1) / SLIDES.length) * 100}%`;
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === SLIDES.length - 1;

    // atualiza sidebar
    document.querySelectorAll('.sidebar-item').forEach((el, i) => {
      el.classList.toggle('active', i === current);
    });

    // scroll do sidebar para o item ativo
    const activeItem = document.querySelector('.sidebar-item.active');
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

    // scroll do main para o topo
    document.getElementById('main').scrollTo({ top: 0, behavior: 'smooth' });

    // atualiza título do documento
    document.title = `${String(current + 1).padStart(2,'0')}. ${s.short} — Transformadores`;
  }
}

function goTo(idx) {
  if (idx < 0 || idx >= SLIDES.length) return;
  current = idx;
  render();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

// Teclado
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev();
  if (e.key === 'Home') goTo(0);
  if (e.key === 'End')  goTo(SLIDES.length - 1);
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  render(false);
  document.getElementById('btn-prev').addEventListener('click', prev);
  document.getElementById('btn-next').addEventListener('click', next);
});

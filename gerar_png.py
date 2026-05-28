import tkinter as tk
from tkinter import font as tkfont
from tkinter import filedialog, messagebox, colorchooser
from PIL import Image, ImageDraw, ImageFont
import os
import sys

# ── dependência ──────────────────────────────────────────────────────────────
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image, ImageDraw, ImageFont


# ── variáveis globais ─────────────────────────────────────────────────────────
fonte_selecionada = {"path": None, "nome": "padrão do sistema"}
cor_texto     = "#FFFFFF"
cor_fundo     = "#1E1E2E"
tamanho_fonte  = 48
var_transparente = None  # tk.BooleanVar, definida após root ser criado


def escolher_fonte():
    """Abre o explorador para selecionar um arquivo .ttf / .otf"""
    caminho = filedialog.askopenfilename(
        title="Escolha uma fonte",
        filetypes=[("Fontes", "*.ttf *.otf"), ("Todos os arquivos", "*.*")],
        initialdir=r"C:\Windows\Fonts"
    )
    if caminho:
        fonte_selecionada["path"] = caminho
        fonte_selecionada["nome"] = os.path.basename(caminho)
        lbl_fonte.config(text=f"✅  {fonte_selecionada['nome']}")


def escolher_cor_texto():
    global cor_texto
    cor = colorchooser.askcolor(title="Cor do texto", color=cor_texto)
    if cor[1]:
        cor_texto = cor[1]
        btn_cor_texto.config(bg=cor_texto, fg=_contraste(cor_texto))


def escolher_cor_fundo():
    global cor_fundo
    cor = colorchooser.askcolor(title="Cor do fundo", color=cor_fundo)
    if cor[1]:
        cor_fundo = cor[1]
        btn_cor_fundo.config(bg=cor_fundo, fg=_contraste(cor_fundo))


def _contraste(hex_cor):
    """Retorna preto ou branco dependendo do brilho da cor de fundo."""
    hex_cor = hex_cor.lstrip("#")
    r, g, b = int(hex_cor[0:2], 16), int(hex_cor[2:4], 16), int(hex_cor[4:6], 16)
    luminancia = (0.299 * r + 0.587 * g + 0.114 * b)
    return "#000000" if luminancia > 128 else "#FFFFFF"


def gerar_png():
    texto = txt_input.get("1.0", tk.END).strip()
    if not texto:
        messagebox.showwarning("Aviso", "Digite algum texto antes de gerar!")
        return

    tam = spin_tamanho.get()
    try:
        tam = int(tam)
    except ValueError:
        tam = 48

    # ── carregar fonte ────────────────────────────────────────────────────────
    if fonte_selecionada["path"]:
        try:
            pil_font = ImageFont.truetype(fonte_selecionada["path"], tam)
        except Exception as e:
            messagebox.showerror("Erro de fonte", str(e))
            return
    else:
        pil_font = ImageFont.load_default()

    # ── calcular tamanho da imagem ────────────────────────────────────────────
    padding = 60
    dummy = Image.new("RGBA", (1, 1))
    draw  = ImageDraw.Draw(dummy)
    # bbox pode ter offset (x0, y0) != (0, 0) dependendo da fonte
    bbox  = draw.multiline_textbbox((0, 0), texto, font=pil_font, spacing=12)
    x0, y0, x1, y1 = bbox
    texto_w = x1 - x0
    texto_h = y1 - y0
    largura  = max(texto_w + padding * 2, 100)
    altura   = max(texto_h + padding * 2, 60)

    # ── fundo: transparente ou cor sólida ─────────────────────────────────────
    transparente = var_transparente.get()
    if transparente:
        fundo_rgba = (0, 0, 0, 0)          # totalmente transparente
    else:
        # converte hex #RRGGBB → (R, G, B, 255)
        h = cor_fundo.lstrip("#")
        fundo_rgba = (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), 255)

    # ── cor do texto como RGBA ────────────────────────────────────────────────
    ht = cor_texto.lstrip("#")
    texto_rgba = (int(ht[0:2], 16), int(ht[2:4], 16), int(ht[4:6], 16), 255)

    # ── desenhar imagem ───────────────────────────────────────────────────────
    img  = Image.new("RGBA", (largura, altura), color=fundo_rgba)
    draw = ImageDraw.Draw(img)
    # subtrai o offset (x0, y0) para garantir que o texto comece no padding correto
    draw.multiline_text(
        (padding - x0, padding - y0),
        texto,
        font=pil_font,
        fill=texto_rgba,
        spacing=12,
        align="left"
    )

    # ── salvar ────────────────────────────────────────────────────────────────
    destino = filedialog.asksaveasfilename(
        title="Salvar PNG como…",
        defaultextension=".png",
        filetypes=[("PNG", "*.png")],
        initialfile="saida.png"
    )
    if destino:
        img.save(destino)
        messagebox.showinfo("Feito!", f"PNG salvo em:\n{destino}")


# ── interface ─────────────────────────────────────────────────────────────────
root = tk.Tk()
root.title("Gerador de PNG com Texto")
root.configure(bg="#1E1E2E")
root.resizable(True, True)

ESTILO_LABEL = dict(bg="#1E1E2E", fg="#CDD6F4", font=("Segoe UI", 10))
ESTILO_BTN   = dict(font=("Segoe UI", 10, "bold"), relief="flat",
                    padx=14, pady=6, cursor="hand2")

# título
tk.Label(root, text="📄 Gerador de PNG com Texto",
         bg="#1E1E2E", fg="#CBA6F7",
         font=("Segoe UI", 16, "bold")).pack(pady=(20, 4))

tk.Label(root, text="Digite o texto, escolha a fonte e gere o PNG.",
         **ESTILO_LABEL).pack(pady=(0, 12))

# área de texto
frame_txt = tk.Frame(root, bg="#313244", bd=0)
frame_txt.pack(padx=30, pady=4, fill="both", expand=True)
txt_input = tk.Text(frame_txt, height=10, font=("Consolas", 12),
                    bg="#313244", fg="#CDD6F4", insertbackground="#CDD6F4",
                    relief="flat", wrap="word", padx=10, pady=10)
txt_input.pack(fill="both", expand=True)

# linha: fonte
frame_fonte = tk.Frame(root, bg="#1E1E2E")
frame_fonte.pack(padx=30, pady=8, fill="x")

tk.Button(frame_fonte, text="🔡  Escolher Fonte (.ttf/.otf)",
          command=escolher_fonte, bg="#89B4FA", fg="#1E1E2E",
          **ESTILO_BTN).pack(side="left")

lbl_fonte = tk.Label(frame_fonte, text="⚠️  Nenhuma fonte selecionada (usará padrão)",
                     **ESTILO_LABEL)
lbl_fonte.pack(side="left", padx=12)

# linha: tamanho
frame_tam = tk.Frame(root, bg="#1E1E2E")
frame_tam.pack(padx=30, pady=4, fill="x")

tk.Label(frame_tam, text="Tamanho da fonte:", **ESTILO_LABEL).pack(side="left")
spin_tamanho = tk.Spinbox(frame_tam, from_=8, to=300, width=5,
                           font=("Segoe UI", 11), bg="#313244", fg="#CDD6F4",
                           buttonbackground="#45475A", relief="flat")
spin_tamanho.delete(0, "end")
spin_tamanho.insert(0, "48")
spin_tamanho.pack(side="left", padx=10)

# linha: cores
frame_cores = tk.Frame(root, bg="#1E1E2E")
frame_cores.pack(padx=30, pady=8, fill="x")

tk.Label(frame_cores, text="Cores:", **ESTILO_LABEL).pack(side="left")

btn_cor_texto = tk.Button(frame_cores, text="Cor do Texto",
                           command=escolher_cor_texto,
                           bg=cor_texto, fg=_contraste(cor_texto),
                           **ESTILO_BTN)
btn_cor_texto.pack(side="left", padx=6)

btn_cor_fundo = tk.Button(frame_cores, text="Cor do Fundo",
                           command=escolher_cor_fundo,
                           bg=cor_fundo, fg=_contraste(cor_fundo),
                           **ESTILO_BTN)
btn_cor_fundo.pack(side="left", padx=6)

# checkbox fundo transparente
var_transparente = tk.BooleanVar(value=True)

def _toggle_transparente():
    if var_transparente.get():
        btn_cor_fundo.config(state="disabled")
    else:
        btn_cor_fundo.config(state="normal")

chk_transp = tk.Checkbutton(
    frame_cores,
    text="Fundo transparente",
    variable=var_transparente,
    command=_toggle_transparente,
    bg="#1E1E2E", fg="#CDD6F4",
    selectcolor="#313244",
    activebackground="#1E1E2E",
    activeforeground="#CDD6F4",
    font=("Segoe UI", 10)
)
chk_transp.pack(side="left", padx=14)
_toggle_transparente()  # aplica estado inicial (desabilita botão de fundo)

# botão gerar
tk.Button(root, text="🖼️   GERAR PNG",
          command=gerar_png,
          bg="#A6E3A1", fg="#1E1E2E",
          font=("Segoe UI", 13, "bold"),
          relief="flat", padx=20, pady=10,
          cursor="hand2").pack(pady=20)

root.mainloop()

import { HELP_CONTENT } from "./helpContent.js";

export function bindHelp() {
  const popover = createPopover();
  document.body.append(popover);

  document.querySelectorAll("[data-help]").forEach((element) => {
    const key = element.dataset.help;
    if (!HELP_CONTENT[key]) return;
    element.classList.add("has-help");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "help-button";
    button.setAttribute("aria-label", `Explicar ${HELP_CONTENT[key].title}`);
    button.textContent = "?";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showHelp(popover, key);
    });
    element.append(button);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideHelp(popover);
  });
}

function createPopover() {
  const popover = document.createElement("aside");
  popover.className = "help-popover";
  popover.hidden = true;
  popover.innerHTML = `
    <button class="help-close" type="button" aria-label="Fechar explicacao">x</button>
    <strong></strong>
    <div class="help-section explanation">
      <span>Explicacao</span>
      <p></p>
    </div>
    <div class="help-section how">
      <span>Como usar</span>
      <p></p>
    </div>
    <div class="help-section when">
      <span>Quando usar</span>
      <p></p>
    </div>
  `;
  popover.querySelector(".help-close").addEventListener("click", () => hideHelp(popover));
  return popover;
}

function showHelp(popover, key) {
  const content = HELP_CONTENT[key];
  popover.querySelector("strong").textContent = content.title;
  popover.querySelector(".explanation p").textContent = content.body;
  popover.querySelector(".how p").textContent = content.how;
  popover.querySelector(".when p").textContent = content.when;
  popover.hidden = false;
}

function hideHelp(popover) {
  popover.hidden = true;
}

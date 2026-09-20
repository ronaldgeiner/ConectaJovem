const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const submenuToggle = document.querySelector(".menu-submenu-toggle");
const dropdown = document.querySelector(".menu-item-dropdown");

function fecharMenu() {
  if (!menuToggle || !menu) return;

  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const aberto = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!aberto));
    menuToggle.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
    menu.classList.toggle("is-open", !aberto);
  });
}

if (submenuToggle && dropdown) {
  submenuToggle.addEventListener("click", () => {
    const aberto = submenuToggle.getAttribute("aria-expanded") === "true";
    submenuToggle.setAttribute("aria-expanded", String(!aberto));
    submenuToggle.setAttribute("aria-label", aberto ? "Abrir submenu Participar" : "Fechar submenu Participar");
    dropdown.classList.toggle("is-open", !aberto);
  });
}

document.addEventListener("click", (event) => {
  if (menu && menuToggle && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
    fecharMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharMenu();

    if (submenuToggle && dropdown) {
      submenuToggle.setAttribute("aria-expanded", "false");
      submenuToggle.setAttribute("aria-label", "Abrir submenu Participar");
      dropdown.classList.remove("is-open");
    }
  }
});

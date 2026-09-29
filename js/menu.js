const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const submenuToggle = document.querySelector(".menu-submenu-toggle");
const dropdown = document.querySelector(".menu-item-dropdown");

function fecharSubmenu() {
  if (!submenuToggle || !dropdown) return;

  dropdown.classList.remove("is-open");
  submenuToggle.setAttribute("aria-expanded", "false");
  submenuToggle.setAttribute("aria-label", "Abrir submenu Participar");
}

function fecharMenu(devolverFoco = false) {
  fecharSubmenu();

  if (!menuToggle || !menu) return;

  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");

  if (devolverFoco) {
    menuToggle.focus();
  }
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const aberto = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!aberto));
    menuToggle.setAttribute(
      "aria-label",
      aberto ? "Abrir menu" : "Fechar menu"
    );

    menu.classList.toggle("is-open", !aberto);
  });
}

if (menu) {
  menu.querySelectorAll("a[href^='#/']").forEach((link) => {
    link.addEventListener("click", fecharMenu);
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

if (dropdown && submenuToggle) {
  dropdown.addEventListener("mouseenter", () => {
    if (window.matchMedia("(max-width: 576px)").matches) return;

    dropdown.classList.add("is-open");
    submenuToggle.setAttribute("aria-expanded", "true");
    submenuToggle.setAttribute("aria-label", "Fechar submenu Participar");
  });

  dropdown.addEventListener("mouseleave", () => {
    if (window.matchMedia("(max-width: 576px)").matches) return;
    if (dropdown.contains(document.activeElement)) return;

    fecharSubmenu();
  });
}

if (dropdown && submenuToggle) {
  dropdown.addEventListener("focusin", (event) => {
  if (window.matchMedia("(max-width: 576px)").matches) return;
  if (event.target === submenuToggle) return;

  dropdown.classList.add("is-open");
  submenuToggle.setAttribute("aria-expanded", "true");
  submenuToggle.setAttribute("aria-label", "Fechar submenu Participar");
});

  dropdown.addEventListener("focusout", (event) => {
    if (window.matchMedia("(max-width: 576px)").matches) return;
    if (dropdown.contains(event.relatedTarget)) return;

    fecharSubmenu();
  });
}

document.addEventListener("click", (event) => {
  if (menu && menuToggle && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
    fecharMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.classList.contains("is-open")) {
    fecharMenu(true);
  }
});

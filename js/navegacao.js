import { carregarTemplate } from "./templates.js";

const rotas = {
  "/inicio": {
    arquivo: "html/inicio.html",
    titulo: "Início | ConectaJovem"
  },
  "/projetos": {
    arquivo: "html/projetos-conteudo.html",
    titulo: "Projetos | ConectaJovem"
  },
  "/inscricao": {
    arquivo: "html/inscricao.html",
    titulo: "Inscrição | ConectaJovem"
  },
  "/voluntariado": {
    arquivo: "html/voluntariado.html",
    titulo: "Voluntariado | ConectaJovem"
  },
  "/apoio": {
    arquivo: "html/apoio.html",
    titulo: "Apoio | ConectaJovem"
  }
};

async function atualizarPagina() {
  const caminho = window.location.hash.slice(1) || "/inicio";
  const rota = rotas[caminho];

  if (!rota) {
    window.location.hash = "#/inicio";
    return;
  }

  try {
    await carregarTemplate(rota.arquivo);

    document.dispatchEvent(new CustomEvent("rota:carregada", {
      detail: { caminho }
    }));

    document.title = rota.titulo;

    document.querySelectorAll(".menu a").forEach((link) => {
      if (link.getAttribute("href") === `#${caminho}`) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    const areaPrincipal = document.querySelector("#conteudo-principal");

    areaPrincipal.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } catch (erro) {
    console.error("Falha ao carregar a página:", erro);
    const areaPrincipal = document.querySelector("#conteudo-principal");
    if (areaPrincipal) {
      areaPrincipal.innerHTML = `
        <section class="sobre container" aria-labelledby="erro-navegacao">
          <h1 id="erro-navegacao">Não foi possível carregar esta página</h1>
          <p>Tente novamente ou retorne ao início da aplicação.</p>
          <a class="botao" href="#/inicio">Voltar ao início</a>
        </section>`;
      areaPrincipal.focus({ preventScroll: true });
    }
  }
}

export function iniciarNavegacao() {
  window.addEventListener("hashchange", atualizarPagina);
  atualizarPagina();
}

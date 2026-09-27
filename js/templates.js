const cacheTemplates = new Map();

export async function carregarTemplate(caminho) {
  if (cacheTemplates.has(caminho)) {
    document.querySelector("#conteudo-principal").innerHTML = cacheTemplates.get(caminho);
    return;
  }

  const resposta = await fetch(caminho);

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar o conteúdo.");
  }

  const conteudo = await resposta.text();
  cacheTemplates.set(caminho, conteudo);
  const areaPrincipal = document.querySelector("#conteudo-principal");

  if (!areaPrincipal) {
    throw new Error("Área principal não encontrada.");
  }

  areaPrincipal.innerHTML = conteudo;
}

const formularioCadastro = document.querySelector("#cadastro-interesse");
const statusCadastro = document.querySelector("#form-status");

if (formularioCadastro && statusCadastro) {
  formularioCadastro.addEventListener("submit", (event) => {
    event.preventDefault();
    statusCadastro.textContent =
      "Os campos foram validados. Este formulário é uma demonstração: os dados não foram enviados nem salvos.";
  });

  formularioCadastro.addEventListener("input", () => {
    statusCadastro.textContent = "";
  });
}

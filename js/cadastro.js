import { prepararMensagem, validarCampo } from "./validacao.js";
import { listarRegistros, salvarRegistro } from "./armazenamento.js";

export function iniciarFormularios() {
  document.querySelectorAll(".formulario-cadastro").forEach((formulario) => {
    if (formulario.dataset.inicializado === "true") return;

    const status = formulario.querySelector(".form-status");
    if (!status) return;
    restaurarDados(formulario);

    const campos = [...formulario.querySelectorAll("input, select, textarea")]
      .filter((campo) => !campo.disabled && campo.type !== "hidden");
    let tentativaEnvio = false;
    const grupos = [...formulario.querySelectorAll("[data-required-group]")];

    function validarGrupo(grupo, exibir = true) {
      const nome = grupo.dataset.requiredGroup;
      const opcoes = [...grupo.querySelectorAll(`input[name="${nome}"]`)];
      const mensagem = grupo.querySelector(`[data-group-error="${nome}"]`);
      const valido = opcoes.some((opcao) => opcao.checked);

      if (exibir) {
        grupo.classList.toggle("grupo-invalido", !valido);
        if (mensagem) mensagem.textContent = valido ? "" : "Selecione pelo menos uma opção.";
        opcoes.forEach((opcao) => opcao.setAttribute("aria-invalid", String(!valido)));
      }

      return valido;
    }
    function restaurarDados(formulario) {
      const registros = listarRegistros()
        .filter((registro) => registro.tipoFormulario === formulario.id);

      const ultimoRegistro = registros.at(-1);

      if (!ultimoRegistro) return;

      const campos = formulario.querySelectorAll(
        "input, select, textarea"
      );

      campos.forEach((campo) => {
        const valor = ultimoRegistro[campo.name];

        if (valor === undefined) return;

        if (campo.type === "checkbox") {
          campo.checked = Array.isArray(valor)
            ? valor.includes(campo.value)
            : valor === campo.value;
          return;
        }

        campo.value = valor;
      });
    }

    function limparStatus() {
      status.textContent = "";
      status.classList.remove("form-status--erro", "form-status--sucesso");
    }

    campos.forEach((campo) => {
      prepararMensagem(campo);

      if (campo.name === "cpf") {
        campo.addEventListener("input", () => {
          const numeros = campo.value.replace(/\D/g, "").slice(0, 11);
          campo.value = numeros.replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        });
      }

      if (campo.name === "cep") {
        campo.addEventListener("input", () => {
          const numeros = campo.value.replace(/\D/g, "").slice(0, 8);
          campo.value = numeros.replace(/(\d{5})(\d)/, "$1-$2");
        });
      }

      campo.addEventListener("blur", () => {
        validarCampo(campo);
      });

      const atualizar = () => {
        validarCampo(campo, tentativaEnvio || campo.hasAttribute("aria-invalid"));
        limparStatus();
      };

      campo.addEventListener("input", atualizar);
      campo.addEventListener("change", atualizar);
    });

    grupos.forEach((grupo) => {
      grupo.querySelectorAll("input[type=checkbox]").forEach((opcao) => {
        opcao.addEventListener("change", () => {
          validarGrupo(grupo, tentativaEnvio);
          limparStatus();
        });
      });
    });
    function coletarDados(formulario) {
      const dados = {};
      const formularioDados = new FormData(formulario);

      for (const [nome, valor] of formularioDados.entries()) {
        if (dados[nome]) {
          dados[nome] = Array.isArray(dados[nome])
            ? [...dados[nome], valor]
            : [dados[nome], valor];
        } else {
          dados[nome] = valor;
        }
      }

      return dados;
    }

    formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      tentativaEnvio = true;
      limparStatus();

      const invalidos = campos.filter((campo) => !validarCampo(campo));
      const gruposInvalidos = grupos.filter((grupo) => !validarGrupo(grupo));

      if (invalidos.length || gruposInvalidos.length) {
        status.classList.add("form-status--erro");
        status.textContent = "Revise os campos indicados antes de continuar.";
        (invalidos[0] || gruposInvalidos[0]?.querySelector("input")).focus();
        return;
      }

      const dados = coletarDados(formulario);
      dados.tipoFormulario = formulario.id;
      try {
        salvarRegistro(dados);
      } catch (erro) {
        status.classList.add("form-status--erro");
        status.textContent = erro.message;
        return;
      }

      status.classList.add("form-status--sucesso");
      status.textContent =
        "Dados validados e armazenados localmente com sucesso.";
    });

    formulario.noValidate = true;
    formulario.dataset.inicializado = "true";
  });
}

document.addEventListener("rota:carregada", iniciarFormularios);

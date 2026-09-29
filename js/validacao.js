const orientacaoIdade = "A inscrição é destinada a jovens de 14 a 24 anos.";
const mensagens = new WeakMap();

function erroIdade(valor, hoje = new Date()) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
  if (!partes) return "Informe uma data de nascimento válida.";

  const [, anoTexto, mesTexto, diaTexto] = partes;
  const ano = Number(anoTexto);
  const mes = Number(mesTexto);
  const dia = Number(diaTexto);
  const data = new Date(ano, mes - 1, dia);

  if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
    return "Informe uma data de nascimento válida.";
  }

  let idade = hoje.getFullYear() - ano;
  if (hoje.getMonth() + 1 < mes ||
      (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)) {
    idade--;
  }

  return idade < 14 || idade > 24
    ? "Idade fora da faixa permitida. A inscrição exige entre 14 e 24 anos."
    : "";
}

function cpfValido(valor) {
  const numeros = valor.replace(/\D/g, "");
  if (numeros.length !== 11 || /^(\d)\1+$/.test(numeros)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += Number(numeros[i]) * (10 - i);
  let digito = (soma * 10) % 11;
  if (digito === 10) digito = 0;
  if (digito !== Number(numeros[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += Number(numeros[i]) * (11 - i);
  digito = (soma * 10) % 11;
  if (digito === 10) digito = 0;
  return digito === Number(numeros[10]);
}

export function obterErroCampo(campo) {
  const valor = campo.value.trim();

  if (campo.type === "date" && campo.validity.badInput) {
    return "Informe uma data de nascimento válida.";
  }

  if (!valor) {
    if (!campo.required) return "";
    return campo.name === "nascimento"
      ? "Preencha a data de nascimento."
      : campo.tagName === "SELECT"
        ? "Selecione uma opção."
        : "Preencha este campo obrigatório.";
  }

  if (campo.minLength > 0 && valor.length < campo.minLength) {
    return `Informe pelo menos ${campo.minLength} caracteres.`;
  }

  if (campo.maxLength >= 0 && campo.value.length > campo.maxLength) {
    return `Utilize no máximo ${campo.maxLength} caracteres.`;
  }

  if (campo.type === "email" && !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(valor)) {
    return "Informe um e-mail no formato nome@dominio.com.";
  }

  if (campo.name === "cpf" && !cpfValido(valor)) {
    return "Informe um CPF válido com 11 dígitos.";
  }

  if (campo.name === "cep" && !/^\d{5}-?\d{3}$/.test(valor)) {
    return "Informe um CEP válido com oito dígitos.";
  }

  if (campo.type === "tel") {
    let numeros = valor.replace(/\D/g, "");
    if (numeros.length > 11 && numeros.startsWith("55")) numeros = numeros.slice(2);

    if (!/^\+?[\d\s().-]+$/.test(valor) ||
        !/^[1-9]\d{9,10}$/.test(numeros) ||
        /^(\d)\1+$/.test(numeros)) {
      return "Informe um telefone com DDD e 10 ou 11 dígitos. O prefixo +55 é opcional.";
    }
  }

  if (campo.name === "nascimento") return erroIdade(valor);
  return "";
}

export function prepararMensagem(campo) {
  if (mensagens.has(campo)) return;

  let mensagem = document.getElementById(`${campo.id}-dica`) ||
    document.getElementById(`${campo.id}-erro`);

  if (!mensagem) {
    mensagem = document.createElement("small");
    mensagem.id = `${campo.id}-erro`;
    campo.insertAdjacentElement("afterend", mensagem);
  }

  const orientacao = mensagem.textContent.trim() ||
    (campo.name === "nascimento" ? orientacaoIdade : "");
  mensagem.textContent = orientacao;
  mensagem.classList.add("campo-dica");
  mensagem.setAttribute("aria-live", "polite");
  mensagem.setAttribute("aria-atomic", "true");

  const descricoes = new Set((campo.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
  descricoes.add(mensagem.id);
  campo.setAttribute("aria-describedby", [...descricoes].join(" "));
  mensagens.set(campo, { mensagem, orientacao });
}

export function limparValidacaoCampo(campo) {
  campo.setCustomValidity("");
  campo.classList.remove("campo-interagido");
  campo.removeAttribute("aria-invalid");
  const dados = mensagens.get(campo);
  if (!dados) return;
  dados.mensagem.textContent = dados.orientacao;
  dados.mensagem.classList.remove("campo-erro");
  dados.mensagem.classList.add("campo-dica");
}

export function validarCampo(campo, exibir = true) {
  const erro = obterErroCampo(campo);
  campo.setCustomValidity(erro);

  if (exibir) {
    prepararMensagem(campo);
    const { mensagem, orientacao } = mensagens.get(campo);
    campo.classList.toggle("campo-interagido", Boolean(erro || campo.value.trim()));
    campo.setAttribute("aria-invalid", String(Boolean(erro)));
    mensagem.classList.toggle("campo-erro", Boolean(erro));
    mensagem.classList.toggle("campo-dica", !erro);
    const texto = erro || orientacao;
    if (mensagem.textContent !== texto) mensagem.textContent = texto;
  }

  return !erro;
}

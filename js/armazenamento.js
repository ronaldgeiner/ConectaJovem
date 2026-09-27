const CHAVE_ARMAZENAMENTO = "conectaJovemRegistros";

export function listarRegistros() {
  const dados = localStorage.getItem(CHAVE_ARMAZENAMENTO);

  if (!dados) {
    return [];
  }

  try {
    const registros = JSON.parse(dados);
    return Array.isArray(registros) ? registros : [];
  } catch (erro) {
    console.error("Erro ao ler os registros locais:", erro);
    return [];
  }
}

export function salvarRegistro(dadosFormulario) {
  const registros = listarRegistros();

  const registro = {
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
    ...dadosFormulario
  };

  registros.push(registro);

  try {
    localStorage.setItem(
      CHAVE_ARMAZENAMENTO,
      JSON.stringify(registros)
    );
  } catch (erro) {
    console.error("Não foi possível salvar os dados locais:", erro);
    throw new Error("Não foi possível salvar os dados neste navegador.");
  }

  return registro;
}

export function removerTodosRegistros() {
  localStorage.removeItem(CHAVE_ARMAZENAMENTO);
}


const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function cadastrarUsuario({ nome, email, senha }) {
  let resposta;

  try {
    resposta = await fetch(`${API_URL}/cadastro.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });
  } catch {
    throw new Error(
      "Não foi possível conectar à API. Verifique se o servidor PHP está iniciado.",
    );
  }

  let dados;
  try {
    dados = await resposta.json();
  } catch {
    throw new Error("A API respondeu em um formato inválido.");
  }

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Não foi possível realizar o cadastro.");
  }

  return dados;
}

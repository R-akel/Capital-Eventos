
import { useState } from "react";

function Cadastro({ onCadastrar, onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  function validar() {
    const novosErros = {};

    if (nome.trim().length < 3) {
      novosErros.nome = "Digite um nome com pelo menos 3 caracteres.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      novosErros.email = "Informe um e-mail válido.";
    }

    if (senha.length < 6) {
      novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
    }

    return novosErros;
  }

  function enviar(e) {
    e.preventDefault();

    const encontrados = validar();

    setErros(encontrados);
    setSucesso(false);

    if (Object.keys(encontrados).length === 0) {
      setSucesso(true);

      onCadastrar(nome.trim().split(" ")[0]);
    }
  }

  return (
    <main className="pagina auth">
      <form onSubmit={enviar} noValidate>
        <p className="selo">FAÇA PARTE</p>

        <h1>Crie sua conta</h1>

        <p>
          Salve eventos e monte sua programação em poucos cliques.
        </p>

        <label htmlFor="nome">
          Nome
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={erros.nome ? "erro-nome" : undefined}
          />
        </label>

        {erros.nome && (
          <p id="erro-nome" role="alert" className="erro">
            {erros.nome}
          </p>
        )}

        <label htmlFor="email">
          E-mail
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            aria-invalid={Boolean(erros.email)}
            aria-describedby={erros.email ? "erro-email" : undefined}
          />
        </label>

        {erros.email && (
          <p id="erro-email" role="alert" className="erro">
            {erros.email}
          </p>
        )}

        <label htmlFor="senha">
          Senha
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            aria-invalid={Boolean(erros.senha)}
            aria-describedby={erros.senha ? "erro-senha" : undefined}
          />
        </label>

        {erros.senha && (
          <p id="erro-senha" role="alert" className="erro">
            {erros.senha}
          </p>
        )}

        <button className="detalhes" type="submit">
          Criar conta
        </button>

        {sucesso && (
          <p className="sucesso" role="status">
            Dados válidos! Cadastro simulado com sucesso.
          </p>
        )}

        <p className="alternativa">
          Já tem uma conta?{" "}
          <button type="button" onClick={onLogin}>
            Entrar
          </button>
        </p>
      </form>
    </main>
  );
}

export default Cadastro;

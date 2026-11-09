
import { useState } from "react";

function Cadastro({ onCadastrar, onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  function validar() {
    const e = {};

    if (nome.trim().length < 3) {
      e.nome = "Nome: mínimo 3 caracteres.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Informe um e-mail válido.";
    }

    if (senha.length < 6) {
      e.senha = "Senha: mínimo 6 caracteres.";
    }

    return e;
  }

  function enviar(evento) {
    evento.preventDefault();

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
        <p>Salve eventos e monte sua programação em poucos cliques.</p>

        <label htmlFor="cad-nome">Nome</label>
        <input
          id="cad-nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          aria-invalid={Boolean(erros.nome)}
          aria-describedby={erros.nome ? "cad-erro-nome" : undefined}
        />
        {erros.nome && (
          <p id="cad-erro-nome" className="erro" role="alert">
            {erros.nome}
          </p>
        )}

        <label htmlFor="cad-email">E-mail</label>
        <input
          id="cad-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          aria-invalid={Boolean(erros.email)}
          aria-describedby={erros.email ? "cad-erro-email" : undefined}
        />
        {erros.email && (
          <p id="cad-erro-email" className="erro" role="alert">
            {erros.email}
          </p>
        )}

        <label htmlFor="cad-senha">Senha</label>
        <input
          id="cad-senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          aria-invalid={Boolean(erros.senha)}
          aria-describedby={erros.senha ? "cad-erro-senha" : undefined}
        />
        {erros.senha && (
          <p id="cad-erro-senha" className="erro" role="alert">
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
          <button type="button" onClick={onLogin}>Entrar</button>
        </p>
      </form>
    </main>
  );
}

export default Cadastro;

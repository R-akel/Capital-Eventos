
import { useState } from "react";

function Login({ onEntrar, onCadastro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  function validar() {
    const e = {};

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

      // Temporário: o PHP fará a autenticação real.
      onEntrar(email.trim().split("@")[0]);
    }
  }

  return (
    <main className="pagina auth">
      <form onSubmit={enviar} noValidate>
        <p className="selo">BEM-VINDO DE VOLTA</p>
        <h1>Entrar</h1>
        <p>Acesse sua conta para acompanhar seus favoritos.</p>

        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          aria-invalid={Boolean(erros.email)}
          aria-describedby={erros.email ? "login-erro-email" : undefined}
        />
        {erros.email && (
          <p id="login-erro-email" className="erro" role="alert">
            {erros.email}
          </p>
        )}

        <label htmlFor="login-senha">Senha</label>
        <input
          id="login-senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
          aria-invalid={Boolean(erros.senha)}
          aria-describedby={erros.senha ? "login-erro-senha" : undefined}
        />
        {erros.senha && (
          <p id="login-erro-senha" className="erro" role="alert">
            {erros.senha}
          </p>
        )}

        <button className="detalhes" type="submit">
          Entrar
        </button>

        {sucesso && (
          <p className="sucesso" role="status">
            Dados válidos! Entrada simulada com sucesso.
          </p>
        )}

        <p className="alternativa">
          Ainda não tem uma conta?{" "}
          <button type="button" onClick={onCadastro}>Criar conta</button>
        </p>
      </form>
    </main>
  );
}

export default Login;

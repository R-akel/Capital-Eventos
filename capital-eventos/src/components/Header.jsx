function Header({ usuario, favoritos, onNavegar }) {
  return (
    <header className="header">
      <button className="logo" onClick={() => onNavegar("inicio")} aria-label="Ir para o início">
        <span>🎉</span>
        <h2>Capital Eventos</h2>
      </button>

      <nav aria-label="Navegação principal">
        <button onClick={() => onNavegar("inicio")}>Eventos</button>
        <button onClick={() => onNavegar("favoritos")}>
          Favoritos
          {favoritos > 0 && <b>{favoritos}</b>}
        </button>
      </nav>

      {usuario && (
        <button className="novo-evento-link" onClick={() => onNavegar("novo-evento")}>
          + Adicionar evento
        </button>
      )}
      <button className="entrar" onClick={() => onNavegar(usuario ? "conta" : "login")}>
        {usuario ? `Olá, ${usuario.nome}` : "Entrar"}
      </button>
    </header>
  );
}

export default Header;

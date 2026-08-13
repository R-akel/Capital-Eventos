function Header() {
  return (
    <header className="header">

      <div className="logo">
        <span>🎉</span>
        <h2>Capital Eventos</h2>
      </div>

      <nav>
        <a href="#eventos">Eventos</a>
        <a href="#categorias">Categorias</a>
        <a href="#sobre">Sobre</a>
      </nav>

      <button className="entrar">
        Entrar
      </button>

    </header>
  );
}

export default Header;
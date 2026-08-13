function Card({ nome, categoria, data, local, cor }) {

  function mostrarDetalhes() {
    alert("Evento: " + nome);
  }

  return (
    <div className="card">

      <div className={"imagem " + cor}>

        <span className="categoria">
          {categoria}
        </span>

        <button className="favorito">
          ♡
        </button>

      </div>

      <div className="card-conteudo">

        <h2>{nome}</h2>

        <p>📅 {data}</p>

        <p>📍 {local}</p>

        <button
          className="detalhes"
          onClick={mostrarDetalhes}
        >
          Ver detalhes
        </button>

      </div>

    </div>
  );
}

export default Card;
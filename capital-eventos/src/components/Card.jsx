import "../styles/event-images.css";

function Card({
  nome,
  categoria,
  data,
  local,
  cor,
  imagem,
  creditoImagem,
  licencaImagem,
  fonteImagem,
  organizador,
  favorito,
  onDetalhes,
  onFavoritar,
  onExcluir,
}) {
  return (
    <article className="card">
      <div className={`imagem ${cor}`}>
        {imagem && (
          <img
            src={imagem}
            alt={`Foto ilustrativa de ${nome}`}
            loading="lazy"
            decoding="async"
          />
        )}
        {fonteImagem && (
          <a
            className="credito-foto"
            href={fonteImagem}
            target="_blank"
            rel="noreferrer"
          >
            Foto: {creditoImagem} · {licencaImagem}
          </a>
        )}
        <span className="categoria">{categoria}</span>
        <button
          className="favorito"
          onClick={onFavoritar}
          aria-label={favorito ? `Remover ${nome} dos favoritos` : `Favoritar ${nome}`}
          aria-pressed={favorito}
        >
          {favorito ? "♥" : "♡"}
        </button>
      </div>

      <div className="card-conteudo">
        <h2>{nome}</h2>
        <p>📅 {data}</p>
        <p>📍 {local}</p>
        {organizador && <p className="organizador-evento">Por {organizador}</p>}
        <div className="card-acoes">
          <button className="detalhes" onClick={onDetalhes}>
            Ver detalhes
          </button>
          {onExcluir && (
            <button
              className="excluir-evento"
              onClick={onExcluir}
              aria-label={`Excluir ${nome}`}
            >
              Excluir
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default Card;

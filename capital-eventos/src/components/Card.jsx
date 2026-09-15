function Card({ nome, categoria, data, local, cor, favorito, onDetalhes, onFavoritar }) {
  return <article className="card"><div className={`imagem ${cor}`}><span className="categoria">{categoria}</span><button className="favorito" onClick={onFavoritar} aria-label={favorito ? `Remover ${nome} dos favoritos` : `Favoritar ${nome}`} aria-pressed={favorito}>{favorito ? "♥" : "♡"}</button></div><div className="card-conteudo"><h2>{nome}</h2><p>📅 {data}</p><p>📍 {local}</p><button className="detalhes" onClick={onDetalhes}>Ver detalhes</button></div></article>;
}
export default Card;

function DetalhesEvento({ evento, favorito, onFavoritar, onVoltar }) {
  if (!evento) return null;

  return (
    <main className="pagina">
      <button className="voltar" onClick={onVoltar}>
        ← Voltar aos eventos
      </button>

      <section className="evento-detalhe">
        <div className={`capa-detalhe ${evento.cor}`}>
          {evento.imagem && (
            <img src={evento.imagem} alt={`Foto ilustrativa de ${evento.nome}`} />
          )}
          <span className="categoria-detalhe">{evento.categoria}</span>
          {evento.fonteImagem && (
            <a
              className="credito-foto credito-foto-detalhe"
              href={evento.fonteImagem}
              target="_blank"
              rel="noreferrer"
            >
              Foto: {evento.creditoImagem} · {evento.licencaImagem}
            </a>
          )}
        </div>

        <div>
          <p className="selo">EVENTO EM DESTAQUE</p>
          <h1>{evento.nome}</h1>
          <p className="descricao">{evento.descricao}</p>

          <div className="informacoes">
            <p>📅 <strong>Quando:</strong> {evento.data}</p>
            <p>📍 <strong>Onde:</strong> {evento.local}</p>
            {evento.organizador && (
              <p>👤 <strong>Organizado por:</strong> {evento.organizador}</p>
            )}
          </div>

          <button className="detalhes acao-principal" onClick={() => onFavoritar(evento.id)}>
            {favorito ? "♥ Remover dos favoritos" : "♡ Salvar nos favoritos"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default DetalhesEvento;

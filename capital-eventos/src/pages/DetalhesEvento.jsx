function DetalhesEvento({ evento, favorito, onFavoritar, onVoltar }) {
  if (!evento) return null;

  return (
    <main className="pagina">
      <button className="voltar" onClick={onVoltar}>
        ← Voltar aos eventos
      </button>

      <section className="evento-detalhe">
        <div className={`capa-detalhe ${evento.cor}`}>
          <span>{evento.categoria}</span>
        </div>

        <div>
          <p className="selo">EVENTO EM DESTAQUE</p>
          <h1>{evento.nome}</h1>
          <p className="descricao">{evento.descricao}</p>

          <div className="informacoes">
            <p>📅 <strong>Quando:</strong> {evento.data}</p>
            <p>📍 <strong>Onde:</strong> {evento.local}</p>
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

function MinhaConta({ usuario, favoritos, onSair }) {
  return (
    <main className="pagina">
      <section className="conta">
        <p className="selo">MINHA CONTA</p>
        <div className="avatar">{usuario?.nome?.[0] || "U"}</div>
        <h1>Olá, {usuario?.nome || "visitante"}!</h1>
        <p>
          Você tem <strong>{favoritos}</strong> evento{favoritos === 1 ? "" : "s"} salvo{favoritos === 1 ? "" : "s"}.
        </p>
        <button className="remover" onClick={onSair}>Sair da conta</button>
      </section>
    </main>
  );
}

export default MinhaConta;

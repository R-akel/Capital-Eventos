import { useState } from "react";
import Card from "../components/Card";

function Home({ eventos, favoritos, onAbrir, onFavoritar }) {
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const categorias = ["Todos", "Cultural", "Esportivo", "Social", "Gastronômico"];

  const filtrados = eventos.filter(
    (evento) =>
      (categoria === "Todos" || evento.categoria === categoria) &&
      evento.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <main>
      <section className="introducao">
        <p className="selo">AGENDA DE PALMAS</p>
        <h1>Encontre os melhores eventos em Palmas</h1>
        <p>Cultura, esporte e diversão em um só lugar.</p>
        <input
          type="search"
          placeholder="Pesquisar evento..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="busca"
          aria-label="Pesquisar evento"
        />
      </section>

      <section className="filtros" aria-label="Categorias">
        {categorias.map((item) => (
          <button
            key={item}
            onClick={() => setCategoria(item)}
            className={categoria === item ? "filtro selecionado" : "filtro"}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="lista">
        {filtrados.map((evento) => (
          <Card
            key={evento.id}
            {...evento}
            favorito={favoritos.includes(evento.id)}
            onDetalhes={() => onAbrir(evento)}
            onFavoritar={() => onFavoritar(evento.id)}
          />
        ))}
      </section>

      {!filtrados.length && (
        <p className="nenhum">
          Nenhum evento encontrado. Tente outro termo ou categoria.
        </p>
      )}

      <section className="sobre">
        <h2>Capital Eventos</h2>
        <p>Encontre os principais eventos de Palmas em um só lugar.</p>
      </section>

      <footer>Capital Eventos © 2026</footer>
    </main>
  );
}

export default Home;

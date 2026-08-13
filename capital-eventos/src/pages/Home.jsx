import { useState } from "react";
import Card from "../components/Card";

function Home() {

  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");

  const eventos = [
    {
      nome: "Festival de Música ao Ar Livre",
      categoria: "Cultural",
      data: "15 Mai • 18h",
      local: "Parque Cesamar",
      cor: "laranja"
    },

    {
      nome: "Corrida Noturna Capital Run",
      categoria: "Esportivo",
      data: "20 Mai • 19h",
      local: "Orla de Palmas",
      cor: "rosa"
    },

    {
      nome: "Feira Gastronômica de Palmas",
      categoria: "Gastronômico",
      data: "22 Mai • 17h",
      local: "Praça dos Girassóis",
      cor: "vermelho"
    },

    {
      nome: "Teatro: A Comédia dos Erros",
      categoria: "Cultural",
      data: "25 Mai • 20h",
      local: "Teatro Fernanda Montenegro",
      cor: "laranja"
    },

    {
      nome: "Encontro de Startups do Tocantins",
      categoria: "Social",
      data: "28 Mai • 14h",
      local: "Hub de Inovação",
      cor: "roxo"
    },

    {
      nome: "Show Sertanejo na Praça",
      categoria: "Cultural",
      data: "30 Mai • 19h",
      local: "Praça da Paz",
      cor: "rosa"
    }
  ];

  const categorias = [
    "Todos",
    "Cultural",
    "Esportivo",
    "Social",
    "Gastronômico"
  ];

  const eventosFiltrados = eventos.filter((evento) => {

    const categoriaCorreta =
      categoria === "Todos" ||
      evento.categoria === categoria;

    const nomeCorreto =
      evento.nome
        .toLowerCase()
        .includes(busca.toLowerCase());

    return categoriaCorreta && nomeCorreto;
  });

  return (

    <main>

      <section className="introducao">

        <h1>
          Encontre os melhores eventos em Palmas
        </h1>

        <p>
          Cultura, esporte e diversão em um só lugar.
        </p>

        <input
          type="text"
          placeholder="Pesquisar evento..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="busca"
        />

      </section>


      <section
        id="categorias"
        className="filtros"
      >

        {categorias.map((item) => (

          <button
            key={item}
            onClick={() => setCategoria(item)}
            className={
              categoria === item
                ? "filtro selecionado"
                : "filtro"
            }
          >
            {item}
          </button>

        ))}

      </section>


      <section
        id="eventos"
        className="lista"
      >

        {eventosFiltrados.map((evento) => (

          <Card
            key={evento.nome}
            nome={evento.nome}
            categoria={evento.categoria}
            data={evento.data}
            local={evento.local}
            cor={evento.cor}
          />

        ))}

      </section>


      {eventosFiltrados.length === 0 && (

        <p className="nenhum">
          Nenhum evento encontrado.
        </p>

      )}


      <section
        id="sobre"
        className="sobre"
      >

        <h2>Capital Eventos</h2>

        <p>
          Encontre os principais eventos
          de Palmas em um só lugar.
        </p>

      </section>


      <footer>
        Capital Eventos © 2026
      </footer>

    </main>
  );
}

export default Home;
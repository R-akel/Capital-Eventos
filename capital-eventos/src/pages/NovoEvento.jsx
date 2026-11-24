import { useState } from "react";
import "../styles/new-event.css";

const categorias = ["Cultural", "Esportivo", "Social", "Gastronômico"];

function NovoEvento({ usuario, onPublicar, onCancelar }) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");

  function enviar(evento) {
    evento.preventDefault();

    const dataFormatada = new Date(`${data}T12:00:00`).toLocaleDateString(
      "pt-BR",
      { day: "2-digit", month: "short" },
    );

    onPublicar({
      nome: nome.trim(),
      categoria,
      data: `${dataFormatada} • ${hora}`,
      local: local.trim(),
      descricao: descricao.trim(),
      organizador: usuario.nome,
      organizadorEmail: usuario.email,
      cor: "laranja",
    });
  }

  return (
    <main className="pagina">
      <section className="titulo-pagina">
        <p className="selo">COMPARTILHE COM A COMUNIDADE</p>
        <h1>Adicionar evento</h1>
        <p>O evento será publicado em nome de {usuario.nome}.</p>
      </section>

      <form className="form-evento" onSubmit={enviar}>
        <label htmlFor="evento-nome">Nome do evento</label>
        <input
          id="evento-nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          maxLength={120}
          required
        />

        <label htmlFor="evento-categoria">Categoria</label>
        <select
          id="evento-categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <div className="campos-data">
          <div>
            <label htmlFor="evento-data">Data</label>
            <input
              id="evento-data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="evento-hora">Horário</label>
            <input
              id="evento-hora"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>
        </div>

        <label htmlFor="evento-local">Local</label>
        <input
          id="evento-local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          maxLength={160}
          required
        />

        <label htmlFor="evento-descricao">Descrição</label>
        <textarea
          id="evento-descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          maxLength={600}
          rows={4}
          required
        />

        <div className="botoes-evento">
          <button className="detalhes" type="submit">Publicar evento</button>
          <button className="remover" type="button" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default NovoEvento;

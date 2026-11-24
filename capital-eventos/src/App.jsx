import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DetalhesEvento from "./pages/DetalhesEvento";
import Favoritos from "./pages/Favoritos";
import MinhaConta from "./pages/MinhaConta";
import NovoEvento from "./pages/NovoEvento";

const imagemPublica = (arquivo) => `${import.meta.env.BASE_URL}images/${arquivo}`;

const eventos = [
  { id: 1, nome: "Festival de Música ao Ar Livre", categoria: "Cultural", data: "15 Mai • 18h", local: "Parque Cesamar", cor: "laranja", descricao: "Uma noite para celebrar a música, a cultura e os encontros ao ar livre.", imagem: imagemPublica("festival-musica.jpg"), creditoImagem: "Shixart1985", licencaImagem: "CC BY 2.0", fonteImagem: "https://commons.wikimedia.org/wiki/File:Live_band_performance_at_an_outdoor_concert_with_lights_and_energetic_crowd_during_nighttime.jpg" },
  { id: 2, nome: "Corrida Noturna Capital Run", categoria: "Esportivo", data: "20 Mai • 19h", local: "Orla de Palmas", cor: "rosa", descricao: "Percursos para todos os ritmos, com muita energia na orla de Palmas.", imagem: imagemPublica("corrida.jpg"), creditoImagem: "U.S. Air Force / Samantha White", licencaImagem: "Domínio público", fonteImagem: "https://commons.wikimedia.org/wiki/File:Team_Yokota_welcomes_runners_for_45th_Annual_Frostbite_Road_Race_(9485738).jpg" },
  { id: 3, nome: "Feira Gastronômica de Palmas", categoria: "Gastronômico", data: "22 Mai • 17h", local: "Praça dos Girassóis", cor: "vermelho", descricao: "Sabores locais, chefs convidados e opções para toda a família.", imagem: imagemPublica("feira-gastronomica.jpg"), creditoImagem: "Jeremy Keith", licencaImagem: "CC BY 2.0", fonteImagem: "https://commons.wikimedia.org/wiki/File:Brighton_food_and_drink_festival_(1346630717).jpg" },
  { id: 4, nome: "Teatro: A Comédia dos Erros", categoria: "Cultural", data: "25 Mai • 20h", local: "Teatro Fernanda Montenegro", cor: "laranja", descricao: "Uma montagem leve e divertida de um clássico do teatro.", imagem: imagemPublica("teatro.jpg"), creditoImagem: "EgorovaSvetlana", licencaImagem: "CC BY-SA 4.0", fonteImagem: "https://commons.wikimedia.org/wiki/File:Play_%22Grannies%22_Svetlana_Zemlyakova_Stage_Director_Theater_Praktika_Moscow_Russia.jpg" },
  { id: 5, nome: "Encontro de Startups do Tocantins", categoria: "Social", data: "28 Mai • 14h", local: "Hub de Inovação", cor: "roxo", descricao: "Ideias, conexões e conversas para quem constrói o futuro.", imagem: imagemPublica("startups.jpg"), creditoImagem: "Julia de Boer / The Next Web", licencaImagem: "CC BY-SA 2.0", fonteImagem: "https://commons.wikimedia.org/wiki/File:Startup_pitches_-_TNW_Conference_2010_-_Day_2_(4562983720).jpg" },
  { id: 6, nome: "Show Sertanejo na Praça", categoria: "Cultural", data: "30 Mai • 19h", local: "Praça da Paz", cor: "rosa", descricao: "Grandes sucessos sertanejos em uma noite especial na praça.", imagem: imagemPublica("show-sertanejo.jpg"), creditoImagem: "Jamie", licencaImagem: "CC BY 2.0", fonteImagem: "https://commons.wikimedia.org/wiki/File:John_Schneider_Mirande_Country_Music_Festival_Midi-Pyrenees_FRANCE_July_2008.jpg" },
];

const chaveEventosCriados = "capital-eventos-criados";

function carregarEventosCriados() {
  try {
    const salvos = localStorage.getItem(chaveEventosCriados);
    const eventosSalvos = salvos ? JSON.parse(salvos) : [];

    if (!Array.isArray(eventosSalvos)) {
      throw new TypeError("O formato dos eventos salvos é inválido.");
    }

    return { eventos: eventosSalvos, erro: "" };
  } catch {
    return {
      eventos: [],
      erro: "Não foi possível carregar os eventos salvos neste navegador.",
    };
  }
}

function App() {
  const [pagina, setPagina] = useState("inicio"); const [eventoSelecionado, setEventoSelecionado] = useState(null); const [favoritos, setFavoritos] = useState([]); const [usuario, setUsuario] = useState(null);
  const [estadoEventosCriados, setEstadoEventosCriados] = useState(carregarEventosCriados);
  const todosEventos = [...eventos, ...estadoEventosCriados.eventos];
  const navegar = (destino) => { setPagina(destino); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const abrirEvento = (evento) => { setEventoSelecionado(evento); navegar("detalhes"); };
  const alternarFavorito = (id) => setFavoritos((atuais) => atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id]);
  const entrar = (usuarioAutenticado) => { setUsuario(usuarioAutenticado); navegar("inicio"); };
  const publicarEvento = (novoEvento) => {
    if (estadoEventosCriados.erro) {
      return;
    }

    const eventosAtualizados = [...estadoEventosCriados.eventos, { ...novoEvento, id: Date.now() }];

    try {
      localStorage.setItem(chaveEventosCriados, JSON.stringify(eventosAtualizados));
    } catch {
      setEstadoEventosCriados((atual) => ({
        ...atual,
        erro: "Não foi possível salvar o evento neste navegador.",
      }));
      return;
    }

    setEstadoEventosCriados({ eventos: eventosAtualizados, erro: "" });
    navegar("inicio");
  };
  const excluirEvento = (evento) => {
    const nomeUsuario = usuario?.email?.split("@")[0].toLowerCase();
    const pertenceAoUsuario =
      evento.organizadorEmail?.toLowerCase() === usuario?.email?.toLowerCase() ||
      (!evento.organizadorEmail &&
        evento.organizador?.toLowerCase() === nomeUsuario);

    if (
      !usuario?.email ||
      !pertenceAoUsuario ||
      !window.confirm(`Tem certeza que deseja excluir "${evento.nome}"?`)
    ) {
      return;
    }

    const eventosAtualizados = estadoEventosCriados.eventos.filter(
      (item) => item.id !== evento.id,
    );

    try {
      localStorage.setItem(chaveEventosCriados, JSON.stringify(eventosAtualizados));
    } catch {
      setEstadoEventosCriados((atual) => ({
        ...atual,
        erro: "Não foi possível excluir o evento neste navegador.",
      }));
      return;
    }

    setEstadoEventosCriados({ eventos: eventosAtualizados, erro: "" });
    setFavoritos((atuais) => atuais.filter((id) => id !== evento.id));
  };
  let conteudo = <Home eventos={todosEventos} favoritos={favoritos} usuario={usuario} onAbrir={abrirEvento} onFavoritar={alternarFavorito} onExcluir={excluirEvento} />;
  if (pagina === "login") conteudo = <Login onEntrar={entrar} onCadastro={() => navegar("cadastro")} />;
  if (pagina === "cadastro") conteudo = <Cadastro onCadastrar={entrar} onLogin={() => navegar("login")} />;
  if (pagina === "detalhes") conteudo = <DetalhesEvento evento={eventoSelecionado} favorito={favoritos.includes(eventoSelecionado?.id)} onFavoritar={alternarFavorito} onVoltar={() => navegar("inicio")} />;
  if (pagina === "favoritos") conteudo = <Favoritos eventos={todosEventos.filter((evento) => favoritos.includes(evento.id))} onAbrir={abrirEvento} onRemover={alternarFavorito} onExplorar={() => navegar("inicio")} />;
  if (pagina === "conta") conteudo = <MinhaConta usuario={usuario} favoritos={favoritos.length} onSair={() => { setUsuario(null); navegar("inicio"); }} />;
  if (pagina === "novo-evento" && usuario) conteudo = <NovoEvento usuario={usuario} onPublicar={publicarEvento} onCancelar={() => navegar("inicio")} />;
  if (pagina === "novo-evento" && !usuario) conteudo = <Login onEntrar={entrar} onCadastro={() => navegar("cadastro")} />;
  return <><Header usuario={usuario} favoritos={favoritos.length} onNavegar={navegar} />{estadoEventosCriados.erro && <p className="erro erro-eventos" role="alert">{estadoEventosCriados.erro}</p>}{conteudo}</>;
}
export default App;

import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DetalhesEvento from "./pages/DetalhesEvento";
import Favoritos from "./pages/Favoritos";
import MinhaConta from "./pages/MinhaConta";

const eventos = [
  { id: 1, nome: "Festival de Música ao Ar Livre", categoria: "Cultural", data: "15 Mai • 18h", local: "Parque Cesamar", cor: "laranja", descricao: "Uma noite para celebrar a música, a cultura e os encontros ao ar livre." },
  { id: 2, nome: "Corrida Noturna Capital Run", categoria: "Esportivo", data: "20 Mai • 19h", local: "Orla de Palmas", cor: "rosa", descricao: "Percursos para todos os ritmos, com muita energia na orla de Palmas." },
  { id: 3, nome: "Feira Gastronômica de Palmas", categoria: "Gastronômico", data: "22 Mai • 17h", local: "Praça dos Girassóis", cor: "vermelho", descricao: "Sabores locais, chefs convidados e opções para toda a família." },
  { id: 4, nome: "Teatro: A Comédia dos Erros", categoria: "Cultural", data: "25 Mai • 20h", local: "Teatro Fernanda Montenegro", cor: "laranja", descricao: "Uma montagem leve e divertida de um clássico do teatro." },
  { id: 5, nome: "Encontro de Startups do Tocantins", categoria: "Social", data: "28 Mai • 14h", local: "Hub de Inovação", cor: "roxo", descricao: "Ideias, conexões e conversas para quem constrói o futuro." },
  { id: 6, nome: "Show Sertanejo na Praça", categoria: "Cultural", data: "30 Mai • 19h", local: "Praça da Paz", cor: "rosa", descricao: "Grandes sucessos sertanejos em uma noite especial na praça." },
];

function App() {
  const [pagina, setPagina] = useState("inicio"); const [eventoSelecionado, setEventoSelecionado] = useState(null); const [favoritos, setFavoritos] = useState([]); const [usuario, setUsuario] = useState(null);
  const navegar = (destino) => { setPagina(destino); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const abrirEvento = (evento) => { setEventoSelecionado(evento); navegar("detalhes"); };
  const alternarFavorito = (id) => setFavoritos((atuais) => atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id]);
  const entrar = (nome) => { setUsuario({ nome }); navegar("inicio"); };
  let conteudo = <Home eventos={eventos} favoritos={favoritos} onAbrir={abrirEvento} onFavoritar={alternarFavorito} />;
  if (pagina === "login") conteudo = <Login onEntrar={entrar} onCadastro={() => navegar("cadastro")} />;
  if (pagina === "cadastro") conteudo = <Cadastro onCadastrar={entrar} onLogin={() => navegar("login")} />;
  if (pagina === "detalhes") conteudo = <DetalhesEvento evento={eventoSelecionado} favorito={favoritos.includes(eventoSelecionado?.id)} onFavoritar={alternarFavorito} onVoltar={() => navegar("inicio")} />;
  if (pagina === "favoritos") conteudo = <Favoritos eventos={eventos.filter((evento) => favoritos.includes(evento.id))} onAbrir={abrirEvento} onRemover={alternarFavorito} onExplorar={() => navegar("inicio")} />;
  if (pagina === "conta") conteudo = <MinhaConta usuario={usuario} favoritos={favoritos.length} onSair={() => { setUsuario(null); navegar("inicio"); }} />;
  return <><Header usuario={usuario} favoritos={favoritos.length} onNavegar={navegar} />{conteudo}</>;
}
export default App;

import Periodista from "../../periodistas/domain/Periodista";
import Recurso from "./Recurso";


export default interface Noticia{
    id?: String;
    titulo: String;
    texto: String;
    periodistas: Array<Periodista>;
    recursos: Array<Recurso>;
}
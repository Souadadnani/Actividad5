import Periodista from "../../periodistas/domain/Periodista";
import Recurso from "./Recurso";



export default interface Noticia{
    id?: string;
    titulo: string;
    texto: string;
    periodistas?: Array<Periodista>;
    recursos?: Array<Recurso>;
}
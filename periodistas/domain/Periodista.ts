import Noticia from "../../noticias/domain/Noticia";

export default interface Periodista{
    id?: number;
    nombre: string;
    fechaNacimiento: Date;
    noticias?: Array<Noticia>; 
}
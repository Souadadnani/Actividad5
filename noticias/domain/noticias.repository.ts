import Noticia from "./Noticia";

export default interface NoticiasRepository{
    getNoticias(): Promise<Noticia[] | undefined>;
    getNoticiaById(id: String): Promise<Noticia | undefined>;
    createNoticia(noticia: Noticia): Promise<Noticia | undefined>;
    deleteNoticia(id: String): Promise<Noticia | undefined>;
}
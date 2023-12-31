import Noticia from "./Noticia";

export default interface NoticiasRepository{

    getNoticias(): Promise<Noticia[] | undefined>;
    getNoticiaById(id: string): Promise<Noticia | undefined>;
    createNoticia(noticia: Noticia): Promise<Noticia | undefined>;
    deleteNoticia(id: string): Promise<Noticia[] | undefined>;
    getNoticiasByIdPeriodista(idPeriodista: number): Promise<Noticia[] | undefined>;
    deleteNoticiasByIdPeriodista(idPeriodista: number): Promise<void>;
}
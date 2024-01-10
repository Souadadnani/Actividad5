import Noticia from "../domain/Noticia";
import NoticiasRepository from "../domain/noticias.repository";


export default class NoticiasUseCases{

    private noticiasRepository: NoticiasRepository;

    constructor(noticiasRepository: NoticiasRepository){
        this.noticiasRepository = noticiasRepository;
    }

    async getNoticias(){
        return this.noticiasRepository.getNoticias();
    }

    async getNoticiasById(id:string){
        return this.noticiasRepository.getNoticiaById(id);
    }

    async createNoticia(noticia: Noticia){
        return this.noticiasRepository.createNoticia(noticia);
    }

    async deleteNoticia(id: string){
        try {
            (await this.getNoticiasById(id)).recursos.forEach(recurso=>
                this.noticiasRepository.deleteRecurso(recurso.id));   
            return this.noticiasRepository.deleteNoticia(id);
        } catch (error) {
            console.error("Error al eliminar la noticia", error);
            throw error;
        }   
    }

    async getNoticiasByIdPeriodista(idPeriodista: number) {
        return this.noticiasRepository.getNoticiasByIdPeriodista(idPeriodista);
    }


}
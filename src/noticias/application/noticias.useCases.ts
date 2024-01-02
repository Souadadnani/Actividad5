import PeriodistasRepository from "../../periodistas/domain/periodistas.repository";
import Noticia from "../domain/Noticia";
import NoticiasRepository from "../domain/noticias.repository";


export default class NoticiasUseCases{

    private noticiasRepository: NoticiasRepository;
    private periodistasRepository: PeriodistasRepository;

    constructor(noticiasRepository: NoticiasRepository, periodistasRepository: PeriodistasRepository){
        this.noticiasRepository = noticiasRepository;
        this.periodistasRepository = periodistasRepository;
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
            (await this.getNoticiasById(id)).recursos.forEach(recurso=>this.periodistasRepository.deleteRecurso(recurso.id));   
            return this.noticiasRepository.deleteNoticia(id);
        } catch (error) {
            console.error("Error al eliminar la noticia", error);
            throw error;
        }   
    }

    async getNoticiasByIdPeriodista(idPeriodista: number) {
        return this.noticiasRepository.getNoticiasByIdPeriodista(idPeriodista);
    }

    async deleteNoticiasByIdPeriodista(idPeriodista: number){
        this.noticiasRepository.deleteNoticiasByIdPeriodista(idPeriodista);
    }

}
import NoticiasRepository from "../../noticias/domain/noticias.repository";
import Periodista from "../domain/Periodista";
import PeriodistasRepository from "../domain/periodistas.repository";


export default class PeriodistasUseCases{
    private periodistasRepository: PeriodistasRepository;
    private noticiasRepository: NoticiasRepository;

    constructor(periodistasRepository: PeriodistasRepository, noticiasRepository: NoticiasRepository){
        this.periodistasRepository = periodistasRepository;
        this.noticiasRepository = noticiasRepository;
    }

    async getPeriodistas(){
        return this.periodistasRepository.getPeriodistas();
    }

    async getPeriodistaById(id: number){
        try {   
            const noticiasMongo = await this.noticiasRepository.getNoticiasByIdPeriodista(id);
            console.log(noticiasMongo);
            const periodistaFromPostgres = await this.periodistasRepository.getPeriodistaById(id);
            periodistaFromPostgres.noticias = noticiasMongo;
            return periodistaFromPostgres; 
        } catch (error) {
            console.error('Error al obtener el periodista: ', error);
            throw error;
        }
    }

    async createPeriodista(periodista: Periodista){
        return this.periodistasRepository.createPeriodista(periodista);
    }

    async updatePeriodista(id: number, periodista: Periodista){
        return this.periodistasRepository.updatePeriodista(id, periodista);
    }

    async deletePeriodista(idPeriodista: number){
        try {
            this.noticiasRepository.deleteNoticiasByIdPeriodista(idPeriodista);
            this.deleteRecurso(idPeriodista);
            return this.periodistasRepository.deletePeriodista(idPeriodista);
        } catch (error) {
            console.error("Error al eliminar la periodista: ", error);
            throw error;
        }
    }

    async deleteRecurso(idPeriodista: number){
        try {
           const noticiasMongo = await this.noticiasRepository.getNoticiasByIdPeriodista(idPeriodista);
            noticiasMongo.forEach(noticia=>{
                noticia.recursos.forEach(recurso=>{
                    this.periodistasRepository.deleteRecurso(recurso.id);   
                })
            })
        } catch (error) {
            console.error("Error al eliminar el recurso: ", error);
            throw error;
        }
    }
}
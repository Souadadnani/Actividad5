import Noticia from "../../noticias/domain/Noticia";
import NoticiasRepository from "../../noticias/domain/noticias.repository";
import Periodista from "../domain/Periodista";
import PeriodistasRepository from "../domain/periodistas.repository";


export default class PeriodistasUseCases{
    private periodistasRepository: PeriodistasRepository;
    private noticiasRepository?: NoticiasRepository;

    constructor(periodistasRepository: PeriodistasRepository, noticiasRepository?: NoticiasRepository){
        this.periodistasRepository = periodistasRepository;
        this.noticiasRepository = noticiasRepository;
    }

    async getPeriodistas(){
        return this.periodistasRepository.getPeriodistas();
    }

    async getPeriodistaById(id: String){
        const periodista = this.getPeriodistaById(id);
        const noticias  = this.noticiasRepository?.getNoticias();
        

        return this.periodistasRepository.getPeriodistaById(id);
    }

    async createPeriodista(periodista: Periodista){
        return this.periodistasRepository.createPeriodista(periodista);
    }

    async updatePeriodista(periodista: Periodista){
        return this.periodistasRepository.createPeriodista(periodista);
    }

    async deletePeriodista(id: String){
        return this.periodistasRepository.deletePeriodista(id);
    }
}
import Periodista from "../domain/Periodista";
import PeriodistasRepository from "../domain/periodistas.repository";

export default class PeriodistasUseCases{
    private periodistasRepository: PeriodistasRepository;

    constructor(periodistasRepository: PeriodistasRepository){
        this.periodistasRepository = periodistasRepository;
    }

    async getPeriodistas(){
        return this.periodistasRepository.getPeriodistas();
    }

    async getById(id: String){
        return this.periodistasRepository.getById(id);
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
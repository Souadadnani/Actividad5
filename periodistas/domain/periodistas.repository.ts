import Periodista from "./Periodista";

export default interface PeriodistasRepository{

    getPeriodistas(): Promise<Periodista[] | undefined>;
    getById(id: String): Promise<Periodista[] | undefined>;
    createPeriodista(periodista: Periodista): Promise<Periodista[] | undefined>;
    updatePeriodista(periodista: Periodista): Promise<Periodista>;
    deletePeriodista(id: String): Promise<Periodista[] | undefined>; 
}
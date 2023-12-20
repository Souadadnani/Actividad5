import Periodista from "./Periodista";

export default interface PeriodistasRepository{

    getPeriodistas(): Promise<Periodista[] | undefined>;
    getPeriodistaById(id: String): Promise<Periodista | undefined>;
    createPeriodista(periodista: Periodista): Promise<Periodista[] | undefined>;
    updatePeriodista(periodista: Periodista);
    deletePeriodista(id: String): Promise<Periodista[] | undefined>; 
}
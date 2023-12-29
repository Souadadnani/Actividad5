import { IntegerType } from "mongodb";
import Periodista from "./Periodista";

export default interface PeriodistasRepository{

    getPeriodistas(): Promise<Periodista[] | undefined>;
    getPeriodistaById(id: number): Promise<Periodista | undefined>;
    createPeriodista(periodista: Periodista): Promise<Periodista[] | undefined>;
    updatePeriodista(id: number,periodista: Periodista): Promise<Periodista | undefined>;
    deletePeriodista(id: number): Promise<Periodista[] | undefined>; 
}
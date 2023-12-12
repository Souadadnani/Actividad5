import Periodista from "../../domain/Periodista";
import PeriodistasRepository from "../../domain/periodistas.repository";
import executeQuery from "../../../context/postgres.connector";

export default class PeriodistasRepositoryPostgres implements PeriodistasRepository{


    async getPeriodistas(): Promise<Periodista[] | undefined> {

       const periodistas: Periodista[] = [];
       const query = 'select * from periodistas';
       const periodistasFromBD: any[] = await executeQuery(query);
       for(const item of periodistasFromBD){
        const periodista: Periodista = {
            id: item.id,
            nombre: item.nombre,
            fechaNacimiento: new Date(item.fechaNacimiento),
        };
        periodistas.push(periodista);
       } 
       return periodistas;
    }

    async getPeriodistaById(id: String): Promise<Periodista | undefined> {
        const sql = `select * from periodistas where id=${id}`;
        const periodistaFromBD: Periodista = await executeQuery(sql);
        const periodista: Periodista ={
            id: periodistaFromBD.id,
            nombre: periodistaFromBD.nombre,
            fechaNacimiento: new Date(periodistaFromBD.fechaNacimiento),
        };

        return periodista;
    }

    async createPeriodista(periodista: Periodista): Promise<Periodista[] | undefined> {
        try {
            const result = await executeQuery(
                `insert into periodistas(nombre, fechaNacimiento) values('${periodista.nombre}', '${periodista.fechaNacimiento}') RETURNING id`,
            );
            periodista.id = result[0].id;
        } catch (error) {
            console.error(error);
            //return undefined;
        }
        return this.getPeriodistas();
    }
    updatePeriodista(periodista: Periodista): Promise<Periodista> {
        throw new Error("Method not implemented.");
    }
    deletePeriodista(id: String): Promise<Periodista[] | undefined> {
        throw new Error("Method not implemented.");
    }

}


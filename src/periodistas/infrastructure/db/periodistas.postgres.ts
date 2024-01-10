import Periodista from "../../domain/Periodista";
import PeriodistasRepository from "../../domain/periodistas.repository";
import executeQuery from "../../../context/postgres.connector";
import Recurso from "../../../noticias/domain/Recurso";

export default class PeriodistasRepositoryPostgres implements PeriodistasRepository{

    async getPeriodistas(): Promise<Periodista[] | undefined> {
       const periodistas: Periodista[] = [];
       const query = 'select * from periodistas order by id desc';
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

    async getPeriodistaById(id: number): Promise<Periodista | undefined> {
        try{
        const sql = `select * from periodistas where id=${id}`;
        const periodistaFromBD: any[] = await executeQuery(sql);
    
        for(let p of periodistaFromBD){
                const periodista: Periodista ={
                id: p.id,
                nombre: p.nombre,
                fechaNacimiento: new Date(p.fechaNacimiento),
                noticias: p.noticias
            }
        return periodista;
        };
        }catch(error){
            console.error('Error al obtener el periodista: ', error);
            throw error;
        }    
    }

    async createPeriodista(periodista: Periodista): Promise<Periodista[] | undefined> {
        try {
            const result = await executeQuery(
                `insert into periodistas(nombre, "fechaNacimiento") values('${periodista.nombre}', '${periodista.fechaNacimiento}') RETURNING id`,
            );
            periodista.id = result[0].id;
        } catch (error) {
            console.error(error);
        }
        return this.getPeriodistas();
    }

    async updatePeriodista(id: number, periodista: Periodista): Promise<Periodista | undefined> {
        try {
            const periodistaFromBD = await executeQuery(`update periodistas set nombre='${periodista.nombre}', "fechaNacimiento"='${periodista.fechaNacimiento}' where id=${id}`);
            console.log(periodistaFromBD);      
        } catch (error) {
            console.error("Error al actualizar el periodista: ", error);
            throw error;
        }
        return this.getPeriodistaById(id);
    }

    async deletePeriodista(id: number): Promise<Periodista[] | undefined> {
        try {
            await executeQuery(`delete from periodistas where id=${id}`);
            return this.getPeriodistas();
        } catch (error) {
            console.error("Error al eliminar el periodista: ", error);
        }    
    }

    async getRecusos(): Promise<Recurso[] | undefined>{
        try{
            const recursos: Recurso[] = [];
            const recursosFromBD = await executeQuery(`select * from recursos`);
            for(const element of recursosFromBD){
                const recurso = {
                    id: element.id,
                    url: element.url
                };
                recursos.push(recurso);
            }
            return recursos;
        }catch(error){
            console.error(error);
        }
    }


}


import { ObjectId } from "mongodb";
import { collections } from "../../../context/mongoConnection";
import NoticiasRepository from "../../domain/noticias.repository";
import Noticia from "../../domain/Noticia";
import executeQuery from "../../../context/postgres.connector";


export default class NoticiasRepositoryMongoDB implements NoticiasRepository{
//sort({_id: -1}) or reverse()
    async getNoticias(): Promise<Noticia[] | undefined> {
        const noticiasBD = await collections.noticias.find().sort({_id: -1}).toArray();
        if(!noticiasBD) return undefined;
        const noticias: Noticia[] = noticiasBD.map((noticiaBD)=>{
            const noticia: Noticia = {
                id: String(noticiaBD._id),
                titulo: noticiaBD.titulo,
                texto: noticiaBD.texto,
                periodistas: noticiaBD.periodistas,
                recursos: noticiaBD.recursos
            };
            return noticia;
        });
        return noticias;
    }
    
    async getNoticiaById(id: string): Promise<Noticia | undefined> {
        const objectId = new ObjectId(id);
        const noticiaBD = await collections.noticias.findOne({_id: objectId});
        if(!noticiaBD) return undefined;
        const noticia: Noticia = {
            id: String(noticiaBD._id),
            titulo: noticiaBD.titulo,
            texto: noticiaBD.texto,
            periodistas: noticiaBD.periodistas,
            recursos: noticiaBD.recursos
        };
        return noticia;
    }

    async getNoticiasByIdPeriodista(idPeriodista: number): Promise<Noticia[] | undefined> {
        try {
        const noticias = await this.getNoticias();
        const noticiasOfPeriodista: Noticia[] = [];
        for (let noticia of noticias) {
            if(noticia.periodistas && Array.isArray(noticia.periodistas)){
                for(let p of noticia.periodistas){
                    if(p.id === idPeriodista){
                        const nuevaNoticia = {
                            id: noticia.id,
                            titulo: noticia.titulo,
                            texto: noticia.texto,
                            periodistas: noticia.periodistas,
                            recursos: noticia.recursos
                        };
                        noticiasOfPeriodista.push(nuevaNoticia);
                    }
                }
            }
        }    
        return noticiasOfPeriodista; 
        } catch (error) {
           console.error("Error al obtener la noticia: ", error);
           throw error; 
        }
    }

    async createNoticia(noticia: Noticia): Promise<Noticia | undefined> {
        const newNoticia = await collections.noticias.insertOne(noticia);
        const id = String(newNoticia.insertedId);
        return await this.getNoticiaById(id);
    }

    //eliminar una noticia
    async deleteNoticia(id: string): Promise<Noticia[] | undefined> {
        console.log(id);
        
        try {
            const objectId = new ObjectId(id);
            await collections.noticias.deleteOne({_id: objectId});
            return this.getNoticias();
        } catch (error) {
            console.error("Error al eliminar la noticia: ", error);
            throw error;
        }
    }

    //eliminar las noticias del periodista
   /*  async deleteNoticiasByIdPeriodista(idPeriodista: number): Promise<void> {
        try {
            const noticiasOfPeriodistas = await this.getNoticiasByIdPeriodista(idPeriodista);
            noticiasOfPeriodistas.forEach(noticia=>{  
                if(noticia.periodistas.length === 1){
                    this.deleteNoticia(noticia.id); 
                }else{console.log("No se puede eliminar la noticia esta escrita por mas periodistas");
                }                 
            });
        } catch (error) {
            console.error(`Error al eliminar la noticia del periodista con el id= ${idPeriodista}, `, error);     
        }
    } */

    async getNoticiasByIdRecurso(idRecurso: number): Promise<Noticia[] | undefined> {
        try {
        const noticias = await this.getNoticias();
        const noticiasRecurso: Noticia[] = [];
        for (let noticia of noticias) {
            if(noticia.recursos && Array.isArray(noticia.recursos)){
                for(let p of noticia.periodistas){
                    if(p.id === idRecurso){
                        const nuevaNoticia = {
                            id: noticia.id,
                            titulo: noticia.titulo,
                            texto: noticia.texto,
                            recursos: noticia.recursos
                        };
                        console.log(nuevaNoticia);
                        noticiasRecurso.push(nuevaNoticia);
                    }
                }
            }
        }    
        return noticiasRecurso; 
        } catch (error) {
           console.error("Error al obtener la noticia: ", error);
           throw error; 
        }
    }
    async deleteRecurso(idRecurso: number): Promise<void> {
        try {
            const noticias = await this.getNoticiasByIdRecurso(idRecurso);
            if(noticias.length === 1){
                await executeQuery(`delete from recursos where id=${idRecurso}`);
            }else{
                console.log("No se puede eliminar el recurso esta asociado a varias noticias");   
            }
        } catch (error) {
            console.error("Error al eliminar el recurso: ", error);
        }
    }

    
    
}
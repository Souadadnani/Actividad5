import { ObjectId } from "mongodb";
import NoticiasRepository from "../../domain/noticias.repository";
import Noticia from "../../domain/Noticia";
import { collections } from "../../../context/mongoConnection";
import Recurso from "../../domain/Recurso";

export default class NoticiasRepositoryMongoDB implements NoticiasRepository{

    async getNoticias(): Promise<Noticia[] | undefined> {
        const noticiasBD = await collections.noticias.find().toArray();
        console.log(noticiasBD);
        if(!noticiasBD) return undefined;
        console.log(noticiasBD);
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
                console.log(noticia.periodistas);
                for(let p of noticia.periodistas){
                    if(p.id === idPeriodista){
                        const nuevaNoticia = {
                            id: noticia.id,
                            titulo: noticia.titulo,
                            texto: noticia.texto,
                            recursos: noticia.recursos
                        };
                        console.log(nuevaNoticia);
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

    async deleteNoticia(id: string): Promise<Noticia[] | undefined> {
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
    async deleteNoticiasByIdPeriodista(idPeriodista: number): Promise<void> {
        try {
            const noticiasOfPeriodistas = await this.getNoticiasByIdPeriodista(idPeriodista);
            noticiasOfPeriodistas.forEach(noticia=>{  
                console.log("las noticias del periodista: ", noticia.periodistas);  
                this.deleteNoticia(noticia.id);             
            });
        } catch (error) {
            console.error(`Error al eliminar la noticia del periodista con el id= ${idPeriodista}, `, error);     
        }
    }

    
    
}
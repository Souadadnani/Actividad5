import { ObjectId } from "mongodb";
import NoticiasRepository from "../../domain/noticias.repository";
import Noticia from "../../domain/Noticia";
import { collections } from "../../../context/mongoConnection";

export default class NoticiasRepositoryMongoDB implements NoticiasRepository{
    async getNoticias(): Promise<Noticia[] | undefined> {
        const noticiasBD = await collections.noticias.find().toArray();
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

    async getNoticiasByIdPeriodista(periodista: string): Promise<Noticia | undefined>{
        const noticias = await this.getNoticias();
        for (const noticia of noticias) {
            
        }

        return undefined;
    }

    async createNoticia(noticia: Noticia): Promise<Noticia | undefined> {
        const resultado = await collections.noticias.insertOne(noticia);
        const id = String(resultado.insertedId);
        return await this.getNoticiaById(id);
    }

    async deleteNoticia(id: String): Promise<Noticia | undefined> {
        const resultado = await collections.noticias.deleteOne(id);
        
        throw new Error("Method not implemented.");
    }
    
}
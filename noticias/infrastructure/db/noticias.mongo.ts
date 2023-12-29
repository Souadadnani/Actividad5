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

    async getNoticiasByIdPeriodista(idPeriodista: number): Promise<Noticia[] | undefined> {
        try {
        const noticias = await this.getNoticias();
        const noticiasOfPeriodista: Noticia[] = [];
        console.log(noticias);
        console.log(noticiasOfPeriodista);
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
           console.error("error al obtener la noticia: ", error);
           throw error; 
        }
    }

    async createNoticia(noticia: Noticia): Promise<Noticia | undefined> {
        const resultado = await collections.noticias.insertOne(noticia);
        const id = String(resultado.insertedId);
        return await this.getNoticiaById(id);
    }

    async deleteNoticia(id: String): Promise<Noticia[] | undefined> {
        const resultado = await collections.noticias.deleteOne(id);
        return this.getNoticias();
    }
    
}
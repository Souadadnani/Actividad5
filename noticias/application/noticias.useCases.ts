
import Noticia from "../domain/Noticia";
import NoticiasRepository from "../domain/noticias.repository";

export default class NoticiasUseCases{

    private noticiasRepository: NoticiasRepository;

    constructor(noticiasRepository: NoticiasRepository){
        this.noticiasRepository = noticiasRepository;
    }

    async getNoticias(){
        return this.noticiasRepository.getNoticias();
    }

    async getNoticiasById(id:string){
        return this.noticiasRepository.getNoticiaById(id);
    }

    async createNoticia(noticia: Noticia){
        return this.noticiasRepository.createNoticia(noticia);
    }

    async deleteNoticia(id: string){
        return this.noticiasRepository.deleteNoticia(id);
    }
    async getNoticiasByIdPeriodista(idPeriodista: number) {
        return this.noticiasRepository.getNoticiasByIdPeriodista(idPeriodista);
    }

}
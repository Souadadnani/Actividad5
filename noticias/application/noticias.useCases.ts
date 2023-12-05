import NoticiasRepository from "../domain/noticias.repository";

export default class NoticiasUseCases{

    private noticiasRepository: NoticiasRepository;

    constructor(noticiasRepository: NoticiasRepository){
        this.noticiasRepository = noticiasRepository;
    }

    async getNoticias(){}

}
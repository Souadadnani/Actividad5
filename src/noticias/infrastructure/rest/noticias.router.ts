import express from "express";
import NoticiasUseCases from "../../application/noticias.useCases";
import NoticiasRepositoryMongoDB from "../db/noticias.mongo";
import PeriodistasRepositoryPostgres from "../../../periodistas/infrastructure/db/periodistas.postgres";

const router = express.Router();
const noticiasUseCases: NoticiasUseCases = new NoticiasUseCases(new NoticiasRepositoryMongoDB(), new PeriodistasRepositoryPostgres());

router.get("/", async (req, res)=>{
    try {
        const noticias = await noticiasUseCases.getNoticias();
        res.json(noticias);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/:id", async(req, res)=>{
    try {
        const noticiaId = req.params.id;
        const noticia = await noticiasUseCases.getNoticiasById(noticiaId);
        if(noticia){
            res.json(noticia);
        }else{
            res.status(404).json({ error: "La noticia no se encuentra"});
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"}); 
    }
});

router.get("/periodista/:id",async (req, res) => {
    try {
        const idPeriodista = parseInt(req.params.id);
        console.log(idPeriodista);
        const noticias = await noticiasUseCases.getNoticiasByIdPeriodista(idPeriodista);
        if(noticias){
            res.json(noticias);
        }else{
            res.status(404).json({error: `Las noticias del periodista con el id= ${idPeriodista} no se ecuentran`});
        }  
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }    
});

router.post("/", async(req ,res)=>{
    try {
        const newNoticia = req.body;
        const createdNoticia = await noticiasUseCases.createNoticia(newNoticia);
        res.status(201).json(createdNoticia);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async(req, res) => {
   try {
    const idNoticia = req.params.id;
    const deletedNoticia = await noticiasUseCases.deleteNoticia(idNoticia);
    res.status(201).json(deletedNoticia);
   } catch (error) {
        res.status(500).json({error: "Internel Server Error"});
   } 
});

export default router;
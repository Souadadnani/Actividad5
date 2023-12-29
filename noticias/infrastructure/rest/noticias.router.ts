import express from "express";
import NoticiasUseCases from "../../application/noticias.useCases";
import NoticiasRepositoryMongoDB from "../db/noticias.mongo";

const router = express.Router();
const noticiasUseCases: NoticiasUseCases = new NoticiasUseCases(new NoticiasRepositoryMongoDB);

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
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" }); 
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

export default router;
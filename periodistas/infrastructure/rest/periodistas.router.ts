import express, {Request, Response} from "express";
import PeriodistasUseCases from "../../application/periodistas.useCases";
import PeriodistasRepositoryPostgres from "../db/periodistas.postgres";
import NoticiasRepositoryMongoDB from "../../../noticias/infrastructure/db/noticias.mongo";
const router = express.Router();


const periodistasUseCases: PeriodistasUseCases = new PeriodistasUseCases(new PeriodistasRepositoryPostgres(), new NoticiasRepositoryMongoDB());

router.get("/", async(req: Request, res: Response) => {
    try {
        const periodistas = await periodistasUseCases.getPeriodistas();
        res.send(periodistas);
    } catch (error) {
       console.error(error);
       res.status(500).send(error);
    }
});

router.get("/:id", async(req: Request, res: Response)=>{
    try {
        const periodistaId =parseInt(req.params.id);
        const periodista = await periodistasUseCases.getPeriodistaById(periodistaId);
        res.send(periodista);    
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/", async(req: Request, res: Response)=>{
    try {
        const newPeriodista = req.body;
        const result = await periodistasUseCases.createPeriodista(newPeriodista);
        res.json(result); 
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put("/:id",async (req: Request, res: Response) => {
    try {
        const periodistaId = parseInt(req.params.id);
        const actualizada = req.body;
        const result = await periodistasUseCases.updatePeriodista(periodistaId ,actualizada);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete("/:id",async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await periodistasUseCases.deletePeriodista(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export {router as routerPeriodistas};
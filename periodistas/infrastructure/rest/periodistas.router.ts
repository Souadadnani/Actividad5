import express, {Request, Response} from "express";
import PeriodistasUseCases from "../../application/periodistas.useCases";
import PeriodistasRepositoryPostgres from "../db/periodistas.postgres";
const router = express.Router();


const periodistasUseCases: PeriodistasUseCases = new PeriodistasUseCases(new PeriodistasRepositoryPostgres());

router.get("/", async(req: Request, res: Response) => {
    try {
        const periodistas = await periodistasUseCases.getPeriodistas();
        res.send(periodistas);
    } catch (error) {
       console.error(error);
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

export {router as routerPeriodistas};
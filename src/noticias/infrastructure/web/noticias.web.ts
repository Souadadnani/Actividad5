import express from "express";
import NoticiasUseCases from "../../application/noticias.useCases";
import NoticiasRepositoryMongoDB from "../db/noticias.mongo";
import PeriodistasRepositoryPostgres from "../../../periodistas/infrastructure/db/periodistas.postgres";

const router = express.Router();
const noticiasUseCases: NoticiasUseCases = new NoticiasUseCases(new NoticiasRepositoryMongoDB(), new PeriodistasRepositoryPostgres());

router.get("",async (req, res) => {
    const noticias = await noticiasUseCases.getNoticias();
    res.render('noticias', {noticias});
});

router.get("/:periodista", async (req, res) => {
    const periodista = parseInt(req.params.periodista);
    const noticiasDelPeriodista = await noticiasUseCases.getNoticiasByIdPeriodista(periodista);
    res.render('noticiasDelPeriodista', {noticiasDelPeriodista, periodista});
});

export default router;

/* app.get('/something', (req, res) => {
    req.query.color1 === 'red'  // true
    req.query.color2 === 'blue' // true
}) */
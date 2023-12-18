import express from "express";
import dotenv from "dotenv";
import noticiasRoueter from "./noticias/infrastructure/rest/noticias.router";
import createMongoConnection from "./context/mongoConnection";
import { routerPeriodistas } from "./periodistas/infrastructure/rest/periodistas.router";

createMongoConnection();

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/noticias", noticiasRoueter);
app.use("/periodistas", routerPeriodistas);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});



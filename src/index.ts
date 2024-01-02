import express from "express";
import dotenv from "dotenv";
import noticiasRoueter from "./noticias/infrastructure/rest/noticias.router";
import createMongoConnection from "./context/mongoConnection";
import { routerPeriodistas } from "./periodistas/infrastructure/rest/periodistas.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger-output.json";

createMongoConnection();

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use("/noticias", noticiasRoueter);
app.use("/api/noticias", noticiasRoueter);
app.use("/api/periodistas", routerPeriodistas);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {explorer: true})
);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});



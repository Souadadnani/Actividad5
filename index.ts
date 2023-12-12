import express from "express";
import noticiasRoueter from "./noticias/infrastructure/rest/noticias.router";
import createMongoConnection from "./context/mongoConnection";

createMongoConnection();

const app = express();
const port = 8080;

app.use(express.json());
app.use("/noticias", noticiasRoueter);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});



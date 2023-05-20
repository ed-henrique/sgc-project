import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import sequelize from "./config/sequelize.js";

const PORT = 3000;
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROTAS
app.use("/", routes);

// Conexão com Banco de Dados
sequelize.sync().then(() => {
  console.log("Conectado ao Banco de Dados com sucesso!");
});

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));

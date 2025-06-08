import dotenv from "dotenv";
dotenv.config();

import { db } from "./firebase/firebaseConfig";
console.log("db importado:", db ? "ok" : "erro");

import express from "express";


const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

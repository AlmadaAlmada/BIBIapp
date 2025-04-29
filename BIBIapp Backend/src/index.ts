import dotenv from "dotenv";
dotenv.config();

import { db } from "./firebase/firebaseConfig";
console.log("db importado:", db ? "ok" : "erro");

import express from "express";
import forumRoutes from "./forum/forumRoutes";

const app = express();
app.use(express.json());

app.use("/forum", forumRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

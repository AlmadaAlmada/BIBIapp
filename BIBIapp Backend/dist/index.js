"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig_1 = require("./firebase/firebaseConfig");
console.log("db importado:", firebaseConfig_1.db ? "ok" : "erro");
const express_1 = __importDefault(require("express"));
const forumRoutes_1 = __importDefault(require("./forum/forumRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/forum", forumRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

import { fazerLogin } from "../autenticacao/autenticacaoServico";
import 'dotenv/config';

const email = process.env.EMAIL ?? "";
const senha = process.env.SENHA ?? "";

async function testarLogin() {
  const resultado = await fazerLogin(email, senha, false);
  console.log("Resultado do login:", resultado);
}

testarLogin();
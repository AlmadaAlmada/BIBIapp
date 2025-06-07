import { fazerLogin } from "../autenticacao/autenticacaoServico";
import 'dotenv/config';

const email = process.env.EMAIL ?? "";
const senha = process.env.SENHA ?? "";

async function testarLogin() {
  const resultado = await fazerLogin(email, senha, false);
  console.log("Resultado do login:", resultado);
  if (resultado.sucesso && resultado.token) {
    console.log("Token JWT do usuário:", resultado.token);
  } else {
    console.log("Falha ao obter token.");
  }
}

testarLogin();
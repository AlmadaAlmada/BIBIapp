import { cadastrarUsuario } from "../autenticacao/autenticacaoServico";

const nome = "Usuário Teste";
const email = `teste${Math.floor(Math.random() * 10000)}@email.com`;
const senha = "senha123";
const confirmarSenha = "senha123";

async function testarCadastro() {
  const resultado = await cadastrarUsuario(nome, email, senha, confirmarSenha);
  console.log("Resultado do cadastro:", resultado);
}

testarCadastro();
import { cadastrarCarro } from "../carros/carroServico";
import 'dotenv/config';

const uidUsuario = process.env.UID_USUARIO ?? "";

async function testarCadastroCarro() {
  const resultado = await cadastrarCarro(uidUsuario, {
    nome: "Meu Corolla",
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2022,
    mediaKmSemana: 150
  });
  console.log("Resultado do cadastro de carro:", resultado);
}

testarCadastroCarro();
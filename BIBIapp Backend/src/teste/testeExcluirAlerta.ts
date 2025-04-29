import { excluirAlerta } from "../alertas/alertaServico";
import 'dotenv/config';

const uidUsuario = process.env.UID_USUARIO ?? "";
const carroId = process.env.CARRO_ID ?? "";
const alertaId = process.env.ALERTA_ID ?? "";

async function testarExcluirAlerta() {
  const resultado = await excluirAlerta(uidUsuario, carroId, alertaId);
  console.log("Resultado da exclusão do alerta:", resultado);
}

testarExcluirAlerta();
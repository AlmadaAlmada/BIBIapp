import { cadastrarAlerta } from "../alertas/alertaServico";
import 'dotenv/config';

const uidUsuario = process.env.UID_USUARIO ?? "";
const carroId = process.env.CARRO_ID ?? "";

async function testarCadastroAlerta() {
  const resultado = await cadastrarAlerta(
    uidUsuario,
    carroId,
    "Óleo do motor",
    "25/04/2025"
  );
  console.log("Resultado do cadastro de alerta:", resultado);
}

testarCadastroAlerta();
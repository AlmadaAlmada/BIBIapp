import { editarDataAlerta } from "../alertas/alertaServico";
import 'dotenv/config';

const uidUsuario = process.env.UID_USUARIO ?? "";
const carroId = process.env.CARRO_ID ?? "";
const alertaId = process.env.ALERTA_ID ?? ""; 

async function testarEditarAlerta() {
  const resultado = await editarDataAlerta(
    uidUsuario,
    carroId,
    alertaId,
    "28/04/2025"
  );
  console.log("Resultado da edição do alerta:", resultado);
}

testarEditarAlerta();
import { Request, Response } from 'express';
import {
  cadastrarAlerta,
  editarDataAlerta,
  excluirAlerta,
  StatusAlertaPorId,
  PECAS_DISPONIVEIS,
  buscarAlertaPorId,
  listarAlertasPorCarro
} from '../alertas/alertaServico';

interface ResultadoAlerta {
  sucesso: boolean;
  mensagem: string;
}

interface StatusAlerta {
  status: "ok" | "recomendada" | "necessaria";
  kmRestante: number;
  mesesRestantes: number;
}

const criarAlerta = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, peca, dataUltimaTroca } = req.body;

  if (!uidUsuario || !carroId || !peca || !dataUltimaTroca) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios (uidUsuario, carroId, peca, dataUltimaTroca).',
    });
  }

  try {
    const resultado: ResultadoAlerta = await cadastrarAlerta(uidUsuario, carroId, peca, dataUltimaTroca);
    return res.status(resultado.sucesso ? 201 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de criação de alerta:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao cadastrar alerta.',
    });
  }
};

const atualizarDataAlerta = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId, novaDataUltimaTroca } = req.body;

  if (!uidUsuario || !carroId || !alertaId || !novaDataUltimaTroca) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios (uidUsuario, carroId, alertaId, novaDataUltimaTroca).',
    });
  }

  try {
    const resultado: ResultadoAlerta = await editarDataAlerta(uidUsuario, carroId, alertaId, novaDataUltimaTroca);
    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de atualização de alerta:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao atualizar alerta.',
    });
  }
};

const removerAlerta = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId } = req.params; 

  if (!uidUsuario || !carroId || !alertaId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os parâmetros são obrigatórios (uidUsuario, carroId, alertaId).',
    });
  }

  try {
    const resultado: ResultadoAlerta = await excluirAlerta(uidUsuario, carroId, alertaId);
    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de exclusão de alerta:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao excluir alerta.',
    });
  }
};

const obterStatusAlerta = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId } = req.params; 

  if (!uidUsuario || !carroId || !alertaId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os parâmetros são obrigatórios (uidUsuario, carroId, alertaId).',
    });
  }

  try {
    const resultado: StatusAlerta | { erro: string } = await StatusAlertaPorId(uidUsuario, carroId, alertaId);

    if ('erro' in resultado) {
      return res.status(404).json({ sucesso: false, mensagem: resultado.erro });
    } else {
      return res.status(200).json({ sucesso: true, ...resultado });
    }
  } catch (error) {
    console.error('Erro no controller ao obter status do alerta:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao obter status do alerta.',
    });
  }
};

const obterPecasDisponiveis = (req: Request, res: Response) => {
  try {
    return res.status(200).json({ sucesso: true, pecas: PECAS_DISPONIVEIS });
  } catch (error) {
    console.error('Erro ao obter peças disponíveis:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao obter peças disponíveis.',
    });
  }
};

const listarAlertasDoCarro = async (req: Request, res: Response) => {
  const { uidUsuario, carroId } = req.params;

  if (!uidUsuario || !carroId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'UID do usuário e ID do carro são obrigatórios.',
    });
  }

  try {
    const { sucesso, mensagem, alertas } = await listarAlertasPorCarro(uidUsuario, carroId);
    if (sucesso) {
      return res.status(200).json({ sucesso: true, alertas });
    } else {
      return res.status(404).json({ sucesso: false, mensagem });
    }
  } catch (error) {
    console.error('Erro no controller ao listar alertas:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao listar alertas.',
    });
  }
};

const obterAlertaPorId = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId } = req.params;

  if (!uidUsuario || !carroId || !alertaId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'UID do usuário, ID do carro e ID do alerta são obrigatórios.',
    });
  }

  try {
    const { sucesso, mensagem, alerta } = await buscarAlertaPorId(uidUsuario, carroId, alertaId);
    if (sucesso) {
      return res.status(200).json({ sucesso: true, alerta });
    } else {
      return res.status(404).json({ sucesso: false, mensagem });
    }
  } catch (error) {
    console.error('Erro no controller ao buscar alerta por ID:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao buscar alerta.',
    });
  }
};

const obterStatusAlertaPorId = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId } = req.params;

  if (!uidUsuario || !carroId || !alertaId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'UID do usuário, ID do carro e ID do alerta são obrigatórios.',
    });
  }

  try {
    const resultado = await StatusAlertaPorId(uidUsuario, carroId, alertaId);

    if ('erro' in resultado) {
      return res.status(404).json({ sucesso: false, mensagem: resultado.erro });
    }

    return res.status(200).json({ sucesso: true, ...resultado });
  } catch (error) {
    console.error('Erro ao obter status do alerta por ID:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao obter status do alerta por ID.',
    });
  }
};

const listarAlertasComStatus = async (req: Request, res: Response) => {
  const { uidUsuario, carroId } = req.params;

  if (!uidUsuario || !carroId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'UID do usuário e ID do carro são obrigatórios.',
    });
  }

  try {
    const { sucesso, alertas, mensagem } = await listarAlertasPorCarro(uidUsuario, carroId);

    if (!sucesso || !alertas) {
      return res.status(404).json({ sucesso: false, mensagem });
    }

    // Processar cada alerta com seu status

    const alertasComStatus = await Promise.all(alertas.map(async (alerta: any) => {
      try {
        // Tente diferentes possibilidades para o ID do alerta
        const alertaId = alerta.id || alerta.alertaId || alerta.key || alerta.documentId;
        
        if (!alertaId) {
          console.error('ID do alerta não encontrado:', alerta);
          return {
            ...alerta,
            dataUltimaTroca: new Date(alerta.dataUltimaTroca.seconds * 1000).toISOString(),
            status: null,
            kmRestante: null,
            mesesRestantes: null,
            erro: 'ID do alerta não encontrado'
          };
        }

        const status = await StatusAlertaPorId(uidUsuario, carroId, alertaId);

        return {
          ...alerta,
          dataUltimaTroca: new Date(alerta.dataUltimaTroca.seconds * 1000).toISOString(),
          status: 'erro' in status ? null : status.status,
          kmRestante: 'erro' in status ? null : status.kmRestante,
          mesesRestantes: 'erro' in status ? null : status.mesesRestantes,
        };
      } catch (error) {
        console.error('Erro ao processar alerta:', alerta, error);
        return {
          ...alerta,
          dataUltimaTroca: new Date(alerta.dataUltimaTroca.seconds * 1000).toISOString(),
          status: null,
          kmRestante: null,
          mesesRestantes: null,
          erro: 'Erro ao calcular status'
        };
      }
    }));

    return res.status(200).json({ sucesso: true, alertas: alertasComStatus });
  } catch (error) {
    console.error('Erro ao listar alertas com status:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao listar alertas com status.',
    });
  }
};

export default {
  criarAlerta,
  atualizarDataAlerta,
  removerAlerta,
  obterStatusAlerta,
  obterPecasDisponiveis,
  listarAlertasDoCarro,
  obterAlertaPorId,
  listarAlertasComStatus,
};
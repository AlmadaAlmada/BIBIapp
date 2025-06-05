import { Request, Response } from 'express';
import { cadastrarUsuario, fazerLogin } from '../autenticacao/autenticacaoServico';

// ✅ Definição opcional da estrutura de resposta (se desejar usar tipagem mais forte)
interface Resultado {
  sucesso: boolean;
  mensagem: string;
  [key: string]: any;
}

const criarUsuario = async (req: Request, res: Response) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  if (!nome || !email || !senha || !confirmarSenha) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios.',
    });
  }

  try {
    const resultado: Resultado = await cadastrarUsuario(
      nome,
      email,
      senha,
      confirmarSenha
    );

    if (resultado.sucesso) {
      return res.status(201).json(resultado);
    } else {
      return res.status(400).json(resultado);
    }
  } catch (error) {
    console.error('Erro no controller de cadastro:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha, lembrarDeMim } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Email e senha são obrigatórios.',
    });
  }

  try {
    const resultado: Resultado = await fazerLogin(email, senha, lembrarDeMim);

    if (resultado.sucesso) {
      return res.status(200).json(resultado);
    } else {
      return res.status(400).json(resultado);
    }
  } catch (error) {
    console.error('Erro no controller de login:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

export default {
  criarUsuario,
  loginUsuario,
};

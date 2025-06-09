import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, signOut } from "firebase/auth";
import { salvarUsuario } from "../usuarios/usuarioServico";
import { traduzirErroFirebase } from "./errosAutenticacao";
import { log } from "console";
import { 
  updateEmail, 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from "firebase/auth";

interface ResultadoAutenticacao {
  sucesso: boolean;
  mensagem: string;
  token?: string;
  uid?: string;
}

export interface ResultadoLogout {
  sucesso: boolean;
  mensagem: string;
}

interface DadosAtualizacao {
  emailAtual: string;
  senhaAtual: string;
  novoEmail?: string;
  novaSenha?: string;
}

interface ResultadoAtualizacao {
  sucesso: boolean;
  mensagem: string;
  novoToken?: string;
  uid?: string;
}

export async function cadastrarUsuario(nome: string, email: string, senha: string, confirmarSenha: string): Promise<ResultadoAutenticacao> {
  if (!nome || !email || !senha || !confirmarSenha) {
    return { sucesso: false, mensagem: "Todos os campos são obrigatórios." };
  }
  if (senha !== confirmarSenha) {
    return { sucesso: false, mensagem: "As senhas não coincidem." };
  }
  try {
    const usuarioCred = await createUserWithEmailAndPassword(auth, email, senha);
    await salvarUsuario(usuarioCred.user.uid, nome, email);
    return { sucesso: true, mensagem: "Usuário cadastrado com sucesso." };
  } catch (erro: any) {
    console.error("Erro detalhado do Firebase:", erro);
    return { sucesso: false, mensagem: traduzirErroFirebase(erro.code) };
  }
}

export async function fazerLogin(email: string, senha: string, lembrarDeMim: boolean): Promise<ResultadoAutenticacao> {
   if (!email || !senha) {
    return { sucesso: false, mensagem: "Email e senha são obrigatórios." };
  }

  try {
    await setPersistence(auth, lembrarDeMim ? browserLocalPersistence : browserSessionPersistence);
    const usuarioCred = await signInWithEmailAndPassword(auth, email, senha);

    const token = await usuarioCred.user.getIdToken();
    const uid = usuarioCred.user.uid;
    
    return { 
      sucesso: true, 
      mensagem: "sucesso ao realizar login.", 
      token: token, 
      uid: uid, 
    };

  } catch (erro: any) {
    return { sucesso: false, mensagem: traduzirErroFirebase(erro.code) };
  }
}

export async function fazerLogout(token?: string): Promise<ResultadoLogout> {
  try {
    await signOut(auth);
    return { 
      sucesso: true, 
      mensagem: "Logout realizado com sucesso." 
    };
  } catch (erro: any) {
    console.error("Erro ao fazer logout:", erro);
    return { 
      sucesso: false, 
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao realizar logout." 
    };
  }
}

export async function atualizarCadastroUsuario(dados: DadosAtualizacao): Promise<ResultadoAtualizacao> {
  const { emailAtual, senhaAtual, novoEmail, novaSenha } = dados;

  try {
    const usuarioCred = await signInWithEmailAndPassword(auth, emailAtual, senhaAtual);
    const usuario = usuarioCred.user;

    const credential = EmailAuthProvider.credential(emailAtual, senhaAtual);
    
    await reauthenticateWithCredential(usuario, credential);

    if (novoEmail && novoEmail !== emailAtual) {
      await updateEmail(usuario, novoEmail);
    }

    if (novaSenha && novaSenha !== senhaAtual) {
      await updatePassword(usuario, novaSenha);
    }

    const novoToken = await usuario.getIdToken(true); 
    const uid = usuario.uid;

    let mensagem = "Dados atualizados com sucesso.";
    if (novoEmail && novaSenha) {
      mensagem = "Email e senha atualizados com sucesso.";
    } else if (novoEmail) {
      mensagem = "Email atualizado com sucesso.";
    } else if (novaSenha) {
      mensagem = "Senha atualizada com sucesso.";
    }

    return { 
      sucesso: true, 
      mensagem,
      novoToken,
      uid
    };

  } catch (error: any) {
    console.error("Erro ao atualizar usuário:", error);
    
    if (error.code === 'auth/wrong-password') {
      return { sucesso: false, mensagem: "Senha atual incorreta." };
    }
    if (error.code === 'auth/user-not-found') {
      return { sucesso: false, mensagem: "Usuário não encontrado." };
    }
    if (error.code === 'auth/email-already-in-use') {
      return { sucesso: false, mensagem: "Este email já está em uso por outro usuário." };
    }
    if (error.code === 'auth/invalid-email') {
      return { sucesso: false, mensagem: "Email inválido." };
    }
    if (error.code === 'auth/weak-password') {
      return { sucesso: false, mensagem: "A nova senha deve ter pelo menos 6 caracteres." };
    }
    
    return { 
      sucesso: false, 
      mensagem: traduzirErroFirebase(error.code) || "Erro ao atualizar dados do usuário." 
    };
  }
}
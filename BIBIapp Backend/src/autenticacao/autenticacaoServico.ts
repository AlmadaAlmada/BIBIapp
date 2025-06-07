import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { salvarUsuario } from "../usuarios/usuarioServico";
import { traduzirErroFirebase } from "./errosAutenticacao";
import { log } from "console";


interface ResultadoAutenticacao {
  sucesso: boolean;
  mensagem: string;
  token?: string;
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

import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, doc, deleteDoc, collectionGroup} from "firebase/firestore";
import { traduzirErroFirebase } from "../autenticacao/errosAutenticacao";

export interface NovoPost {
  autorId: string;
  autorNome: string;
  texto: string;
}

export interface NovoComentario {
  autorId: string;
  autorNome: string;
  texto: string;
}

interface ResultadoPost {
  sucesso: boolean;
  mensagem: string;
  post?: any;
}

interface ResultadoComentario {
  sucesso: boolean;
  mensagem: string;
  comentario?: any;
}

interface ResultadoListagem {
  sucesso: boolean;
  mensagem: string;
  dados?: any[];
}

interface ResultadoOperacao {
  sucesso: boolean;
  mensagem: string;
}

export async function criarPost({ autorId, autorNome, texto }: NovoPost): Promise<ResultadoPost> {
  if (!autorId || !autorNome || !texto) {
    return { sucesso: false, mensagem: "Todos os campos são obrigatórios." };
  }

  try {
    const keywords = texto.toLowerCase().split(/\s+/).filter(Boolean);

    const post = {
      autorId,
      autorNome,
      texto,
      createdAt: serverTimestamp(),
      keywords,
    };

    const docRef = await addDoc(collection(db, "usuarios", autorId, "posts"), post);

    return {
      sucesso: true,
      mensagem: "Post criado com sucesso.",
      post: { id: docRef.id, ...post }
    };
  } catch (erro: any) {
    console.error("Erro ao criar post:", erro);
    return {
      sucesso: false,
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao criar post."
    };
  }
}

export async function listarPosts(userId: string, busca?: string): Promise<ResultadoListagem> {
  if (!userId) {
    return { sucesso: false, mensagem: "ID do usuário é obrigatório para listar posts." };
  }

  try {
    let q;
    const postsCollectionRef = collection(db, "usuarios", userId, "posts");

    if (busca) {
      q = query(
        postsCollectionRef,
        where("keywords", "array-contains", busca.toLowerCase()),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(postsCollectionRef, orderBy("createdAt", "desc"));
    }

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
      sucesso: true,
      mensagem: posts.length > 0 ? "Posts listados com sucesso." : "Nenhum post encontrado.",
      dados: posts
    };
  } catch (erro: any) {
    console.error("Erro ao listar posts:", erro);
    return {
      sucesso: false,
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao listar posts."
    };
  }
}

export async function comentar(postAutorId: string, postId: string, { autorId, autorNome, texto }: NovoComentario): Promise<ResultadoComentario> {
  if (!postAutorId || !postId || !autorId || !autorNome || !texto) {
    return { sucesso: false, mensagem: "Todos os campos são obrigatórios para comentar." };
  }

  try {
    const comment = {
      autorId,
      autorNome,
      texto,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "usuarios", postAutorId, "posts", postId, "comments"), comment);

    return {
      sucesso: true,
      mensagem: "Comentário criado com sucesso.",
      comentario: { id: docRef.id, ...comment }
    };
  } catch (erro: any) {
    console.error("Erro ao comentar:", erro);
    return {
      sucesso: false,
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao criar comentário."
    };
  }
}

export async function listarComentarios(postAutorId: string, postId: string): Promise<ResultadoListagem> {
  if (!postAutorId || !postId) {
    return { sucesso: false, mensagem: "ID do autor do post e ID do post são obrigatórios." };
  }

  try {
    const commentsCollectionRef = collection(db, "usuarios", postAutorId, "posts", postId, "comments");
    const q = query(commentsCollectionRef, orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
      sucesso: true,
      mensagem: comments.length > 0 ? "Comentários listados com sucesso." : "Nenhum comentário encontrado.",
      dados: comments
    };
  } catch (erro: any) {
    console.error("Erro ao listar comentários:", erro);
    return {
      sucesso: false,
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao listar comentários."
    };
  }
}

export async function excluirPost(userId: string, postId: string): Promise<ResultadoOperacao> {
  if (!userId || !postId) {
    return { sucesso: false, mensagem: "ID do usuário e ID do post são obrigatórios." };
  }

  try {
    await deleteDoc(doc(db, "usuarios", userId, "posts", postId));

    return {
      sucesso: true,
      mensagem: "Post excluído com sucesso."
    };
  } catch (erro: any) {
    console.error("Erro ao excluir post:", erro);
    return {
      sucesso: false,
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao excluir post."
    };
  }
}

export async function listarTodosPosts(): Promise<ResultadoListagem> {
  try {
    const q = query(
      collectionGroup(db, 'posts'),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
      sucesso: true,
      mensagem: posts.length > 0 ? "Todos os posts listados com sucesso." : "Nenhum post encontrado.",
      dados: posts
    };
  } catch (erro: any) {
    console.error("Erro ao listar todos os posts:", erro);
    return {
      sucesso: false,
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao listar todos os posts."
    };
  }
}

export async function pesquisarPostsPorPalavraChave(busca: string): Promise<ResultadoListagem> {
  if (!busca) {
    return { sucesso: false, mensagem: "O termo de busca é obrigatório." };
  }
  try {
    const q = query(
      collectionGroup(db, 'posts'),
      where("keywords", "array-contains", busca.toLowerCase()),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
      sucesso: true,
      mensagem: posts.length > 0 ? "Posts encontrados com sucesso." : "Nenhum post encontrado para o termo de busca.",
      dados: posts
    };
  } catch (erro: any) {
    console.error("Erro ao pesquisar posts por palavra-chave:", erro);
    return {
      sucesso: false,
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao pesquisar posts por palavra-chave."
    };
  }
}

export async function excluirComentario(postAutorId: string, postId: string, commentId: string): Promise<ResultadoOperacao> {
  if (!postAutorId || !postId || !commentId) {
    return { sucesso: false, mensagem: "ID do autor do post, ID do post e ID do comentário são obrigatórios." };
  }

  try {
    await deleteDoc(doc(db, "usuarios", postAutorId, "posts", postId, "comments", commentId));

    return {
      sucesso: true,
      mensagem: "Comentário excluído com sucesso."
    };
  } catch (erro: any) {
    console.error("Erro ao excluir comentário:", erro);
    return {
      sucesso: false,
      mensagem: traduzirErroFirebase(erro.code) || "Erro ao excluir comentário."
    };
  }
}
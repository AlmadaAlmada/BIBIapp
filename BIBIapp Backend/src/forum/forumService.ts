import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export interface NovoPost {
  autorId: string;
  autorNome: string;
  texto: string;
  fotoUrl?: string;
}

export interface NovoComentario {
  autorId: string;
  autorNome: string;
  texto: string;
}

export async function criarPost({ autorId, autorNome, texto, fotoUrl }: NovoPost) {
  const keywords = texto.toLowerCase().split(/\s+/);
  const post = {
    autorId,
    autorNome,
    texto,
    fotoUrl: fotoUrl || null,
    createdAt: serverTimestamp(),
    keywords,
  };
  const docRef = await addDoc(collection(db, "posts"), post);
  return { id: docRef.id, ...post };
}

export async function listarPosts(busca?: string) {
  let q;
  if (busca) {
    q = query(
      collection(db, "posts"),
      where("keywords", "array-contains", busca.toLowerCase()),
      orderBy("createdAt", "desc")
    );
  } else {
    q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function comentar(postId: string, { autorId, autorNome, texto }: NovoComentario) {
  const comment = {
    autorId,
    autorNome,
    texto,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, "posts", postId, "comments"), comment);
  return { id: docRef.id, ...comment };
}

export async function listarComentarios(postId: string) {
  const q = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
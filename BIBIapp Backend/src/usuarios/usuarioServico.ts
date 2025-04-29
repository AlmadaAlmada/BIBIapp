import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function salvarUsuario(uid: string, nome: string, email: string) {
  await setDoc(doc(db, "usuarios", uid), {
    nome,
    email,
    criadoEm: new Date()
  });
}
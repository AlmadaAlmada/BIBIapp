"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPost = criarPost;
exports.excluirPost = excluirPost;
exports.excluirComentario = excluirComentario;
exports.listarPosts = listarPosts;
exports.comentar = comentar;
exports.listarComentarios = listarComentarios;
const firebaseConfig_1 = require("../firebase/firebaseConfig");
const firestore_1 = require("firebase/firestore");
async function criarPost({ autorId, autorNome, texto, fotoUrl }) {
    const keywords = texto.toLowerCase().split(/\s+/);
    const post = {
        autorId,
        autorNome,
        texto,
        fotoUrl: fotoUrl || null,
        createdAt: (0, firestore_1.serverTimestamp)(),
        keywords,
    };
    const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebaseConfig_1.db, "posts"), post);
    return { id: docRef.id, ...post };
}
async function excluirPost(postId) {
    await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebaseConfig_1.db, "posts", postId));
}
async function excluirComentario(postId, commentId) {
    await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebaseConfig_1.db, "posts", postId, "comments", commentId));
}
async function listarPosts(busca) {
    let q;
    if (busca) {
        q = (0, firestore_1.query)((0, firestore_1.collection)(firebaseConfig_1.db, "posts"), (0, firestore_1.where)("keywords", "array-contains", busca.toLowerCase()), (0, firestore_1.orderBy)("createdAt", "desc"));
    }
    else {
        q = (0, firestore_1.query)((0, firestore_1.collection)(firebaseConfig_1.db, "posts"), (0, firestore_1.orderBy)("createdAt", "desc"));
    }
    const snapshot = await (0, firestore_1.getDocs)(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
async function comentar(postId, { autorId, autorNome, texto }) {
    const comment = {
        autorId,
        autorNome,
        texto,
        createdAt: (0, firestore_1.serverTimestamp)(),
    };
    const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebaseConfig_1.db, "posts", postId, "comments"), comment);
    return { id: docRef.id, ...comment };
}
async function listarComentarios(postId) {
    const q = (0, firestore_1.query)((0, firestore_1.collection)(firebaseConfig_1.db, "posts", postId, "comments"), (0, firestore_1.orderBy)("createdAt", "asc"));
    const snapshot = await (0, firestore_1.getDocs)(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export type Professor = {
  id?: string;
  nome: string;
  telefone: string;
  senha: string;
  ativo: boolean;
};

const colecao = collection(db, "professores");

// LISTAR
export async function listarProfessores() {
  const q = query(colecao, orderBy("nome"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Professor, "id">),
  }));
}

// CRIAR
export async function criarProfessor(professor: Professor) {
  await addDoc(colecao, professor);
}

// EDITAR
export async function editarProfessor(
  id: string,
  professor: Professor
) {
  await updateDoc(doc(db, "professores", id), {
    nome: professor.nome,
    telefone: professor.telefone,
    senha: professor.senha,
    ativo: professor.ativo,
  });
}

// EXCLUIR
export async function excluirProfessor(id: string) {
  await deleteDoc(doc(db, "professores", id));
}

// LOGIN
export async function loginProfessor(
  telefone: string,
  senha: string
) {
  const q = query(
    colecao,
    where("telefone", "==", telefone),
    where("senha", "==", senha),
    where("ativo", "==", true)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...(snapshot.docs[0].data() as Omit<Professor, "id">),
  };
}
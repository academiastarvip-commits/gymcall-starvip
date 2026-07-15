import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export type Aparelho = {
  id?: string;
  numero: number;
  nome: string;
  ativo: boolean;
};

const colecao = collection(db, "aparelhos");

// Listar aparelhos
export async function listarAparelhos() {
  const q = query(colecao, orderBy("numero"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Aparelho, "id">),
  }));
}

// Criar aparelho
export async function criarAparelho(aparelho: Aparelho) {
  await addDoc(colecao, {
    numero: aparelho.numero,
    nome: aparelho.nome,
    ativo: aparelho.ativo,
  });
}

// Editar aparelho
export async function editarAparelho(
  id: string,
  aparelho: Aparelho
) {
  await updateDoc(doc(db, "aparelhos", id), {
    numero: aparelho.numero,
    nome: aparelho.nome,
    ativo: aparelho.ativo,
  });
}

// Excluir aparelho
export async function excluirAparelho(id: string) {
  await deleteDoc(doc(db, "aparelhos", id));
}
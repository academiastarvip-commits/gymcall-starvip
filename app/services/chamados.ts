import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

// Criar chamado
export async function criarChamado(
  numero: number,
  nome: string
) {
  return await addDoc(collection(db, "chamados"), {
    numero,
    nome,
    status: "aguardando",
    criadoEm: serverTimestamp(),

    professor: null,
    atendidoEm: null,
    finalizadoEm: null,
  });
}

// Atender chamado
export async function atenderChamado(
  id: string,
  professor: string
) {
  await updateDoc(doc(db, "chamados", id), {
    status: "atendendo",
    professor,
    atendidoEm: serverTimestamp(),
  });
}

// Finalizar chamado
export async function finalizarChamado(id: string) {
  await updateDoc(doc(db, "chamados", id), {
    status: "finalizado",
    finalizadoEm: serverTimestamp(),
  });
}
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export async function criarChamado(numero: number, nome: string) {
  return await addDoc(collection(db, "chamados"), {
    numero,
    nome,
    status: "aguardando",
    criadoEm: serverTimestamp(),
  });
}

export async function atenderChamado(id: string) {
  await updateDoc(doc(db, "chamados", id), {
    status: "atendendo",
  });
}

export async function finalizarChamado(id: string) {
  await updateDoc(doc(db, "chamados", id), {
    status: "finalizado",
  });
}
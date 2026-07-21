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
  const chamado = await addDoc(collection(db, "chamados"), {
    numero,
    nome,
    status: "aguardando",
    criadoEm: serverTimestamp(),

    professor: null,
    atendidoEm: null,
    finalizadoEm: null,
  });

  // Envia notificação
  try {
    await fetch("/api/notificacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: "🔔 Novo chamado",
        mensagem: `${nome} chamou no aparelho ${numero}`,
      }),
    });
  } catch (erro) {
    console.error("Erro ao enviar notificação:", erro);
  }

  return chamado;
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
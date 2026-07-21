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
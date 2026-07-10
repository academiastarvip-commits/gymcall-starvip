"use client";

import { useMemo } from "react";
import { Timestamp } from "firebase/firestore";

type Chamado = {
  id: string;
  numero: number;
  nome: string;
  status: string;
  criadoEm?: Timestamp;
};

type Props = {
  chamado: Chamado;
  onAtender: (id: string) => void;
  onFinalizar: (id: string) => void;
};

export default function CardChamado({
  chamado,
  onAtender,
  onFinalizar,
}: Props) {
  const tempo = useMemo(() => {
    if (!chamado.criadoEm) return "Agora";

    const criadoEm = chamado.criadoEm.toDate().getTime();
    const agora = Date.now();

    const minutos = Math.floor((agora - criadoEm) / 60000);

    if (minutos <= 0) return "Agora";
    if (minutos === 1) return "1 minuto";

    return `${minutos} minutos`;
  }, [chamado.criadoEm]);

  const cor =
    chamado.status === "aguardando"
      ? "#dc2626"
      : chamado.status === "atendendo"
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "20px",
        padding: "22px",
        marginBottom: "18px",
        borderLeft: `8px solid ${cor}`,
        boxShadow: "0 8px 25px rgba(0,0,0,.25)",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "28px",
          color: "#fff",
        }}
      >
        {chamado.nome}
      </h2>

      <p
        style={{
          color: "#cbd5e1",
          marginTop: "10px",
          marginBottom: "6px",
        }}
      >
        🏋️ Aparelho {chamado.numero}
      </p>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "18px",
        }}
      >
        ⏱ {tempo}
      </p>

      <div
        style={{
          display: "inline-block",
          padding: "8px 16px",
          borderRadius: "999px",
          background: cor,
          color: "#fff",
          fontWeight: "bold",
          marginBottom: "18px",
        }}
      >
        {chamado.status.toUpperCase()}
      </div>

      {chamado.status === "aguardando" && (
        <button
          onClick={() => onAtender(chamado.id)}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "14px",
            background: "#f59e0b",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          🚶 Iniciar Atendimento
        </button>
      )}

      {chamado.status === "atendendo" && (
        <button
          onClick={() => onFinalizar(chamado.id)}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "14px",
            background: "#22c55e",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✅ Finalizar Atendimento
        </button>
      )}

      {chamado.status === "finalizado" && (
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "#14532d",
            color: "#bbf7d0",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ✔ Atendimento concluído
        </div>
      )}
    </div>
  );
}
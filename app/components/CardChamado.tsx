"use client";

import { useEffect, useMemo, useState } from "react";
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
  onAtender: (id: string, professor: string) => void;
  onFinalizar: (id: string) => void;
  professor: string;
};

export default function CardChamado({
  chamado,
  onAtender,
  onFinalizar,
  professor,
}: Props) {
  const [novo, setNovo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNovo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
        borderRadius: 20,
        padding: 22,
        marginBottom: 18,
        borderLeft: `8px solid ${cor}`,
        boxShadow: novo
          ? "0 0 25px rgba(200,16,46,.7)"
          : "0 8px 25px rgba(0,0,0,.25)",
        transform: novo
          ? "translateY(-12px) scale(1.02)"
          : "translateY(0) scale(1)",
        transition: "all .45s ease",
      }}
    >
      {novo && chamado.status === "aguardando" && (
        <div
          style={{
            display: "inline-block",
            marginBottom: 14,
            padding: "6px 12px",
            borderRadius: 999,
            background: "#C8102E",
            color: "#FFF",
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          🔴 NOVO CHAMADO
        </div>
      )}

      <h2
        style={{
          margin: 0,
          fontSize: 28,
          color: "#fff",
        }}
      >
        {chamado.nome}
      </h2>

      <p
        style={{
          color: "#cbd5e1",
          marginTop: 10,
          marginBottom: 6,
        }}
      >
        🏋️ Aparelho {chamado.numero}
      </p>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: 18,
        }}
      >
        ⏱ {tempo}
      </p>

      <div
        style={{
          display: "inline-block",
          padding: "8px 16px",
          borderRadius: 999,
          background: cor,
          color: "#FFF",
          fontWeight: "bold",
          marginBottom: 18,
        }}
      >
        {chamado.status.toUpperCase()}
      </div>

      {chamado.status === "aguardando" && (
        <button
          onClick={() => onAtender(chamado.id, professor)}
          style={{
            width: "100%",
            padding: 15,
            border: "none",
            borderRadius: 14,
            background: "#f59e0b",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: 18,
            cursor: "pointer",
            transition: ".2s",
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
            padding: 15,
            border: "none",
            borderRadius: 14,
            background: "#22c55e",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ✅ Finalizar Atendimento
        </button>
      )}

      {chamado.status === "finalizado" && (
        <div
          style={{
            padding: 14,
            borderRadius: 14,
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
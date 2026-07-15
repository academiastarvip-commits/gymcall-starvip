"use client";

import { useEffect } from "react";

type Props = {
  visivel: boolean;
  titulo: string;
  mensagem: string;
  onFechar: () => void;
};

export default function Toast({
  visivel,
  titulo,
  mensagem,
  onFechar,
}: Props) {
  useEffect(() => {
    if (!visivel) return;

    const timer = setTimeout(() => {
      onFechar();
    }, 4000);

    return () => clearTimeout(timer);
  }, [visivel, onFechar]);

  return (
    <div
      style={{
        position: "fixed",
        top: 25,
        right: 25,
        width: 340,
        background: "#18181B",
        borderLeft: "6px solid #C8102E",
        borderRadius: 18,
        padding: 20,
        color: "#FFF",
        boxShadow: "0 20px 40px rgba(0,0,0,.45)",
        transform: visivel
          ? "translateX(0)"
          : "translateX(420px)",
        opacity: visivel ? 1 : 0,
        transition: "all .35s ease",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        🔔 {titulo}
      </div>

      <div
        style={{
          color: "#D4D4D8",
          fontSize: 15,
          lineHeight: 1.5,
        }}
      >
        {mensagem}
      </div>
    </div>
  );
}
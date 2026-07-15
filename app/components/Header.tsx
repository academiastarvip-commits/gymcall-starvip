"use client";

import Image from "next/image";

type Props = {
  onSair: () => void;
  nomeProfessor?: string;
};

export default function Header({
  onSair,
  nomeProfessor,
}: Props) {
  return (
    <header
      style={{
        background: "#18181B",
        border: "1px solid #2A2A2F",
        borderRadius: "20px",
        padding: "18px 25px",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <Image
          src="/logo-starvip.png"
          alt="Star Vip"
          width={120}
          height={40}
          style={{
            width: "120px",
            height: "auto",
          }}
        />

        <div>
          <h2
            style={{
              color: "#FFF",
              margin: 0,
              fontSize: "24px",
            }}
          >
            GymCall
          </h2>

          <p
            style={{
              color: "#9CA3AF",
              margin: 0,
              fontSize: "14px",
            }}
          >
            Painel do Professor
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              color: "#FFF",
              fontWeight: "bold",
            }}
          >
            {nomeProfessor || "Professor"}
          </div>

          <div
            style={{
              color: "#9CA3AF",
              fontSize: 13,
            }}
          >
            Online
          </div>
        </div>

        <button
          onClick={onSair}
          style={{
            background: "#C8102E",
            color: "#FFF",
            border: "none",
            borderRadius: "12px",
            padding: "12px 20px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🚪 Sair
        </button>
      </div>
    </header>
  );
}
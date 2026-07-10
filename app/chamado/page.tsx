"use client";

import { useRouter } from "next/navigation";

export default function Chamado() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "25px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "90px",
            marginBottom: "20px",
          }}
        >
          ✅
        </div>

        <h1
          style={{
            fontSize: "34px",
            marginBottom: "20px",
          }}
        >
          Professor chamado!
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "28px",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Seu chamado foi enviado com sucesso.
          <br />
          Aguarde um professor da Star Vip chegar até você.
        </p>

        <button
          onClick={() => router.push("/")}
          style={{
            width: "100%",
            height: "60px",
            border: "none",
            borderRadius: "16px",
            background: "#C8102E",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          VOLTAR AO INÍCO
        </button>
      </div>
    </main>
  );
}
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { aparelhos } from "../data/aparelhos";
import { criarChamado } from "../services/chamados";

function ConfirmacaoContent() {
  const router = useRouter();
  const params = useSearchParams();

  const numero = Number(params.get("numero"));
  const aparelho = aparelhos.find((a) => a.numero === numero);

  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function confirmar() {
    if (!nome.trim()) {
      alert("Digite seu nome.");
      return;
    }

    setCarregando(true);

    await criarChamado(numero, nome);

    router.push("/chamado");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "white",
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
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Confirmar Chamado
        </h1>

        <div
          style={{
            background: "#1f2937",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "25px",
          }}
        >
          <h2>Aparelho {numero}</h2>

          <p>{aparelho?.nome ?? "Aparelho não encontrado"}</p>
        </div>

        <input
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            width: "100%",
            height: "58px",
            borderRadius: "14px",
            border: "none",
            padding: "15px",
            marginBottom: "20px",
            fontSize: "18px",
          }}
        />

        <button
          onClick={confirmar}
          disabled={carregando}
          style={{
            width: "100%",
            height: "60px",
            background: "#C8102E",
            color: "white",
            border: "none",
            borderRadius: "16px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {carregando ? "Enviando..." : "CHAMAR PROFESSOR"}
        </button>
      </div>
    </main>
  );
}export default function Confirmacao() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: "100vh",
            background: "#111111",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Arial",
          }}
        >
          Carregando...
        </main>
      }
    >
      <ConfirmacaoContent />
    </Suspense>
  );
}
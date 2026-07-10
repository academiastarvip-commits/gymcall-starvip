"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type BotaoProps = {
  texto: string;
  onClick: () => void;
  cor?: string;
};

function Botao({
  texto,
  onClick,
  cor = "#1f2937",
}: BotaoProps) {
  return (
    <button
      onClick={onClick}
      style={{
        height: "78px",
        border: "none",
        borderRadius: "18px",
        background: cor,
        color: "white",
        fontSize: "28px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {texto}
    </button>
  );
}

export default function Aluno() {
  const router = useRouter();
  const [numero, setNumero] = useState("");

  function adicionarNumero(valor: string) {
    if (numero.length >= 3) return;
    setNumero((n) => n + valor);
  }

  function apagar() {
    setNumero((n) => n.slice(0, -1));
  }

  function continuar() {
    if (!numero) return;

    router.push(`/confirmacao?numero=${numero}`);
  }

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
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "44px",
            marginBottom: "10px",
          }}
        >
          GymCall
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#bdbdbd",
            marginBottom: "25px",
          }}
        >
          Digite o número do aparelho
        </p>

        <div
          style={{
            height: "90px",
            borderRadius: "18px",
            background: "#1f2937",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "48px",
            fontWeight: "bold",
            border: "2px solid #C8102E",
            marginBottom: "25px",
          }}
        >
          {numero || "_"}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "12px",
          }}
        >
          <Botao texto="7" onClick={() => adicionarNumero("7")} />
          <Botao texto="8" onClick={() => adicionarNumero("8")} />
          <Botao texto="9" onClick={() => adicionarNumero("9")} />

          <Botao texto="4" onClick={() => adicionarNumero("4")} />
          <Botao texto="5" onClick={() => adicionarNumero("5")} />
          <Botao texto="6" onClick={() => adicionarNumero("6")} />

          <Botao texto="1" onClick={() => adicionarNumero("1")} />
          <Botao texto="2" onClick={() => adicionarNumero("2")} />
          <Botao texto="3" onClick={() => adicionarNumero("3")} />

          <Botao texto="⌫" onClick={apagar} cor="#991B1B" />
          <Botao texto="0" onClick={() => adicionarNumero("0")} />
          <Botao texto="✔" onClick={continuar} cor="#16A34A" />
        </div>

        <button
          onClick={continuar}
          disabled={!numero}
          style={{
            width: "100%",
            height: "65px",
            marginTop: "25px",
            border: "none",
            borderRadius: "18px",
            background: numero ? "#C8102E" : "#555",
            color: "#fff",
            fontSize: "22px",
            fontWeight: "bold",
            cursor: numero ? "pointer" : "not-allowed",
          }}
        >
          CONTINUAR
        </button>
      </div>
    </main>
  );
}
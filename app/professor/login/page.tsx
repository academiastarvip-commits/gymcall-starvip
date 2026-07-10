"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginProfessor() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (usuario === "professor" && senha === "123456") {
      localStorage.setItem("gymcall-logado", "true");
      router.push("/professor");
      return;
    }

    alert("Usuário ou senha inválidos.");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#1b1b1b",
          borderRadius: 24,
          padding: 35,
          border: "1px solid #2A2A2F",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Login do Professor
        </h1>

        <p
          style={{
            color: "#999",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Entre para acessar os chamados.
        </p>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{
            width: "100%",
            padding: 15,
            marginBottom: 15,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#222",
            color: "white",
            fontSize: 16,
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: "100%",
            padding: 15,
            marginBottom: 25,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#222",
            color: "white",
            fontSize: 16,
          }}
        />

        <button
          onClick={entrar}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 14,
            border: "none",
            background: "#C8102E",
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ENTRAR
        </button>
      </div>
    </main>
  );
}
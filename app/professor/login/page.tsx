"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginProfessor } from "../../services/professores";

export default function LoginProfessor() {
  const router = useRouter();

  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!telefone || !senha) {
      alert("Preencha telefone e senha.");
      return;
    }

    setCarregando(true);

    try {
      const professor = await loginProfessor(telefone, senha);

      if (!professor) {
        alert("Telefone ou senha inválidos.");
        setCarregando(false);
        return;
      }

      localStorage.setItem("gymcall-logado", "true");
      localStorage.setItem(
        "gymcall-professor",
        JSON.stringify(professor)
      );

      router.push("/professor");
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar login.");
    } finally {
      setCarregando(false);
    }
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
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
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
          disabled={carregando}
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
            opacity: carregando ? 0.7 : 1,
          }}
        >
          {carregando ? "Entrando..." : "ENTRAR"}
        </button>
      </div>
    </main>
  );
}
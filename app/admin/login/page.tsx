"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginAdmin() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  function entrar() {
    setCarregando(true);

    setTimeout(() => {
      if (usuario === "admin" && senha === "123456") {
        localStorage.setItem("gymcall-admin", "true");
        router.replace("/admin");
        return;
      }

      alert("Usuário ou senha inválidos.");
      setCarregando(false);
    }, 500);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top,#4d0915 0%,#111111 35%,#090909 100%)",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          background: "#18181B",
          borderRadius: 28,
          padding: 40,
          border: "1px solid #2A2A2F",
          boxShadow: "0 20px 60px rgba(0,0,0,.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Image
            src="/logo-starvip.png"
            alt="Star Vip"
            width={220}
            height={80}
          />
        </div>

        <h1
          style={{
            color: "#FFF",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Painel Administrativo
        </h1>

        <p
          style={{
            color: "#A1A1AA",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Faça login para continuar.
        </p>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={input}
        />

        <button
          onClick={entrar}
          style={botao}
        >
          {carregando ? "Entrando..." : "ENTRAR"}
        </button>
      </div>
    </main>
  );
}

const input = {
  width: "100%",
  padding: "15px",
  marginBottom: 18,
  borderRadius: 12,
  border: "1px solid #333",
  background: "#111",
  color: "#FFF",
  fontSize: 16,
  boxSizing: "border-box" as const,
};

const botao = {
  width: "100%",
  padding: "16px",
  borderRadius: 14,
  border: "none",
  background: "#C8102E",
  color: "#FFF",
  fontSize: 18,
  fontWeight: "bold" as const,
  cursor: "pointer",
};
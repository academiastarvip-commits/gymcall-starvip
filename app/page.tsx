"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Botao from "./components/Botao";

export default function Home() {
  const router = useRouter();

  

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
          maxWidth: 460,
          background: "#18181B",
          borderRadius: 30,
          padding: "45px 35px",
          border: "1px solid #2d2d33",
          boxShadow: "0 25px 60px rgba(0,0,0,.6)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 35,
          }}
        >
          <Image
            src="/logo-starvip.png"
            alt="Star Vip"
            width={260}
            height={90}
            priority
            style={{
              width: "260px",
              height: "auto",
            }}
          />
        </div>

        <h1
          style={{
            color: "#FFF",
            fontSize: 56,
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          GymCall
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#B3B3B3",
            fontSize: 18,
            lineHeight: "30px",
            marginBottom: 40,
          }}
        >
          Chame um professor rapidamente
          <br />
          durante o seu treino.
        </p>

        <Botao
          texto="👤 SOU ALUNO"
          onClick={() => router.push("/aluno")}
        />

        <div style={{ height: 18 }} />

        <button
          onClick={() => router.push("/professor/login")}
          style={{
            width: "100%",
            height: 60,
            borderRadius: 18,
            border: "2px solid #C8102E",
            background: "transparent",
            color: "#FFF",
            fontSize: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          👨‍🏫 SOU PROFESSOR
        </button>

        <div
          style={{
            height: 1,
            background: "#2d2d33",
            margin: "28px 0",
          }}
        />

        <button
          onClick={() => router.push("/admin")}
          style={{
            width: "100%",
            height: 55,
            borderRadius: 16,
            border: "1px solid #3F3F46",
            background: "#27272A",
            color: "#FFF",
            fontSize: 17,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ⚙️ PAINEL ADMINISTRATIVO
        </button>

        <div
          style={{
            marginTop: 35,
            textAlign: "center",
            color: "#777",
            fontSize: 14,
          }}
        >
          Star Vip Academia
        </div>
      </div>
    </main>
  );
}
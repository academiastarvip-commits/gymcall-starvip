"use client";

import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#FFF",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        ⚙️ Painel Administrativo
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "40px",
        }}
      >
        GymCall • Star Vip
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Botao
          titulo="👨‍🏫 Professores"
          descricao="Cadastrar e editar professores"
          onClick={() => router.push("/admin/professores")}
        />

        <Botao
          titulo="🏋️ Aparelhos"
          descricao="Cadastrar aparelhos"
          onClick={() => router.push("/admin/aparelhos")}
        />

        <Botao
          titulo="📊 Relatórios"
          descricao="Visualizar estatísticas"
          onClick={() => router.push("/admin/relatorios")}
        />

        <Botao
          titulo="⚙️ Configurações"
          descricao="Personalizar o sistema"
          onClick={() => router.push("/admin/configuracoes")}
        />
      </div>
    </main>
  );
}

type BotaoProps = {
  titulo: string;
  descricao: string;
  onClick: () => void;
};

function Botao({ titulo, descricao, onClick }: BotaoProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#1e293b",
        color: "white",
        border: "1px solid #334155",
        borderRadius: "20px",
        padding: "30px",
        cursor: "pointer",
        textAlign: "left",
        transition: "0.2s",
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: "10px",
          fontSize: "24px",
        }}
      >
        {titulo}
      </h2>

      <p
        style={{
          margin: 0,
          color: "#94a3b8",
        }}
      >
        {descricao}
      </p>
    </button>
  );
}
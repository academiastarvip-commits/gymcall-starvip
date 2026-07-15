"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const itens = [
  {
    titulo: "Dashboard",
    rota: "/admin",
    icone: "📊",
  },
  {
    titulo: "Professores",
    rota: "/admin/professores",
    icone: "👨‍🏫",
  },
  {
    titulo: "Aparelhos",
    rota: "/admin/aparelhos",
    icone: "🏋️",
  },
  {
    titulo: "Relatórios",
    rota: "/admin/relatorios",
    icone: "📈",
  },
  {
    titulo: "Configurações",
    rota: "/admin/configuracoes",
    icone: "⚙️",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function sair() {
    if (!confirm("Deseja realmente sair?")) return;

    localStorage.removeItem("gymcall-admin");

    router.replace("/admin/login");
  }

  return (
    <aside
      style={{
        width: 260,
        background: "#18181B",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        borderRight: "1px solid #2A2A2F",
      }}
    >
      <h1
        style={{
          color: "#FFF",
          fontSize: 28,
          marginBottom: 35,
        }}
      >
        ⭐ STAR VIP
      </h1>

      <div style={{ flex: 1 }}>
        {itens.map((item) => (
          <Link
            key={item.rota}
            href={item.rota}
            style={{
              display: "block",
              textDecoration: "none",
              padding: "14px 18px",
              marginBottom: 8,
              borderRadius: 12,
              background:
                pathname === item.rota
                  ? "#C8102E"
                  : "transparent",
              color: "#FFF",
              fontWeight: 600,
              transition: "0.2s",
            }}
          >
            {item.icone} {item.titulo}
          </Link>
        ))}
      </div>

      <button
        onClick={sair}
        style={{
          marginTop: 20,
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "none",
          background: "#991B1B",
          color: "#FFF",
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        🚪 Sair
      </button>
    </aside>
  );
}
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    // Permite acessar a tela de login sem verificar autenticação
    if (pathname === "/admin/login") {
      setAutorizado(true);
      return;
    }

    const logado = localStorage.getItem("gymcall-admin");

    if (logado === "true") {
      setAutorizado(true);
    } else {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  // Não mostra a Sidebar na tela de login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!autorizado) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#111111",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: 35,
        }}
      >
        {children}
      </main>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../lib/firebase";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import StatCard from "../components/admin/StatCard";

export default function DashboardAdmin() {
  const [professores, setProfessores] = useState(0);
  const [aparelhos, setAparelhos] = useState(0);

  const [aguardando, setAguardando] = useState(0);
  const [atendendo, setAtendendo] = useState(0);
  const [finalizados, setFinalizados] = useState(0);

  useEffect(() => {
    console.log("Dashboard iniciado");

    const unsubProfessores = onSnapshot(
      collection(db, "professores"),
      (snapshot) => {
        console.log("Professores:", snapshot.size);
        setProfessores(snapshot.size);
      },
      (erro) => {
        console.error("Erro professores:", erro);
      }
    );

    const unsubAparelhos = onSnapshot(
      collection(db, "aparelhos"),
      (snapshot) => {
        console.log("Aparelhos:", snapshot.size);
        setAparelhos(snapshot.size);
      },
      (erro) => {
        console.error("Erro aparelhos:", erro);
      }
    );

    const unsubChamados = onSnapshot(
      collection(db, "chamados"),
      (snapshot) => {
        console.log("Chamados:", snapshot.size);

        let qtdAguardando = 0;
        let qtdAtendendo = 0;
        let qtdFinalizados = 0;

        snapshot.forEach((doc) => {
          const status = doc.data().status;

          if (status === "aguardando") qtdAguardando++;
          if (status === "atendendo") qtdAtendendo++;
          if (status === "finalizado") qtdFinalizados++;
        });

        setAguardando(qtdAguardando);
        setAtendendo(qtdAtendendo);
        setFinalizados(qtdFinalizados);
      },
      (erro) => {
        console.error("Erro chamados:", erro);
      }
    );

    return () => {
      unsubProfessores();
      unsubAparelhos();
      unsubChamados();
    };
  }, []);

  return (
    <>
      <HeaderAdmin
        titulo="📊 Dashboard"
        subtitulo="Bem-vindo ao painel administrativo da Star Vip."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
        }}
      >
        <StatCard
          titulo="👨‍🏫 Professores"
          valor={professores}
          cor="#2563EB"
        />

        <StatCard
          titulo="🏋️ Aparelhos"
          valor={aparelhos}
          cor="#16A34A"
        />

        <StatCard
          titulo="📞 Aguardando"
          valor={aguardando}
          cor="#DC2626"
        />

        <StatCard
          titulo="🟡 Atendendo"
          valor={atendendo}
          cor="#F59E0B"
        />

        <StatCard
          titulo="✅ Finalizados"
          valor={finalizados}
          cor="#22C55E"
        />
      </div>
    </>
  );
}
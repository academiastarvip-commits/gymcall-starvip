"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

import { db } from "../lib/firebase";
import {
  atenderChamado,
  finalizarChamado,
} from "../services/chamados";

import Dashboard from "../components/Dashboard";
import CardChamado from "../components/CardChamado";
import Header from "../components/Header";

type Chamado = {
  id: string;
  numero: number;
  nome: string;
  status: string;
  criadoEm?: Timestamp;
};

export default function Professor() {
  const router = useRouter();

  const [chamados, setChamados] = useState<Chamado[]>([]);

  const primeiraCarga = useRef(true);

  function sair() {
    localStorage.removeItem("gymcall-logado");
    router.replace("/professor/login");
  }

  useEffect(() => {
    const logado = localStorage.getItem("gymcall-logado");

    if (logado !== "true") {
      router.replace("/professor/login");
    }
  }, [router]);

  useEffect(() => {
    const q = query(
      collection(db, "chamados"),
      orderBy("criadoEm", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista: Chamado[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Chamado, "id">),
      }));

      if (primeiraCarga.current) {
        primeiraCarga.current = false;
      }

      setChamados(lista);
    });

    return () => unsubscribe();
  }, []);

  const aguardando = chamados.filter(
    (c) => c.status === "aguardando"
  ).length;

  const atendendo = chamados.filter(
    (c) => c.status === "atendendo"
  ).length;

  const finalizados = chamados.filter(
    (c) => c.status === "finalizado"
  ).length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#fff",
        padding: "25px",
        fontFamily: "Arial",
      }}
    >
      <Header onSair={sair} />

      <Dashboard
        aguardando={aguardando}
        atendendo={atendendo}
        finalizados={finalizados}
      />      {chamados.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "70px",
            color: "#94a3b8",
            fontSize: "20px",
          }}
        >
          Nenhum chamado no momento.
        </div>
      ) : (
        chamados.map((item) => (
          <CardChamado
            key={item.id}
            chamado={item}
            onAtender={atenderChamado}
            onFinalizar={finalizarChamado}
          />
        ))
      )}
    </main>
  );
}
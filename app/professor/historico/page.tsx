"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

import { db } from "../../lib/firebase";
import Header from "../../components/Header";
import Dashboard from "../../components/Dashboard";

type Chamado = {
  id: string;
  nome: string;
  numero: number;
  professor?: string;
  status: string;
};

export default function HistoricoPage() {
  const router = useRouter();

  type Professor = {
  nome: string;
};

const [professor, setProfessor] = useState<Professor | null>(null);
  const [chamados, setChamados] = useState<Chamado[]>([]);

  function sair() {
    localStorage.removeItem("gymcall-logado");
    localStorage.removeItem("gymcall-professor");
    router.replace("/professor/login");
  }

  useEffect(() => {
    const logado = localStorage.getItem("gymcall-logado");

    if (logado !== "true") {
      router.replace("/professor/login");
      return;
    }

    const dados = localStorage.getItem("gymcall-professor");

    if (dados) {
      setProfessor(JSON.parse(dados));
    }
  }, [router]);

  useEffect(() => {
    const q = query(
      collection(db, "chamados"),
      orderBy("criadoEm", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Chamado, "id">),
      }));

      setChamados(lista);
    });

    return () => unsubscribe();
  }, []);

  const aguardando = useMemo(
    () => chamados.filter(c => c.status === "aguardando").length,
    [chamados]
  );

  const atendendo = useMemo(
    () => chamados.filter(c => c.status === "atendendo").length,
    [chamados]
  );

  const finalizados = useMemo(
    () => chamados.filter(c => c.status === "finalizado").length,
    [chamados]
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#FFF",
        padding: "25px",
        fontFamily: "Arial",
      }}
    >
      <Header
        onSair={sair}
        nomeProfessor={professor?.nome}
      />

      <Dashboard
        aguardando={aguardando}
        atendendo={atendendo}
        finalizados={finalizados}
      />

      <div
        style={{
          background: "#18181B",
          borderRadius: 20,
          border: "1px solid #2A2A2F",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "22px",
            borderBottom: "1px solid #2A2A2F",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#FFF",
            }}
          >
            📜 Histórico de Chamados
          </h2>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#202024",
              }}
            >
              <th style={th}>Aluno</th>
              <th style={th}>Aparelho</th>
              <th style={th}>Professor</th>
              <th style={th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {chamados.map((item) => (
              <tr key={item.id}>
                <td style={td}>{item.nome}</td>
                <td style={td}>{item.numero}</td>
                <td style={td}>{item.professor || "-"}</td>
                <td style={td}>
                  {item.status === "aguardando" && "🔴 Aguardando"}
                  {item.status === "atendendo" && "🟡 Atendendo"}
                  {item.status === "finalizado" && "🟢 Finalizado"}
                </td>
              </tr>
            ))}

            {chamados.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    textAlign: "center",
                    padding: 40,
                    color: "#AAA",
                  }}
                >
                  Nenhum atendimento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const th = {
  color: "#FFF",
  padding: 18,
  textAlign: "left" as const,
};

const td = {
  color: "#DDD",
  padding: 18,
  borderTop: "1px solid #2A2A2F",
};
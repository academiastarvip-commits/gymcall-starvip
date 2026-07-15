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
import Toast from "../components/Toast";

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
  type Professor = {
  nome: string;
};

const [professor, setProfessor] = useState<Professor | null>(null);

  const [toastVisivel, setToastVisivel] = useState(false);
  const [toastMensagem, setToastMensagem] = useState("");

  const primeiraCarga = useRef(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function sair() {
    localStorage.removeItem("gymcall-logado");
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

    audioRef.current = new Audio("/sounds/notification.mp3");
    audioRef.current.volume = 1;
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
      } else if (lista.length > chamados.length) {
        audioRef.current?.play().catch(() => {});

        const novo = lista[0];

        if (novo) {
          setToastMensagem(
            `${novo.nome} chamou no aparelho ${novo.numero}`
          );

          setToastVisivel(true);

          document.title = "(1) GymCall";

          setTimeout(() => {
            document.title = "GymCall";
          }, 4000);
        }
      }

      setChamados(lista);
    });

    return () => unsubscribe();
  }, [chamados.length]);

  const aguardando = chamados.filter(
    (c) => c.status === "aguardando"
  ).length;

  const atendendo = chamados.filter(
    (c) => c.status === "atendendo"
  ).length;

  const finalizados = chamados.filter(
    (c) => c.status === "finalizado"
  ).length;   return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#fff",
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

      {chamados.length === 0 ? (
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
            professor={professor?.nome || "Professor"}
            onAtender={atenderChamado}
            onFinalizar={finalizarChamado}
          />
        ))
      )}

      <Toast
        visivel={toastVisivel}
        titulo="🔔 Novo chamado"
        mensagem={toastMensagem}
        onFechar={() => setToastVisivel(false)}
      />

      <audio
        ref={audioRef}
        src="/sounds/notification.mp3"
        preload="auto"
      />
    </main>
  );
}

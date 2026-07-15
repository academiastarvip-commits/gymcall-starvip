"use client";

import { useEffect, useState } from "react";

import HeaderAdmin from "../../components/admin/HeaderAdmin";
import BotaoPrimario from "../../components/admin/BotaoPrimario";
import Modal from "../../components/admin/Modal";
import Input from "../../components/admin/Input";
import TabelaAparelhos from "../../components/admin/TabelaAparelhos";

import {
  listarAparelhos,
  criarAparelho,
  editarAparelho,
  excluirAparelho,
  Aparelho,
} from "../../services/aparelhos";

export default function AparelhosPage() {
  const [aparelhos, setAparelhos] = useState<Aparelho[]>([]);

  const [modalAberto, setModalAberto] = useState(false);

  const [numero, setNumero] = useState("");

  const [nome, setNome] = useState("");

  const [editando, setEditando] = useState<Aparelho | null>(null);

  async function carregar() {
    const lista = await listarAparelhos();
    setAparelhos(lista);
  }

  useEffect(() => {
    carregar();
  }, []);

  function novoAparelho() {
    setNumero("");
    setNome("");
    setEditando(null);
    setModalAberto(true);
  }

  function editar(item: Aparelho) {
    setEditando(item);

    setNumero(String(item.numero));

    setNome(item.nome);

    setModalAberto(true);
  }

  async function salvar() {
    if (!numero) {
      alert("Informe o número.");
      return;
    }

    if (editando) {
      await editarAparelho(editando.id!, {
        numero: Number(numero),
        nome,
        ativo: true,
      });
    } else {
      await criarAparelho({
        numero: Number(numero),
        nome,
        ativo: true,
      });
    }

    setModalAberto(false);

    carregar();
  }

  async function excluir(item: Aparelho) {
    if (!confirm(`Excluir aparelho ${item.numero}?`)) return;

    await excluirAparelho(item.id!);

    carregar();
  }

  return (
    <>
      <HeaderAdmin
        titulo="🏋️ Aparelhos"
        subtitulo="Gerencie todos os aparelhos da academia."
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 25,
        }}
      >
        <BotaoPrimario onClick={novoAparelho}>
          + Novo Aparelho
        </BotaoPrimario>
      </div>

      <TabelaAparelhos
        aparelhos={aparelhos}
        onEditar={editar}
        onExcluir={excluir}
      />

            <Modal
        aberto={modalAberto}
        titulo={editando ? "Editar Aparelho" : "Novo Aparelho"}
        onFechar={() => setModalAberto(false)}
      >
        <Input
          placeholder="Número"
          value={numero}
          onChange={setNumero}
        />

        <Input
          placeholder="Nome do aparelho"
          value={nome}
          onChange={setNome}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
            gap: 12,
          }}
        >
          <button
            onClick={() => setModalAberto(false)}
            style={{
              background: "#27272A",
              color: "#FFF",
              border: "1px solid #3F3F46",
              borderRadius: 12,
              padding: "12px 22px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>

          <BotaoPrimario onClick={salvar}>
            {editando ? "Salvar Alterações" : "Cadastrar"}
          </BotaoPrimario>
        </div>
      </Modal>
    </>
  );
}
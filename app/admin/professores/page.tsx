"use client";

import { useEffect, useState } from "react";

import HeaderAdmin from "../../components/admin/HeaderAdmin";
import BotaoPrimario from "../../components/admin/BotaoPrimario";
import Modal from "../../components/admin/Modal";
import Input from "../../components/admin/Input";

import {
  listarProfessores,
  criarProfessor,
  editarProfessor,
  excluirProfessor,
  Professor,
} from "../../services/professores";

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState<Professor[]>([]);

  const [modalAberto, setModalAberto] = useState(false);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const [editando, setEditando] =
    useState<Professor | null>(null);

  async function carregar() {
    const lista = await listarProfessores();
    setProfessores(lista);
  }

  useEffect(() => {
    carregar();
  }, []);

  function novoProfessor() {
    setNome("");
    setTelefone("");
    setSenha("");
    setEditando(null);
    setModalAberto(true);
  }

  function editar(item: Professor) {
    setEditando(item);

    setNome(item.nome);
    setTelefone(item.telefone);
    setSenha(item.senha);

    setModalAberto(true);
  }

  async function salvar() {
    if (!nome) {
      alert("Informe o nome.");
      return;
    }

    if (editando) {
      await editarProfessor(editando.id!, {
        nome,
        telefone,
        senha,
        ativo: true,
      });
    } else {
      await criarProfessor({
        nome,
        telefone,
        senha,
        ativo: true,
      });
    }

    setModalAberto(false);

    carregar();
  }

  async function excluir(item: Professor) {
    if (!confirm(`Excluir ${item.nome}?`)) return;

    await excluirProfessor(item.id!);

    carregar();
  }

  return (
    <>
      <HeaderAdmin
        titulo="👨‍🏫 Professores"
        subtitulo="Gerencie os professores da academia."
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 25,
        }}
      >
        <BotaoPrimario onClick={novoProfessor}>
          + Novo Professor
        </BotaoPrimario>
      </div>

      <div
        style={{
          background: "#18181B",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid #2F2F35",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#202024" }}>
              <th style={th}>Nome</th>
              <th style={th}>Telefone</th>
              <th style={th}>Status</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {professores.map((item) => (
              <tr key={item.id}>
                <td style={td}>{item.nome}</td>
                <td style={td}>{item.telefone}</td>
                <td style={td}>
                  {item.ativo ? "🟢 Ativo" : "🔴 Inativo"}
                </td>

                <td style={td}>
                  <button
                    onClick={() => editar(item)}
                    style={editarBtn}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => excluir(item)}
                    style={excluirBtn}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        aberto={modalAberto}
        titulo={
          editando ? "Editar Professor" : "Novo Professor"
        }
        onFechar={() => setModalAberto(false)}
      >
        <Input
          placeholder="Nome"
          value={nome}
          onChange={setNome}
        />

        <Input
          placeholder="Telefone"
          value={telefone}
          onChange={setTelefone}
        />

        <Input
          placeholder="Senha"
          value={senha}
          onChange={setSenha}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 20,
          }}
        >
          <button
            onClick={() => setModalAberto(false)}
            style={cancelarBtn}
          >
            Cancelar
          </button>

          <BotaoPrimario onClick={salvar}>
            {editando
              ? "Salvar Alterações"
              : "Cadastrar"}
          </BotaoPrimario>
        </div>
      </Modal>
    </>
  );
}

const th = {
  color: "#FFF",
  textAlign: "left" as const,
  padding: 18,
};

const td = {
  color: "#DDD",
  padding: 18,
  borderTop: "1px solid #2F2F35",
};

const editarBtn = {
  marginRight: 10,
  background: "#2563EB",
  color: "#FFF",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
  cursor: "pointer",
};

const excluirBtn = {
  background: "#DC2626",
  color: "#FFF",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
  cursor: "pointer",
};

const cancelarBtn = {
  background: "#27272A",
  color: "#FFF",
  border: "1px solid #3F3F46",
  borderRadius: 12,
  padding: "12px 22px",
  cursor: "pointer",
};
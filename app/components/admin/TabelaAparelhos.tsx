"use client";

import { Aparelho } from "../../services/aparelhos";

type Props = {
  aparelhos: Aparelho[];
  onEditar: (aparelho: Aparelho) => void;
  onExcluir: (aparelho: Aparelho) => void;
};

export default function TabelaAparelhos({
  aparelhos,
  onEditar,
  onExcluir,
}: Props) {
  return (
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
            <th style={th}>Número</th>
            <th style={th}>Nome</th>
            <th style={th}>Status</th>
            <th style={th}>Ações</th>
          </tr>
        </thead>

        <tbody>
          {aparelhos.map((item) => (
            <tr key={item.id}>
              <td style={td}>{item.numero}</td>

              <td style={td}>{item.nome}</td>

              <td style={td}>
                {item.ativo ? "🟢 Ativo" : "🔴 Inativo"}
              </td>

              <td style={td}>
                <button
                  onClick={() => onEditar(item)}
                  style={botaoEditar}
                >
                  ✏️
                </button>

                <button
                  onClick={() => onExcluir(item)}
                  style={botaoExcluir}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}

          {aparelhos.length === 0 && (
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: 40,
                  textAlign: "center",
                  color: "#AAA",
                }}
              >
                Nenhum aparelho cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: 18,
  color: "#FFF",
  textAlign: "left" as const,
};

const td = {
  padding: 18,
  color: "#DDD",
  borderTop: "1px solid #2F2F35",
};

const botaoEditar = {
  marginRight: 10,
  background: "#2563EB",
  color: "#FFF",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
  cursor: "pointer",
};

const botaoExcluir = {
  background: "#DC2626",
  color: "#FFF",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
  cursor: "pointer",
};
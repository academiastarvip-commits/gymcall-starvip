type Props = {
  aguardando: number;
  atendendo: number;
  finalizados: number;
};

function Card({
  titulo,
  valor,
  cor,
}: {
  titulo: string;
  valor: number;
  cor: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "180px",
        background: "#1e293b",
        borderRadius: "18px",
        padding: "20px",
        borderTop: `6px solid ${cor}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: "16px",
        }}
      >
        {titulo}
      </div>

      <div
        style={{
          marginTop: "10px",
          color: "#fff",
          fontSize: "42px",
          fontWeight: "bold",
        }}
      >
        {valor}
      </div>
    </div>
  );
}

export default function Dashboard({
  aguardando,
  atendendo,
  finalizados,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "35px",
      }}
    >
      <Card
        titulo="Aguardando"
        valor={aguardando}
        cor="#dc2626"
      />

      <Card
        titulo="Atendendo"
        valor={atendendo}
        cor="#eab308"
      />

      <Card
        titulo="Finalizados"
        valor={finalizados}
        cor="#22c55e"
      />
    </div>
  );
}
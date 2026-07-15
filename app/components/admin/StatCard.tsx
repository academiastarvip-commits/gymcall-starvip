type Props = {
  titulo: string;
  valor: string | number;
  cor: string;
};

export default function StatCard({
  titulo,
  valor,
  cor,
}: Props) {
  return (
    <div
      style={{
        background: "#18181B",
        borderLeft: `6px solid ${cor}`,
        borderRadius: 18,
        padding: 24,
      }}
    >
      <p
        style={{
          color: "#94A3B8",
          margin: 0,
        }}
      >
        {titulo}
      </p>

      <h1
        style={{
          color: "#FFF",
          marginTop: 10,
          marginBottom: 0,
          fontSize: 40,
        }}
      >
        {valor}
      </h1>
    </div>
  );
}
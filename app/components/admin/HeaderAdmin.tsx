type Props = {
  titulo: string;
  subtitulo?: string;
};

export default function HeaderAdmin({
  titulo,
  subtitulo,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 35,
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            color: "#FFF",
            fontSize: 36,
          }}
        >
          {titulo}
        </h1>

        <p
          style={{
            color: "#94A3B8",
            marginTop: 8,
          }}
        >
          {subtitulo}
        </p>
      </div>

      <div
        style={{
          background: "#18181B",
          borderRadius: 14,
          padding: "14px 20px",
          color: "#FFF",
        }}
      >
        GymCall Admin
      </div>
    </div>
  );
}
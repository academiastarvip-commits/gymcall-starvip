"use client";

type Props = {
  aberto: boolean;
  titulo: string;
  children: React.ReactNode;
  onFechar: () => void;
};

export default function Modal({
  aberto,
  titulo,
  children,
  onFechar,
}: Props) {
  if (!aberto) return null;

  return (
    <div
      onClick={onFechar}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 520,
          maxWidth: "95%",
          background: "#18181B",
          borderRadius: 18,
          border: "1px solid #2F2F35",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: 22,
            borderBottom: "1px solid #2F2F35",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "#FFF",
              margin: 0,
            }}
          >
            {titulo}
          </h2>

          <button
            onClick={onFechar}
            style={{
              background: "transparent",
              color: "#FFF",
              border: "none",
              cursor: "pointer",
              fontSize: 24,
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            padding: 24,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
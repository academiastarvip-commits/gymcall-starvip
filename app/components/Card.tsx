type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div
      style={{
        background: "#18181B",
        border: "1px solid #2A2A2F",
        borderRadius: "24px",
        padding: "30px",
        boxShadow: "0 12px 35px rgba(0,0,0,.35)",
      }}
    >
      {children}
    </div>
  );
}
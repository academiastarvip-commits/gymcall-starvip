type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function BotaoPrimario({
  children,
  onClick,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "#C8102E",
        color: "#FFF",
        border: "none",
        borderRadius: 12,
        padding: "14px 24px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: 16,
      }}
    >
      {children}
    </button>
  );
}
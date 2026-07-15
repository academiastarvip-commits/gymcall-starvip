type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function BotaoSecundario({
  children,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#27272A",
        color: "#FFF",
        border: "1px solid #3F3F46",
        borderRadius: 12,
        padding: "14px 24px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
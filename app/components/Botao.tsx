type Props = {
  texto: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Botao({
  texto,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        height: "60px",
        border: "none",
        borderRadius: "18px",
        background: disabled ? "#555" : "#C8102E",
        color: "#FFF",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: ".2s",
      }}
    >
      {texto}
    </button>
  );
}
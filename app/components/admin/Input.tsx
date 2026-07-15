type Props = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function Input({
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: 14,
        borderRadius: 12,
        border: "1px solid #3F3F46",
        background: "#18181B",
        color: "#FFF",
        fontSize: 15,
        outline: "none",
        marginBottom: 16,
      }}
    />
  );
}
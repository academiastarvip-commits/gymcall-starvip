"use client";

import Modal from "./Modal";
import BotaoPrimario from "./BotaoPrimario";
import BotaoSecundario from "./BotaoSecundario";

type Props = {
  aberto: boolean;
  titulo: string;
  mensagem: string;
  onCancelar: () => void;
  onConfirmar: () => void;
};

export default function ConfirmDialog({
  aberto,
  titulo,
  mensagem,
  onCancelar,
  onConfirmar,
}: Props) {
  return (
    <Modal
      aberto={aberto}
      titulo={titulo}
      onFechar={onCancelar}
    >
      <p
        style={{
          color: "#DDD",
          marginBottom: 25,
        }}
      >
        {mensagem}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
        }}
      >
        <BotaoSecundario onClick={onCancelar}>
          Cancelar
        </BotaoSecundario>

        <BotaoPrimario onClick={onConfirmar}>
          Confirmar
        </BotaoPrimario>
      </div>
    </Modal>
  );
}
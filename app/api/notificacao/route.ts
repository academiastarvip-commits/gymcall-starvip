import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { titulo, mensagem } = await req.json();

    const resposta = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${process.env.ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.ONESIGNAL_APP_ID,
        included_segments: ["Subscribed Users"],
        headings: {
          pt: titulo,
          en: titulo,
        },
        contents: {
          pt: mensagem,
          en: mensagem,
        },
      }),
    });

    const dados = await resposta.json();

    return NextResponse.json(dados);
  } catch (erro) {
    console.error(erro);

    return NextResponse.json(
      {
        erro: "Erro ao enviar notificação.",
      },
      {
        status: 500,
      }
    );
  }
}
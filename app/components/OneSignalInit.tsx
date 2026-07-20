"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export default function OneSignalInit() {
  useEffect(() => {
    console.log("🚀 OneSignalInit foi carregado");

    async function init() {
      try {
        console.log("Iniciando OneSignal...");

        await OneSignal.init({
          appId: "99d5bf74-03ca-452d-b503-4cd50b25de0c",
          notifyButton: {
            enable: false,
          },
          allowLocalhostAsSecureOrigin: true,
        });

        console.log("✅ OneSignal iniciado");
      } catch (error) {
        console.error("❌ Erro ao iniciar OneSignal:", error);
      }
    }

    init();
  }, []);

  return null;
}
"use client";

import { useEffect } from "react";

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          console.log("Service Worker registrado.");
        })
        .catch((error) => {
          console.error("Erro ao registrar o Service Worker:", error);
        });
    }
  }, []);

  return null;
}
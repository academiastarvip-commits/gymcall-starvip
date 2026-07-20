import type { Metadata, Viewport } from "next";
import "./globals.css";
import RegisterServiceWorker from "./components/RegisterServiceWorker";
import OneSignalInit from "./components/OneSignalInit";

export const metadata: Metadata = {
  title: "GymCall",
  description: "Sistema inteligente de chamada de professores da Star Vip",

  applicationName: "GymCall",

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GymCall",
  },

  icons: {
    icon: [
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#C8102E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <RegisterServiceWorker />
        <OneSignalInit />
        {children}
      </body>
    </html>
  );
}
"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export default function OneSignalInit() {
  useEffect(() => {
    async function init() {
      try {
        await OneSignal.init({
          appId: "99d5bf74-03ca-452d-b503-4cd50b25de0c",
          allowLocalhostAsSecureOrigin: true,
        });

        console.log("✅ OneSignal iniciado");

        console.log(
          "Permissão:",
          OneSignal.Notifications.permission
        );

        console.log(
          "Opted In:",
          OneSignal.User.PushSubscription.optedIn
        );

        console.log(
          "Subscription ID:",
          OneSignal.User.PushSubscription.id
        );

      } catch (error) {
        console.error(error);
      }
    }

    init();
  }, []);

  return null;
}
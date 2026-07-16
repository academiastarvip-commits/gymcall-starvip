import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";

const VAPID_KEY =
  "BLrnwocADb-Vb0kDsGFhsTqvdGjnjevaRssFL24WjCQLBZQkMkRTUEIGd1ms-PnKMdVkf27KrqEmJRRzIsMKU4c";

export async function solicitarPermissaoNotificacao() {
  const messaging = await getFirebaseMessaging();

  if (!messaging) {
    console.log("Firebase Messaging não suportado.");
    return null;
  }

  const permissao = await Notification.requestPermission();

  if (permissao !== "granted") {
    console.log("Permissão negada.");
    return null;
  }

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
  });

  console.log("TOKEN FCM:", token);

  return token;
}
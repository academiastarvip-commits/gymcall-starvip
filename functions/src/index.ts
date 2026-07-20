import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

setGlobalOptions({ maxInstances: 10 });

export const health = onRequest((req, res) => {
  res.status(200).send("GymCall Functions OK");
});
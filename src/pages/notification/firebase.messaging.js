import { getMessaging } from "firebase/messaging";
import { app } from "./firebase.config";

export const messaging = getMessaging(app);
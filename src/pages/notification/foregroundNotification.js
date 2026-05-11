import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase.messaging";
import toast from "react-hot-toast";

export const listenForForegroundMessages = () => {
    onMessage(messaging, (payload) => {
        toast.success(`New Message: ${payload.notification.title}`);
    });
};
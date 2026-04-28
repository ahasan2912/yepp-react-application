import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase.messaging";
import toast from "react-hot-toast";

export const listenForForegroundMessages = () => {
    onMessage(messaging, (payload) => {
        console.log("Foreground message received: ", payload);
        toast.success(`New Message: ${payload.notification.title}`);
    });
};
import { Bell, History as HistoryIcon, Mail, Plus, Send, Smartphone } from "lucide-react";
import HeadingTitle from "../components/HeadingTitle";
import StatsCard from "../vendors/components/StatsCard";
import SendMessage from "./components/SendMessage";

const Notification = () => {
    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title='Notification'
                description='Manage and send notification to users and vendors.'
            />
            <div>
                <SendMessage />
            </div>
        </div>
    );
};

export default Notification;
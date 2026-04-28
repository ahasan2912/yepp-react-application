import { Bell } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllNotificaitonQuery, useOpenNotificationPanelMutation } from "../../features/notification/notificaitonApi";
import Notification from "../navbar/Notification";

const AdminPorfile = () => {
    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const openingNotificationPanelRef = useRef(false);
    const { user } = useSelector((state) => state?.auth);
    const notificationQueryArgs = { id: user?._id };
    const { data: notificationData, refetch: refetchNotifications } = useGetAllNotificaitonQuery(
        notificationQueryArgs,
        { skip: !user?._id }
    );
    const [openNotificationPanel] = useOpenNotificationPanelMutation();

    const unreadCount = Number(notificationData?.data?.unreadCount ?? notificationData?.unreadCount) || 0;

    const notificationLabel = openNotificationModal
        ? "Close notifications"
        : unreadCount > 0
            ? `Open notifications, ${unreadCount} unread`
            : "Open notifications";

    const handleNotificationToggle = async () => {
        if (openNotificationModal) {
            setOpenNotificationModal(false);
            return;
        }

        setOpenNotificationModal(true);

        if (!user?._id || openingNotificationPanelRef.current) return;

        openingNotificationPanelRef.current = true;

        try {
            await openNotificationPanel({ listArgs: notificationQueryArgs }).unwrap();
        } catch {
            refetchNotifications();
        } finally {
            openingNotificationPanelRef.current = false;
        }
    };

    return (
        <div className="relative z-[60] flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                                    type="button"
                                    aria-label={notificationLabel}
                                    aria-expanded={openNotificationModal}
                                    onClick={handleNotificationToggle}
                                    className={`relative cursor-pointer ${openNotificationModal ? 'text-primary font-bold' : ''}`}
                                >
                                    <Bell size={22} aria-hidden="true" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold leading-none text-white">
                                            {unreadCount > 99 ? "99+" : unreadCount}
                                        </span>
                                    )}
                                </button>
            </div>
            {
                openNotificationModal && <Notification
                    isOpen={openNotificationModal}
                    setIsOpen={setOpenNotificationModal} />
            }
        </div>
    );
};

export default AdminPorfile;

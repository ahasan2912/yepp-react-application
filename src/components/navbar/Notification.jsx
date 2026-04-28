import { Bell, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllNotificaitonQuery, useLazyGetSingleNotificationQuery } from "../../features/notification/notificaitonApi";
import { useSelector } from "react-redux";

const panelClassName = "absolute right-0 top-[calc(100%+24px)] z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-lg border border-[#DDEFF8] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.16)] sm:w-[28rem]";

const Notification = ({ setIsOpen }) => {
    const { user } = useSelector((state) => state?.auth);
    const navigate = useNavigate();
    const notificationQueryArgs = { id: user?._id };
    const { data: getAllNotificaiton, isLoading } = useGetAllNotificaitonQuery(notificationQueryArgs, {
        skip: !user?._id
    });
    const [getSingleNotification] = useLazyGetSingleNotificationQuery();
    const notifications = getAllNotificaiton?.data?.notifications ?? getAllNotificaiton?.notifications ?? [];

    const getNotificationDetailPath = (notificationId) => `/notification/${notificationId}`;

    const handleNotificationClick = (note) => {
        if (!note?._id) return;

        getSingleNotification({
            id: note._id,
            listArgs: notificationQueryArgs,
        }).unwrap().catch(() => {});

        navigate(getNotificationDetailPath(note._id));
        setIsOpen(false);
    };

    if (isLoading) {
        return (
            <div className={panelClassName} role="status" aria-label="Loading notifications">
                <div className="border-b border-[#DDEFF8] bg-[#F0F9FF] px-5 py-4">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-sm ring-1 ring-[#E0F2FE]">
                            <Bell className="animate-pulse" size={20} aria-hidden="true" />
                        </span>
                        <div>
                            <p className="text-base font-bold text-[#262626]">Notification</p>
                            <p className="mt-0.5 text-xs font-semibold text-[#737373]">Loading your latest updates</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-3 bg-white px-3 py-4">
                    {[0, 1, 2].map((item) => (
                        <div key={item} className="flex gap-3 rounded-lg border border-slate-100 bg-[#F8FCFD] p-4">
                            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-slate-200" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-2/5 animate-pulse rounded-sm bg-slate-200" />
                                <div className="h-3 w-4/5 animate-pulse rounded-sm bg-slate-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={panelClassName} role="dialog" aria-labelledby="notification-heading">
            <div className="relative border-b border-[#DDEFF8] bg-[#F0F9FF] px-5 py-4">
                <div className="flex items-center gap-3 pr-12">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary shadow-sm ring-1 ring-[#E0F2FE]">
                        <Bell size={21} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                        <h2 id="notification-heading" className="text-lg font-bold leading-tight text-[#262626]">Notification</h2>
                        <p className="mt-1 text-xs font-semibold text-[#737373]">
                            {notifications.length > 0 ? `${notifications.length} latest update${notifications.length === 1 ? "" : "s"}` : "You are all caught up"}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="Close notifications"
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#737373] shadow-sm ring-1 ring-[#E0F2FE] transition-all duration-200 hover:text-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50]/35 cursor-pointer"
                >
                    <X size={18} aria-hidden="true" />
                </button>
            </div>
            <div className="max-h-[calc(100vh-8rem)] space-y-3 overflow-y-auto bg-white px-3 py-4 custom-scrollbar sm:max-h-125" aria-live="polite">
                {notifications.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-[#DDEFF8] bg-[#F8FCFD] px-6 py-10 text-center">
                        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white text-primary shadow-sm ring-1 ring-[#E0F2FE]">
                            <Bell size={24} aria-hidden="true" />
                        </span>
                        <p className="mt-4 text-base font-bold text-[#262626]">No notifications available</p>
                        <p className="mt-1 text-sm font-medium text-[#737373]">New updates will appear here.</p>
                    </div>
                ) : (
                    notifications.map((note, index) => {
                        const isUnread = note?.isRead === false;
                        return (
                            <button
                                type="button"
                                key={note?._id ?? index}
                                onClick={() => handleNotificationClick(note)}
                                disabled={!note?._id}
                                className={`group relative flex w-full gap-3 rounded-lg border p-3.5 text-left shadow-sm transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50]/30 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${isUnread
                                    ? "border-[#BEE6C2] bg-linear-to-r from-[#F4FFF5] via-white to-[#F0F9FF] hover:border-[#4CAF50]/60 hover:shadow-md"
                                    : "border-slate-100 bg-white hover:border-[#DDEFF8] hover:bg-[#F8FCFD] hover:shadow-md"
                                    }`}
                            >
                                <div className="shrink-0">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-sm ring-1 transition-transform duration-300 group-hover:scale-105 ${isUnread
                                        ? "bg-linear-to-br from-[#4CAF50] to-[#79be7b] text-white ring-[#4CAF50]/20"
                                        : "bg-[#F0F9FF] text-primary ring-[#E0F2FE]"
                                        }`}>
                                        <Bell size={18} aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 space-y-1 pr-5">
                                    <h3 className={`truncate text-sm leading-5 ${isUnread ? "font-bold text-[#262626]" : "font-semibold text-[#404040]"}`}>
                                        {note?.title}
                                    </h3>
                                    <p className={`line-clamp-2 text-sm leading-5 ${isUnread ? "font-medium text-[#525252]" : "text-[#737373]"}`}>
                                        {note?.body?.split(" ").slice(0, 5).join(" ")}......
                                    </p>
                                </div>
                                {isUnread && (
                                    <span className="absolute right-3 top-4 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(76,175,80,0.14)]" aria-label="Unread notification" />
                                )}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Notification;

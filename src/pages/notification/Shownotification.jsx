import { Bell } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetSingleNotificationQuery } from "../../features/notification/notificaitonApi";
import { useEffect } from "react";

const getNotificationFromResponse = (response) => {
    const payload = response?.data ?? response;
    return payload?.notification ?? payload;
};

const formatNotificationDate = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(parsedDate);
};

const pageClassName = "flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 pt-[220px] pb-16";
const panelClassName = "w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8";

const ShowNotification = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const notificationId = id ?? searchParams.get("id");
    const {
        data,
        isError,
        isLoading,
    } = useGetSingleNotificationQuery(notificationId, {
        skip: !notificationId,
    });
    const notification = getNotificationFromResponse(data);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    if (!notificationId) {
        return (
            <main className={pageClassName}>
                <section className={`${panelClassName} text-center`}>
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#F0F9FF] text-primary">
                        <Bell size={24} aria-hidden="true" />
                    </span>
                    <h1 className="mt-5 text-2xl font-bold text-[#262626]">Notification not found</h1>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#737373]">
                        Open a notification from the bell to read the full message.
                    </p>
                    <Link to="/" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary">
                        Back to Local Deals
                    </Link>
                </section>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className={pageClassName}>
                <section className={panelClassName}>
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-slate-200" />
                        <div className="space-y-2">
                            <div className="h-3 w-24 rounded-sm bg-slate-200" />
                            <div className="h-3 w-36 rounded-sm bg-slate-200" />
                        </div>
                    </div>
                    <div className="mt-8 h-8 w-3/4 rounded-sm bg-slate-200" />
                    <div className="mt-6 space-y-3">
                        <div className="h-4 rounded-sm bg-slate-200" />
                        <div className="h-4 rounded-sm bg-slate-200" />
                        <div className="h-4 w-2/3 rounded-sm bg-slate-200" />
                    </div>
                </section>
            </main>
        );
    }

    if (isError || !notification?._id) {
        return (
            <main className={pageClassName}>
                <section className={`${panelClassName} text-center`}>
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#F0F9FF] text-primary">
                        <Bell size={24} aria-hidden="true" />
                    </span>
                    <h1 className="mt-5 text-2xl font-bold text-[#262626]">Notification unavailable</h1>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#737373]">
                        We could not load this notification right now.
                    </p>
                    <Link to="/" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary">
                        Back to Local Deals
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className={pageClassName}>
            <article className={panelClassName}>
                <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F0F9FF] text-primary">
                            <Bell size={24} aria-hidden="true" />
                        </span>
                        <div>
                            <p className="text-sm font-bold uppercase text-primary">Notification</p>
                            {notification?.createdAt && (
                                <time className="mt-1 block text-sm font-medium text-[#737373]" dateTime={notification.createdAt}>
                                    {formatNotificationDate(notification.createdAt)}
                                </time>
                            )}
                        </div>
                    </div>
                    <span className="max-w-full self-start truncate rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-[#525252]">
                        {notification?.type || "Update"}
                    </span>
                </div>

                <h1 className="mt-7 text-2xl font-bold leading-tight text-[#262626] sm:text-3xl">
                    {notification?.title}
                </h1>
                <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-[#525252]">
                    {notification?.body}
                </p>
            </article>
        </main>
    );
};

export default ShowNotification;

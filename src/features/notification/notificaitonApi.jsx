import apiSlice from "../api/apiSlice";

const getNotificationPayload = (draft) => draft?.data ?? draft;

const setCachedUnreadCount = (draft, count) => {
    const payload = getNotificationPayload(draft);

    if (payload) {
        payload.unreadCount = count;
    }
};

const markCachedNotificationRead = (draft, notificationId) => {
    const payload = getNotificationPayload(draft);
    const notification = payload?.notifications?.find((note) => note?._id === notificationId);

    if (notification) {
        notification.isRead = true;
    }
};

export const notificationAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userRegisterFcmToken: builder.mutation({
            query: (data) => ({
                url: "/user/register_fcm",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Notifications"],
        }),

        saveFcmToken: builder.mutation({
            query: (data) => ({
                url: "/dashboard/send_notification_and_email",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Notifications"],
        }),

        getAllNotificaiton: builder.query({
            query: ({ page = 1, limit = 20 } = {}) => ({
                url: `/notification?page=${page}&limit=${limit}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Notifications"],
        }),

        openNotificationPanel: builder.mutation({
            query: () => ({
                url: "/notification/panel/open",
                method: "PATCH",
                credentials: "include",
            }),
            async onQueryStarted(arg = {}, { dispatch, queryFulfilled }) {
                const listArgs = arg?.listArgs ?? arg;
                const patchResult = dispatch(
                    notificationAPI.util.updateQueryData("getAllNotificaiton", listArgs, (draft) => {
                        setCachedUnreadCount(draft, 0);
                    })
                );

                try {
                    await queryFulfilled;
                    dispatch(
                        notificationAPI.util.updateQueryData("getAllNotificaiton", listArgs, (draft) => {
                            setCachedUnreadCount(draft, 0);
                        })
                    );
                } catch {
                    patchResult.undo();
                }
            },
        }),

        notificaitonPost: builder.mutation({
            query: (data) => ({
                url: "/dashboard/send_notification_and_email",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Notifications"],
        }),

        getSingleNotification: builder.query({
            serializeQueryArgs: ({ queryArgs }) => {
                return typeof queryArgs === "object" ? queryArgs?.id : queryArgs;
            },
            query: (arg) => {
                const notificationId = typeof arg === "object" ? arg?.id : arg;

                return {
                    url: `/notification/${notificationId}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const notificationId = typeof arg === "object" ? arg?.id : arg;
                const listArgs = typeof arg === "object" ? arg?.listArgs : undefined;
                const patchResult = dispatch(
                    notificationAPI.util.updateQueryData("getAllNotificaiton", listArgs, (draft) => {
                        markCachedNotificationRead(draft, notificationId);
                    })
                );

                try {
                    await queryFulfilled;
                    dispatch(
                        notificationAPI.util.updateQueryData("getAllNotificaiton", listArgs, (draft) => {
                            markCachedNotificationRead(draft, notificationId);
                        })
                    );
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useSaveFcmTokenMutation,
    useUserRegisterFcmTokenMutation,
    useGetAllNotificaitonQuery,
    useGetSingleNotificationQuery,
    useOpenNotificationPanelMutation,
    useLazyGetSingleNotificationQuery,
    useNotificaitonPostMutation
} = notificationAPI;

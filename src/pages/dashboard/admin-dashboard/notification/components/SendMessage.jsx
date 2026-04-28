import { useForm } from 'react-hook-form';
import PriviewPage from './PriviewPage';
import { Send } from 'lucide-react';
import { useNotificaitonPostMutation } from '../../../../../features/notification/notificaitonApi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SendMessage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [notificaitonPost, { isLoading, error, isSuccess }] = useNotificaitonPostMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Notification send successfully!");
            reset();
        }
        if (error) {
            const message = error?.data?.message || "Notification send failed!";
            toast.error(message);
        }

    }, [navigate, isSuccess, error, reset]);

    const onSubmit = (data) => {
        const notificationData = {
            title: data?.title,
            message: data?.message,
            channel: {
                push: data?.type === "Both" ? true : data?.type === 'Push' ? true : false,
                email: data?.type === "Both" ? true : data?.type === 'Email' ? true : false,
            },
            to: {
                all_users: data?.recipents === "All Users",
                active_vendors: data?.recipents === "All Vendors",
            },
        };
        notificaitonPost(notificationData);
    };

    return (
        <div className="flex justify-between mt-5">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold text-[#262626]">Notification Pages</h2>
                    <p className="text-sm text-[#737373] font-medium mb-6">
                        Manage information pages on your platform
                    </p>

                    <div className="space-y-4">

                        {/* Title */}
                        <div>
                            <label className="block font-semibold mb-1">Title</label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                placeholder="Notification Title"
                                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block font-semibold mb-1">Message</label>
                            <textarea
                                {...register("message", { required: "Message is required" })}
                                rows="6"
                                placeholder="write your message here"
                                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                            )}
                        </div>

                        {/* Notification Type */}
                        <div>
                            <label className="block font-semibold mb-2">Notification Type</label>
                            <div className="flex gap-4">
                                {["Push", "Email", "Both"].map((t) => (
                                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={t}
                                            {...register("type", { required: "Select notification type" })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-600">{t}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.type && (
                                <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                            )}
                        </div>

                        {/* Recipients */}
                        <div>
                            <label className="block font-semibold mb-2">Recipients</label>
                            <div className="flex gap-4">
                                {["All Users", "All Vendors"].map((t) => (
                                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={t}
                                            {...register("recipents", { required: "Select recipients" })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-600">{t}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.recipents && (
                                <p className="text-red-500 text-sm mt-1">{errors.recipents.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="text-center pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary hover:bg-secondary text-white font-bold py-2 sm:px-20 rounded-md shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl w-full flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                                ) : (
                                    <span className="font-medium text-lg text-[#FFFFFF]">
                                        Send Notification
                                    </span>
                                )}
                            </button>
                        </div>

                    </div>
                </form>

                <PriviewPage />
            </div>
        </div>
    );
};

export default SendMessage;

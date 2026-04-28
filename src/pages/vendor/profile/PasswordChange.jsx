import { Eye, EyeOff, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../../features/auth/authApi";
import toast from "react-hot-toast";

const PasswordChange = ({ setActiveTab }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setNewShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [changePassword, { isLoading, isSuccess, error }] = useChangePasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password Changed successfully");
        }
        if (error) {
            const message = error?.data?.message || "Password Changed failed!";
            toast.error(message);
        }
    }, [isSuccess, error]);

    const onSubmit = async (data) => {
        changePassword({
            oldPassword: data?.oldPassword,
            newPassword: data?.newPassword,
        });
        setTimeout(() => {
            setActiveTab('profile-details');
        }, 1000);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  border border-gray-300 px-4 py-5 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 border-b border-gray-400 pb-4">Password Change</h3>
                <div>
                    <label className="text-base text-gray-500 font-semibold">Old Password</label>
                    <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Old password"
                            className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                            {...register('oldPassword', { required: 'Old password is required' })}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
                {errors.oldPassword && (
                    <p className="text-sm text-red-500 ml-4">{errors.oldPassword.message}</p>
                )}
                <div>
                    <label className="text-base text-gray-500 font-semibold">New Password</label>
                    <div className="relative mt-2">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="New password"
                            className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                            {...register('newPassword', { required: 'New password is required' })}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 cursor-pointer"
                            onClick={() => setNewShowPassword(!showNewPassword)}>
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {errors.newPassword && (
                    <p className="text-sm text-red-500 ml-4">{errors.newPassword.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-60 bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-full shadow-md cursor-pointer flex items-center justify-center">
                    {isLoading ? (
                        <div className="animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                    ) : (
                        <span className="font-medium text-lg text-[#FFFFFF]">Change Password</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default PasswordChange;
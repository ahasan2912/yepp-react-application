import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import bgImage from '../../assets/images/forget.jpg';
import { Eye, EyeOff, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../features/auth/authApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [resetPassword, { isLoading, isSuccess, error }] = useResetPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password updated successfully");
            navigate('/login');
        }
        if (error) {
            const message = error?.data?.message || "Password reset failed!";
            toast.error(message);
        }
    }, [isSuccess, error, navigate]);

    const onSubmit = async (data) => {
        resetPassword({
            newPassword: data?.password
        });
        localStorage.removeItem("resetToken");
        localStorage.removeItem("email");
    };
    return (
        <div className="flex min-h-screen w-full">
            <div
                className="hidden lg:block lg:w-1/2 forget-bg-image"
                style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="w-full h-full bg-black/10"></div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 bg-[#F6F7FD]">
                <div className="w-full max-w-117.5 bg-white rounded-xl shadow-sm p-10 border-slate-100">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-[#262626]">
                            Create New Password
                        </h1>
                        <p className="text-[#737373] text-base mt-1">
                            Your identity has been verified. Set a new password for your account.
                        </p>
                    </div>
                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New password"
                                className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('password', { required: 'New password is required' })}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 ml-4">{errors.password.message}</p>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer outline-0">
                            {isLoading ? (
                                <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                            ) : (
                                <span className="font-medium text-lg text-[#FFFFFF]">Reset Password</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
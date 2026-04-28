import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import bgImage from '../../assets/images/forget.jpg'
import { useNavigate } from 'react-router-dom';
import { useLazyForgetPasswordQuery } from '../../features/auth/authApi';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [forgetPassword, { isLoading }] = useLazyForgetPasswordQuery();

    const onSubmit = async (data) => {
        try {
            const res = await forgetPassword(data.email).unwrap();
            if (res?.statusCode) {
                localStorage.setItem("email", data.email);
                toast.success('Now check your email for OTP');
                navigate("/verify-otp-code");
            }
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong. Try again!");
        }
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
                            Forgot Password?
                        </h1>
                        <p className="text-[#737373] text-base mt-1">
                            Don't worry! It happens. Please enter the email associated with your account.
                        </p>
                    </div>
                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.email.message}
                            </p>
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

export default ForgetPassword;
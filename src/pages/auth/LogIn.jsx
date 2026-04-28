import { Mail, Lock, EyeOff, Eye, ArrowLeft } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import bgImage from '../../assets/images/authImage.jpg'
import { useEffect, useState } from 'react'
import SocilaLink from './SocilaLink'
import { saveTokensAndFetchUser, useHandleLoginMutation } from '../../features/auth/authApi'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { generateFcmTokenData } from '../../lib/fcmtoken'
import { useUserRegisterFcmTokenMutation } from '../../features/notification/notificaitonApi'

const LogIn = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access");
    const refreshToken = params.get("refresh");

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [handleLogin, { isLoading }] = useHandleLoginMutation();
    const [userRegisterFcmToken] = useUserRegisterFcmTokenMutation();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state?.auth);

    // google and apple authoraization handdling
    useEffect(() => {
        if (accessToken && refreshToken) {
            const tokens = {
                accessToken,
                refreshToken
            }
            saveTokensAndFetchUser(tokens, dispatch);
        }
    }, [accessToken, refreshToken, dispatch]);

    // email and password
    useEffect(() => {
        if (!user) return;
        // fcm token when user loing
        const registerToken = async () => {
            const fcmToken = await generateFcmTokenData();
            try {
                await userRegisterFcmToken(fcmToken);
            } catch (error) {
                toast.error('Error registering FCM token:', error);
            }
        };
        registerToken();

        if (user?.role === 'ADMIN') {
            navigate("/dashboard/admin-dashboard");
        } else if (!user?.isVerified) {
            navigate("/verificationcode");
        } else if (user?.isShopCreated) {
            navigate("/shop-overview");
        } else {
            navigate("/verdor-created-shop");
        }

    }, [user, navigate, userRegisterFcmToken]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const onSubmit = async (data) => {
        try {
            const res = await handleLogin(data).unwrap();
            if (res?.data) {
                toast.success("Login successful!");
            }
        } catch (error) {
            const message = error?.data?.message || "Login failed!";
            toast.error(message);
        }
    };
    return (
        <div className="flex min-h-screen w-full" data-animate="hero">
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                data-animate-item
                style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="w-full h-full bg-black/10"></div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 bg-[#F6F7FD]">
                <div className="w-full max-w-117.5 bg-white rounded-xl shadow-sm p-4 sm:p-10 border-slate-100 relative" data-animate-item>
                    <div className="text-center mb-8">
                        <div className='mt-12 sm:mt-2'>
                            <Link
                                to="/"
                                aria-label="Back to home"
                                className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-[#1E5F37] transition-colors hover:bg-[#E4EFE7] absolute left-2 top-4"
                            >
                                <ArrowLeft size={18} aria-hidden="true" />
                                Home
                            </Link>
                        </div>
                        <h1 className="text-2xl font-bold text-[#262626]">
                            Welcome Back
                        </h1>
                        <p className="text-[#737373] text-base mt-1">
                            Let's get you back to your business
                        </p>
                    </div>

                    <div className="flex bg-[#F0F9FF] rounded-full mb-8  mx-auto">
                        <div className="w-full sm:px-1.5 py-1.5 flex">
                            <Link to='/login' className="text-center w-full py-2 px-1 sm:px-4 rounded-full bg-primary hover:bg-secondary text-white text-sm sm:text-base font-medium cursor-pointer">
                                Business sign-in
                            </Link>
                            <Link to='/register' className="text-center w-full py-2 px-1 sm:px-4 rounded-full text-[#262626]  text-sm sm:text-base font-medium cursor-pointer">
                                Business sign-up
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('email', { required: 'Email is required' })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500 ml-4">{errors.email.message}</p>
                        )}

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('password', { required: 'Password is required' })}
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

                        <div className="text-right">
                            <Link to="/forgetpassword" className="text-sm text-primary font-medium hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-full shadow-md cursor-pointer flex items-center justify-center">
                            {isLoading ? (
                                <div className="animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                            ) : (
                                <span className="font-medium text-lg text-[#FFFFFF]">Sign In</span>
                            )}
                        </button>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="grow border-t border-[#837d7d]"></div>
                        <span className="px-3 text-sm text-[#262626]">Or continue with</span>
                        <div className="grow border-t border-[#837d7d]"></div>
                    </div>
                    <SocilaLink />
                    <div className="text-center mt-8 text-base">
                        <span className="text-[#000000]">Don't have an account? </span>
                        <Link to="/register" className="text-primary font-semibold hover:underline">
                            Business Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;

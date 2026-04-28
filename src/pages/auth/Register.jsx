import { Mail, Lock, EyeOff, Eye, User, ArrowLeft, Check, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import bgImage from '../../assets/images/authImage.jpg'
import { useEffect, useState } from 'react'
import SocilaLink from './SocilaLink'
import toast from 'react-hot-toast'
import { useHandleRegisterMutation } from '../../features/auth/authApi'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [showLegalModal, setShowLegalModal] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [handleRegister, { isLoading }] = useHandleRegisterMutation();
    const agreedToTerms = watch('termsAccepted', false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = async (data) => {
        if (data.password !== data.conpassword) {
            toast.error("Passwords do not match");
            return;
        }

        const email = data.email?.trim();

        try {
            await handleRegister({
                user_name: data.username,
                email,
                password: data.password,
            }).unwrap();

            toast.success("Registration successful! Please verify your account.");
            navigate("/verificationcode", {
                state: { email },
            });
        } catch (error) {
            const message = error?.data?.message || "Registration failed!";
            toast.error(message);
        }
    };

    return (
        <>
            <div className="flex min-h-screen w-full" data-animate="hero">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                    data-animate-item
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <div className="w-full h-full bg-black/10"></div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 bg-[#F6F7FD] py-2">
                    <div className="w-full max-w-120 bg-white rounded-xl shadow-sm p-4 sm:p-10 border-slate-100 relative" data-animate-item>
                        <div className="text-center mb-8 mx-auto">
                            <div className='mt-12 sm:mt-2'>
                                <Link
                                    to="/"
                                    aria-label="Back to home"
                                    className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-[#1E5F37] transition-colors hover:bg-[#E4EFE7] absolute left-2 top-4"
                                >
                                    <ArrowLeft size={18} aria-hidden="true" />
                                    Home
                                </Link>
                            </div>
                            <h1 className="text-2xl font-bold text-[#262626]">
                                Welcome To Yepp
                            </h1>
                            <p className="text-[#737373] text-base mt-1">
                                Market your Ad for $109/mth
                            </p>
                        </div>

                        <div className="flex bg-[#F0F9FF] rounded-full mb-8 mx-auto">
                            <div className="w-full p-1.5 flex">
                                <Link to='/register' className="text-center w-full py-2 px-1 sm:px-4 rounded-full bg-primary hover:bg-secondary text-white text-sm sm:text-base font-medium cursor-pointer">
                                    Business sign-up
                                </Link>
                                <Link to='/login' className="text-center w-full py-2 px-1 sm:px-4 rounded-full text-[#262626] text-sm sm:text-base font-medium cursor-pointer">
                                    Business sign-in
                                </Link>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="User Name"
                                    className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                    {...register('username', { required: 'User name is required' })}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-sm text-red-500 ml-4">{errors.username.message}</p>
                            )}

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

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type={confirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                    {...register('conpassword', {
                                        required: 'Confirm password is required',
                                        validate: (val) =>
                                            val === watch('password') || 'Passwords do not match',
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 cursor-pointer"
                                    onClick={() => setConfirmPassword(!confirmPassword)}>
                                    {confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.conpassword && (
                                <p className="text-sm text-red-500 ml-4">{errors.conpassword.message}</p>
                            )}
                            <div className="space-y-2 px-1">
                                <div className="flex items-start gap-3">
                                    <input
                                        id="termsAccepted"
                                        type="checkbox"
                                        className="sr-only"
                                        {...register('termsAccepted', {
                                            required: 'Please agree to the Terms of Service',
                                        })}
                                    />
                                    <label
                                        htmlFor="termsAccepted"
                                        className={`mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-sm border transition-all ${agreedToTerms
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-slate-300 bg-white text-transparent'
                                            } cursor-pointer`}
                                    >
                                        <Check size={16} />
                                    </label>
                                    <p className="text-sm leading-6 font-medium text-[#737373]">
                                        I accept all{' '}
                                        <button
                                            type="button"
                                            onClick={() => setShowLegalModal(true)}
                                            className='text-sm text-primary font-semibold cursor-pointer transition-colors hover:text-secondary'
                                        >
                                            Legal agreements
                                        </button>
                                    </p>
                                </div>
                                {errors.termsAccepted && (
                                    <p className="text-sm text-red-500 ml-9">{errors.termsAccepted.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-full shadow-md cursor-pointer flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                                ) : (
                                    <span className="font-medium text-lg">Sign Up</span>
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
                            <span className="text-[#000000]">Already have an account? </span>
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Business Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {showLegalModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6">
                    <div className="relative w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-2xl">

                        {/* Close Button */}
                        <button
                            type="button"
                            aria-label="Close legal agreements modal"
                            onClick={() => setShowLegalModal(false)}
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F7FD] text-slate-500 transition-colors hover:bg-[#EAF7EE] hover:text-primary"
                        >
                            <X size={18} />
                        </button>

                        {/* Header */}
                        <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                                Yepp Ads
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-[#262626]">
                                Legal Agreements
                            </h2>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-[#737373]">
                                Please read these terms carefully before using Yepp Ads platform.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="max-h-[65vh] space-y-6 overflow-y-auto px-6 py-6 sm:px-8">

                            {/* 1 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    1. Acceptance of Terms
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    By using Yepp Ads, you agree to our Terms & Conditions and Privacy Policy.
                                    If you do not agree, you must not use the platform.
                                </p>
                            </div>

                            {/* 2 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    2. Services
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    Yepp Ads allows users to browse deals freely. Shop owners can post coupons,
                                    discounts, and offers using a paid subscription.
                                </p>
                            </div>

                            {/* 3 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    3. Shop Owner Responsibility
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    Shop owners are responsible for ensuring all deals are accurate, valid,
                                    and legally compliant. Expired or false deals must be removed immediately.
                                </p>
                            </div>

                            {/* 4 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    4. Prohibited Content
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    You must not post misleading, illegal, abusive, or copyrighted content.
                                    Violations may result in removal or account suspension.
                                </p>
                            </div>

                            {/* 5 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    5. Subscription & Payment
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    Shop owners must purchase a subscription to post deals. Payments are
                                    non-refundable and pricing may change with notice.
                                </p>
                            </div>

                            {/* 6 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    6. No Guarantee
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    Yepp Ads does not guarantee deal accuracy, availability, or merchant fulfillment.
                                    Users must verify details before purchasing.
                                </p>
                            </div>

                            {/* 7 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    7. Analytics & Data
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    We use Google Analytics to improve user experience. This may collect
                                    browsing data such as IP address and device information.
                                </p>
                            </div>

                            {/* 8 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    8. Termination
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    We may suspend or terminate access for violations of these terms. No refunds
                                    will be provided after termination.
                                </p>
                            </div>

                            {/* 9 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    9. Updates
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    We may update these terms at any time. Continued use of Yepp Ads means
                                    you accept the updated version.
                                </p>
                            </div>

                            {/* 10 */}
                            <div>
                                <h3 className="text-base font-semibold text-[#262626]">
                                    10. Contact
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#737373]">
                                    For questions, contact us at{" "}
                                    <span className="font-medium text-primary">support@yeppads.com</span>
                                </p>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex justify-end border-t border-slate-200 px-6 py-4 sm:px-8">
                            <button
                                type="button"
                                onClick={() => setShowLegalModal(false)}
                                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary"
                            >
                                I Understand
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Register;

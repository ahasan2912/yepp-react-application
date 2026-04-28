import { XCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PaymentCancel = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dealId = params.get("deal_id");

    const brandRed = "bg-primary";
    const brandRedHover = "hover:bg-secondary";
    const brandText = "text-[#ef4444]";
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl max-w-md w-full p-10 text-center border border-red-50">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-50 rounded-full">
                        <XCircle
                            size={64}
                            className={`${brandText} animate-pulse`}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Payment Cancelled
                </h1>
                <p className="text-gray-500 mt-3 leading-relaxed">
                    Your payment was cancelled or not completed.
                    You can try again anytime from the deal page.
                </p>
                <div className="mt-8 flex flex-col gap-4">
                    <Link
                        to={`/create-deal-plan/${dealId}`}
                        className={`${brandRed} ${brandRedHover} text-white py-3.5 rounded-xl font-semibold transition-all shadow-md`}>
                        Try Payment Again
                    </Link>
                    <Link
                        to="/my-deals"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3.5 rounded-xl font-semibold transition-all">
                        Go to My Deals
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
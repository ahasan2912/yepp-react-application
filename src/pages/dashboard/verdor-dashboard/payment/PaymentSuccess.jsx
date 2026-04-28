import { CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dealId = params.get("deal_id");
    const transectionId = params.get("tr_id");
    const brandTeal = "bg-primary";
    const brandTealHover = "hover:bg-secondary";
    const brandText = "text-primary";

    console.log(dealId, transectionId);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] px-4">
            <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl max-w-md w-full p-10 text-center border border-blue-50">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-cyan-50 rounded-full">
                        <CheckCircle
                            size={64}
                            className={`${brandText} animate-pulse`}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Payment Successful!
                </h1>
                <p className="text-gray-500 mt-3 leading-relaxed">
                    Thank you for your purchase. Your deal is now available under "My Deals" section.
                </p>
                <div className="bg-gray-50 rounded-2xl p-5 mt-8 border border-gray-100">
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                        Transaction Id
                    </p>
                    <p className="text-sm font-mono break-all text-gray-700 mt-2">
                        {transectionId}
                    </p>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                    <Link
                        to="/my-deals"
                        className={`${brandTeal} ${brandTealHover} text-white py-3.5 rounded-xl font-semibold transition-all shadow-md shadow-cyan-100`}>
                        View Deals List
                    </Link>
                    <Link
                        to={`/deal-details/${dealId}`}
                        className={`bg-primary hover:bg-secondary text-white py-3.5 rounded-xl font-semibold transition-all shadow-md`}>
                        View Deal Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
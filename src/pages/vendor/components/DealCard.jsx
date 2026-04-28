import { Eye } from "lucide-react";
import Countdown from "../../home/deals/Countdown";
import { Link } from "react-router-dom";
import { getDealPricing } from "../../../utils/dealPricing";

const DealCard = ({ deal }) => {
    const { _id, images, promotedUntil, reguler_price, discount, totalViews, activePromotion } = deal || {};
    const { regularPrice, finalPrice, hasDiscount } = getDealPricing(reguler_price, discount);
    const now = new Date();
    const expiredDeal = new Date(deal?.promotedUntil) < now && activePromotion !== null;
    const activeDeal = new Date(deal?.promotedUntil) >= now && activePromotion !== null;
    const newDeal = activePromotion === null;

    return (
        <Link to={`/deal-details/${_id}`} className="flex h-full flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-hover hover:shadow-md">
            <div className="relative h-48 w-full">
                <img
                    src={images?.[0] || "/no-image.png"}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white shadow-lg text-primary text-sm font-bold px-1.5 py-1 rounded">
                    <div className="flex items-center gap-1">
                        <Eye size={20} />
                        <span>{String(totalViews || 0).padStart(2, "0")}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {deal.title}
                </h3>
                <div className="mt-3 flex flex-1 flex-col gap-2">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-xl font-bold text-[#262626]">
                            ${finalPrice.toFixed(2)}
                        </span>

                        {hasDiscount && (
                            <span className="text-sm text-[#A3A3A3] font-medium line-through">
                                ${regularPrice.toFixed(1)}
                            </span>
                        )}
                    </div>
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                        {
                            activeDeal && <Countdown countdown={promotedUntil} />
                        }
                        {
                            expiredDeal && <div className="max-w-full rounded-full border border-[#BEE6C2] bg-[#F0F9FF] px-2.5 py-1 text-xs font-bold text-primary">
                                Expired
                            </div>
                        }
                        {
                            newDeal && <div className="inline-flex max-w-full rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">
                                Not Promoted Deal Yet
                            </div>
                        }
                    </div>
                </div>
                <div className="mt-3 block w-full bg-primary hover:bg-secondary text-white text-center font-semibold py-2.5 rounded-full transition-colors text-sm cursor-pointer">
                    Redeem Now
                </div>
            </div>
        </Link>
    );
};

export default DealCard;

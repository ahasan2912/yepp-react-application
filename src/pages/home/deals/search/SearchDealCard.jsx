import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import Countdown from "../Countdown";
import { getDealPricing } from "../../../../utils/dealPricing";

const SearchDealCard = ({ deal }) => {
    const { _id, title, images, discount, reguler_price, promotedUntil } = deal?.deal || {};
    const image = images?.[0];
    const distanceMiles = (Number(deal?.distance) || 0) / 1609.344;
    const { regularPrice, finalPrice, discount: dealDiscount, hasDiscount } = getDealPricing(reguler_price, discount);
    return (
        <Link to={`/deal-details/${_id}`} className="flex h-full flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-hover hover:shadow-md">
            <div className="relative h-48 w-full">
                <img
                    src={image || "/no-image.png"}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        {dealDiscount}% off
                    </div>
                )}
                <div className="absolute bottom-3 left-3 text-white text-xs bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    &bull; {distanceMiles.toFixed(2)} miles away
                </div>
            </div>

            <div className="flex flex-1 flex-col px-2 py-4">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {title}
                </h3>

                <div className="mt-2 flex min-w-0 items-center gap-1 text-sm text-[#A3A3A3]">
                    <span className="shrink-0 opacity-70"><Store size={17} className="text-[#A3A3A3]" aria-hidden="true" /></span>
                    <span className="min-w-0 truncate">{deal?.shop?.business_name}</span>
                </div>

                <div className="mt-3 flex min-w-0 flex-wrap items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-xl font-bold text-[#262626]">
                            ${finalPrice.toFixed(2)}
                        </span>

                        {hasDiscount && (
                            <span className="text-sm text-[#A3A3A3] font-medium line-through">
                                ${regularPrice.toFixed(1)}
                            </span>
                        )}
                    </div>
                    <Countdown countdown={promotedUntil} />
                </div>
                <span className="mt-auto block w-full bg-primary hover:bg-secondary text-white text-center font-semibold py-2.5 rounded-full transition-colors text-sm cursor-pointer">
                    Redeem Now
                </span>
            </div>
        </Link>
    );
};

export default SearchDealCard;

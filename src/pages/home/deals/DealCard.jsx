import { Store } from "lucide-react";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";
import { getDealPricing } from "../../../utils/dealPricing";

const DealCard = ({ deal, compact = false, imageSize = "normal" }) => {
    const {
        _id, title, reguler_price, discount, distance, promotedUntil, shop
    } = deal || {};
    const image = deal?.images?.[0];
    const { regularPrice: price, finalPrice, discount: dealDiscount, hasDiscount } = getDealPricing(reguler_price, discount);
    const dealDistance = Number(distance) || 0;
    const distanceMiles = dealDistance / 1609.344;

    if (compact) {
        const imageHeight = imageSize === "tall" ? "h-56 min-[501px]:h-44" : "h-36 min-[501px]:h-44";

        return (
            <Link to={`/deal-details/${_id}`} className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-hover hover:shadow-md">
                <div className={`relative w-full ${imageHeight}`}>
                    <img
                        src={image || "/no-image.png"}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                    {hasDiscount && (
                        <div className="absolute left-2 top-2 rounded bg-primary px-2 py-1 text-xs font-bold text-white">
                            {dealDiscount}% off
                        </div>
                    )}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-medium text-white">
                        <span aria-hidden="true">&bull;</span>
                        <span>{distanceMiles.toFixed(1)} miles away</span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-2">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#262626] sm:text-base">
                        {title}
                    </h3>

                    <div className="mt-2 flex min-w-0 items-center gap-1 text-xs text-[#A3A3A3] sm:text-sm">
                        <Store size={14} className="shrink-0 text-[#A3A3A3]" aria-hidden="true" />
                        <span className="min-w-0 truncate">{shop?.business_name}</span>
                    </div>

                    <div className="mt-2 flex min-w-0 flex-wrap items-start justify-between gap-2">
                        <div className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-0.5">
                            <span className="text-lg font-bold text-[#262626] sm:text-xl">
                                ${finalPrice.toFixed(0)}
                            </span>

                            {hasDiscount && (
                                <span className="text-xs font-medium text-[#A3A3A3] line-through sm:text-sm">
                                    ${price.toFixed(0)}
                                </span>
                            )}
                        </div>
                        <Countdown countdown={promotedUntil} compact />
                    </div>

                    <span className="mt-auto block w-full rounded-full bg-primary py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-secondary">
                        Redeem Now
                    </span>
                </div>
            </Link>
        );
    }

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

            <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {title}
                </h3>

                <div className="mt-2 flex min-w-0 items-center gap-1 text-sm text-[#A3A3A3]">
                    <Store size={17} className="shrink-0 text-[#A3A3A3]" aria-hidden="true" />
                    <span className="min-w-0 truncate">{shop?.business_name}</span>
                </div>

                <div className="mt-3 flex min-w-0 flex-wrap items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-0.5">
                        <span className="text-lg font-bold text-[#262626]">
                            ${finalPrice.toFixed(2)}
                        </span>

                        {hasDiscount && (
                            <span className="text-sm text-[#A3A3A3] font-medium line-through">
                                ${price.toFixed(2)}
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

export default DealCard;

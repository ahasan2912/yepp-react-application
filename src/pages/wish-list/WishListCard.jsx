import { Link, useNavigate } from "react-router-dom";
import Countdown from "../home/deals/Countdown";
import { Heart, Store } from "lucide-react";
import { getDealPricing } from "../../utils/dealPricing";

const WishListCard = ({ deal, handleDeleteWistListId }) => {
    const navigate = useNavigate();
    const {
        _id, title, reguler_price, discount, promotedUntil, shop, activePromotion } = deal || {};
    const dealDetailsPath = `/deal-details/${_id}`;
    const image = deal?.images?.[0];
    const now = new Date();

    const expiredDeal = new Date(deal?.promotedUntil) < now && activePromotion !== null;
    const activeDeal = new Date(deal?.promotedUntil) >= now && activePromotion !== null;

    const handleCardClick = () => {
        navigate(dealDetailsPath);
    };

    const handleCardKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate(dealDetailsPath);
        }
    };

    const handleWishListId = (event, id) => {
        event.stopPropagation();
        handleDeleteWistListId?.(id);
    };

    const { regularPrice: price, finalPrice, discount: dealDiscount, hasDiscount } = getDealPricing(reguler_price, discount);

    return (
        <div
            className="flex h-full flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-hover hover:shadow-md cursor-pointer"
            onClick={handleCardClick}
            onKeyDown={handleCardKeyDown}
            role="link"
            tabIndex={0}
        >
            <div className="relative h-48 w-full">
                <img
                    src={image || "/no-image.png"}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="flex justify-between">
                    {hasDiscount && (
                        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                            {dealDiscount}% off
                        </div>
                    )}
                    <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded
                         ${new Date(promotedUntil) < now ? 'bg-[#e9e2e2] text-[#737373]' : 'bg-primary text-white'}`}> {new Date(promotedUntil) < now ? 'Expired' : 'Available'}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-[#262626] line-clamp-2 leading-tight">
                        {deal.title}
                    </h3>
                    <button
                        type="button"
                        aria-label="Remove from saved deals"
                        className="text-right cursor-pointer border-0 bg-transparent p-0"
                        onClick={(event) => handleWishListId(event, deal?._id)}
                        onKeyDown={(event) => event.stopPropagation()}
                    >
                        <Heart className="fill-primary text-primary" size={20} />
                    </button>
                </div>

                <div className="mt-2 flex min-w-0 items-center gap-1 text-sm text-[#A3A3A3]">
                    <span className="shrink-0 opacity-70"><Store size={17} className="text-[#A3A3A3]" /></span>
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
                    {
                        activeDeal && <Countdown countdown={promotedUntil} />
                    }
                    {
                        expiredDeal && <div className="rounded-full border border-[#BEE6C2] bg-[#F0F9FF] px-2.5 py-1 text-xs font-bold text-primary">
                            Expired
                        </div>
                    }
                </div>

                {/* Action Button */}
                <Link to={dealDetailsPath} onClick={(event) => event.stopPropagation()} className="mt-auto block pt-4">
                    <span className="block w-full bg-primary hover:bg-secondary text-white text-center font-semibold py-2.5 rounded-full transition-colors text-sm cursor-pointer">
                        Redeem Now
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default WishListCard;

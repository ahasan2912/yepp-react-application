import { NavLink } from "react-router-dom";

const CategoryLink = ({ category, variant = "header" }) => {
    const categoryName = category?.category_name || "Category";
    const categoryImage = category?.category_image;
    const to = `/categori-details/${category?._id}`;

    if (variant === "card") {
        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex flex-col items-center gap-2 text-center transition-colors ${isActive
                        ? "text-primary"
                        : "text-[#262626] hover:text-secondary"
                    }`
                }>
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F0F9FF] transition-colors sm:h-24 sm:w-24">
                    <img className="h-10 w-10 object-contain sm:h-12 sm:w-12" src={categoryImage} alt={`${categoryName} category`} />
                </div>
                <span className="max-w-24 text-sm font-semibold leading-5 sm:text-base">
                    {categoryName}
                </span>
            </NavLink>
        );
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex w-full min-w-0 flex-col items-center gap-1 text-center transition-colors ${isActive
                    ? "text-primary"
                    : "text-[#262626] hover:text-secondary"
                }`
            }
        >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E0F2FE] transition-colors sm:h-10 sm:w-10 md:h-11 md:w-11">
                <img className="h-5 w-5 object-contain sm:h-6 sm:w-6 md:h-7 md:w-7" src={categoryImage} alt={`${categoryName} category`} />
            </div>
            <div className="w-full max-w-full truncate whitespace-nowrap text-[10px] font-semibold leading-3 sm:text-xs">
                {categoryName}
            </div>
        </NavLink>
    );
};

export default CategoryLink;

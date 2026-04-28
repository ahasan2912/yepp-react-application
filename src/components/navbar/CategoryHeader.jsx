import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../features/categories/CategoriesApi';
import CategoryLink from '../categories/CategoryLink';
import CategoriesSkeleton from '../skeleton/CategoriesSkeleton';

const DESKTOP_BREAKPOINT = 1024;
const DESKTOP_COLUMNS = 10;
const ROW_COUNT = 2;
const MIN_COLUMNS = 3;
const MOBILE_ITEM_WIDTH = 64;
const TABLET_ITEM_WIDTH = 72;
const MOBILE_GAP = 8;
const TABLET_GAP = 12;

const CategoryHeader = () => {
    const { data: categories, isLoading } = useGetAllCategoriesQuery();
    const categoryNavRef = useRef(null);
    const [columnsPerRow, setColumnsPerRow] = useState(DESKTOP_COLUMNS);

    useEffect(() => {
        if (isLoading) return;

        const categoryNav = categoryNavRef.current;
        if (!categoryNav) return;

        const updateColumnsPerRow = () => {
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                setColumnsPerRow(DESKTOP_COLUMNS);
                return;
            }

            const itemWidth = window.innerWidth < 640 ? MOBILE_ITEM_WIDTH : TABLET_ITEM_WIDTH;
            const gap = window.innerWidth < 640 ? MOBILE_GAP : TABLET_GAP;
            const nextColumns = Math.floor((categoryNav.clientWidth + gap) / (itemWidth + gap));

            setColumnsPerRow(Math.min(
                DESKTOP_COLUMNS,
                Math.max(MIN_COLUMNS, nextColumns || MIN_COLUMNS)
            ));
        };

        updateColumnsPerRow();

        let resizeObserver;
        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(updateColumnsPerRow);
            resizeObserver.observe(categoryNav);
        }

        window.addEventListener("resize", updateColumnsPerRow);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", updateColumnsPerRow);
        };
    }, [isLoading]);

    if (isLoading) {
        return <CategoriesSkeleton />
    }

    const categoryList = categories?.data ?? [];
    const visibleCategories = categoryList.slice(0, columnsPerRow * ROW_COUNT);
    const showTwoRows = categoryList.length > columnsPerRow;
    const gridColumnCount = showTwoRows
        ? columnsPerRow
        : Math.max(visibleCategories.length, 1);

    return (
        <div className='fixed w-full bg-[#F0F9FF] px-3 pt-22 pb-2 shadow-sm sm:px-4 z-40'>
            <div className="max-w-305 mx-auto flex items-center gap-3 py-2.5 sm:gap-4 sm:py-3">
                <nav
                    ref={categoryNavRef}
                    aria-label="Deal categories"
                    style={{ gridTemplateColumns: `repeat(${gridColumnCount}, minmax(0, 1fr))` }}
                    className={`no-scrollbar grid min-w-0 flex-1 justify-items-center gap-x-2 overflow-hidden pb-1 pr-1 sm:gap-x-3 lg:gap-x-4 ${showTwoRows
                        ? "max-h-28 grid-rows-2 gap-y-2 sm:max-h-33 sm:gap-y-3"
                        : "max-h-15 grid-rows-1 sm:max-h-17"
                    }`}>
                    {visibleCategories.map((cat) => (
                        <CategoryLink key={cat._id} category={cat} />
                    ))}
                </nav>

                <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                        `shrink-0 rounded-full px-2 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${isActive
                            ? "bg-primary text-white"
                            : "bg-[#f0f9ff] text-primary hover:bg-[#E0F2FE]"
                        }`
                    }>
                    See all
                </NavLink>
            </div>
        </div>
    );
};

export default CategoryHeader;

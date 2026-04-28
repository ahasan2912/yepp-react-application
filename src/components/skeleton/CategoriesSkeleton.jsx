const CategoriesSkeleton = () => {
    const navItems = Array.from({ length: 20 }, (_, index) => index + 1);

    return (
        <div className="bg-[color-mix(in_srgb,var(--primary-color)_10%,white)] px-4 fixed w-full pt-22 pb-2 z-40" role="status" aria-label="Loading categories">
            <span className="sr-only">Loading categories</span>
            <div className="max-w-305 mx-auto flex items-center gap-3 py-2.5 sm:gap-4 sm:py-3" aria-hidden="true">
                <div className="no-scrollbar grid max-h-[112px] min-w-0 flex-1 grid-cols-[repeat(auto-fit,minmax(64px,1fr))] grid-rows-2 justify-items-center gap-x-2 gap-y-2 overflow-hidden pb-1 pr-1 sm:max-h-[132px] sm:grid-cols-[repeat(auto-fit,minmax(72px,1fr))] sm:gap-x-3 sm:gap-y-3 lg:grid-cols-[repeat(10,minmax(0,1fr))] lg:gap-x-4">
                    {navItems.map((item) => (
                        <div key={item} className="flex w-full min-w-0 flex-col items-center gap-1">
                            <div className="skeleton-item h-8 w-8 shrink-0 rounded-full bg-slate-300 sm:h-10 sm:w-10 md:h-11 md:w-11"></div>
                            <span className="skeleton-text h-3 w-full max-w-20 rounded bg-slate-300"></span>
                        </div>
                    ))}
                </div>
                <div className="h-8 w-13 shrink-0 rounded-full bg-slate-300 sm:h-9 sm:w-20"></div>
            </div>
        </div>
    );
};

export default CategoriesSkeleton;

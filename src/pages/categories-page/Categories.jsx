import { useEffect } from "react";
import CategoryLink from "../../components/categories/CategoryLink";
import { useGetAllCategoriesQuery } from "../../features/categories/CategoriesApi";
import { useGsapAnimations } from "../../hooks/useGsapAnimations";

const Categories = () => {
    const { data: categories, isLoading } = useGetAllCategoriesQuery();
    const categoryList = categories?.data ?? [];
    const animationScopeRef = useGsapAnimations(`categories-${categoryList.length}`);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isLoading) {
        return (
            <div className="bg-gray-50 min-h-[calc(100vh-200px)] px-4 pb-12 pt-28" role="status" aria-label="Loading categories">
                <span className="sr-only">Loading categories</span>
                <div className="max-w-305 mx-auto">
                    <div className="mb-6 h-8 w-52 rounded bg-slate-300"></div>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                        {Array.from({ length: 20 }, (_, index) => (
    <div key={index} className="flex flex-col items-center gap-2">
        <div className="h-20 w-20 rounded-full bg-slate-300 sm:h-24 sm:w-24"></div>
        <div className="h-4 w-20 rounded bg-slate-300"></div>
    </div>
))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main ref={animationScopeRef} className="bg-gray-50 min-h-[calc(100vh-230px)] px-4 pb-12 pt-28" data-animate="fade-up">
            <div className="max-w-305 mx-auto">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between" data-animate="fade-up">
                    <div>
                        <p className="text-base font-semibold text-primary">Categories</p>
                        <h1 className="text-2xl font-bold text-[#262626] sm:text-[32px]">
                            Browse deals by category
                        </h1>
                    </div>
                    <p className="text-sm font-medium text-primary">
                        {categoryList.length} categories
                    </p>
                </div>

                {categoryList.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8" data-animate="stagger">
                        {categoryList.map((category) => (
                            <CategoryLink key={category._id} category={category} variant="card" />
                        ))}
                    </div>
                ) : (
                    <div className="min-h-[20vh] rounded-lg border border-[#E0F2FE] bg-white px-4 py-10 text-center">
                        <p className="text-base font-semibold text-gray-600">No categories found</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Categories;

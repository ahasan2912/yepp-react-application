const InitialPageLoader = () => {
    const categoryItems = Array.from({ length: 8 });
    const dealCards = Array.from({ length: 8 });

    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            <div className="fixed top-0 left-0 right-0 z-50 bg-[color-mix(in_srgb,var(--primary-color)_12%,white)] px-4 py-5">
                <div className="max-w-305 mx-auto flex items-center justify-between">
                    <div className="h-12 w-36 rounded-md bg-white/80" />
                    <div className="hidden md:flex items-center gap-3">
                        <div className="h-5 w-72 rounded-full bg-white/70" />
                        <div className="h-10 w-24 rounded-full bg-[color-mix(in_srgb,var(--primary-color)_35%,white)]" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-7 w-7 rounded-full bg-white/80" />
                        <div className="h-7 w-7 rounded-full bg-white/80" />
                    </div>
                </div>
            </div>

            <div className="fixed top-20 left-0 right-0 z-40 bg-[color-mix(in_srgb,var(--primary-color)_8%,white)] px-4">
                <div className="max-w-305 mx-auto py-3 flex items-center gap-5 overflow-hidden">
                    {categoryItems.map((_, index) => (
                        <div key={index} className="flex shrink-0 items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-[color-mix(in_srgb,var(--primary-color)_18%,white)]" />
                            <div className="h-4 w-24 rounded-full bg-[color-mix(in_srgb,var(--primary-color)_18%,white)]" />
                        </div>
                    ))}
                </div>
            </div>

            <main className="pt-32">
                <section className="bg-slate-200 px-4 min-h-[60vh]">
                    <div className="max-w-305 mx-auto flex h-full min-h-[60vh] flex-col justify-center py-20">
                        <div className="h-12 w-full max-w-115 rounded-lg bg-white/70" />
                        <div className="mt-4 h-12 w-full max-w-96 rounded-lg bg-white/60" />
                        <div className="mt-5 h-5 w-full max-w-150 rounded-full bg-white/60" />
                        <div className="mt-10 flex w-full max-w-220 flex-col gap-3 rounded-lg bg-white p-3 shadow-sm sm:flex-row">
                            <div className="h-12 flex-1 rounded-md bg-gray-100" />
                            <div className="h-12 flex-1 rounded-md bg-gray-100" />
                            <div className="h-12 w-full rounded-md bg-primary sm:w-36" />
                        </div>
                    </div>
                </section>

                <section className="px-4 py-12">
                    <div className="max-w-305 mx-auto">
                        <div className="mb-6 h-8 w-48 rounded-md bg-gray-200" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {dealCards.map((_, index) => (
                                <div key={index} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                                    <div className="h-44 bg-gray-200" />
                                    <div className="space-y-3 p-4">
                                        <div className="h-5 w-3/4 rounded-md bg-gray-200" />
                                        <div className="h-4 w-full rounded-md bg-gray-100" />
                                        <div className="h-4 w-2/3 rounded-md bg-gray-100" />
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="h-6 w-20 rounded-full bg-[color-mix(in_srgb,var(--primary-color)_18%,white)]" />
                                            <div className="h-9 w-24 rounded-md bg-primary" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default InitialPageLoader;

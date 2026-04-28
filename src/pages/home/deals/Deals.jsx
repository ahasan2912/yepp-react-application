import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetAllDealQuery, useLazyGetAllDealQuery } from '../../../features/deal/dealApi';
import { DealCardSkeleton } from '../../../components/skeleton/DealCardSkeleton';
import DealCard from './DealCard';
import useUserLocation from '../../../hooks/useUserLocation';
import DynamicLocation from '../../../components/location/DynamicLocation';
import { useGsapAnimations } from '../../../hooks/useGsapAnimations';
const DEALS_PER_BATCH = Number(import.meta.env.VITE_ROWS_PER_PAGE) || 8;

const getDealsFromResponse = (response) => response?.data?.deals ?? [];

const getTotalDealsCount = (response) => {
    const total = response?.data?.meta?.total
        ?? response?.data?.total
        ?? response?.data?.totalDeals
        ?? response?.meta?.total
        ?? response?.total;

    return Number.isFinite(Number(total)) ? Number(total) : null;
};

const getDealId = (deal) => deal?._id ?? deal?.deal?._id;

const mergeUniqueDeals = (...dealLists) => {
    const seenIds = new Set();
    const mergedDeals = [];

    dealLists.flat().forEach((deal) => {
        const dealId = getDealId(deal);

        if (dealId && seenIds.has(dealId)) return;
        if (dealId) seenIds.add(dealId);

        mergedDeals.push(deal);
    });

    return mergedDeals;
};

const createLoadedState = (listKey) => ({
    hasMore: true,
    isLoadingMore: false,
    items: [],
    listKey,
    nextPage: 2,
});

const Deals = () => {
    const { latitude, longitude } = useUserLocation();
    const { data: totalDeals, isLoading } = useGetAllDealQuery({
        latitude,
        limit: DEALS_PER_BATCH,
        longitude,
        page: 1,
    });
    const [loadDealPage] = useLazyGetAllDealQuery();
    const [loadedState, setLoadedState] = useState(createLoadedState(""));
    const loadedStateRef = useRef(loadedState);
    const loadMoreRef = useRef(null);
    const firstPageDeals = getDealsFromResponse(totalDeals);
    const totalDealsCount = getTotalDealsCount(totalDeals);
    const listKey = `${latitude ?? ""}-${longitude ?? ""}-${DEALS_PER_BATCH}`;
    const currentLoadedState = loadedState.listKey === listKey ? loadedState : createLoadedState(listKey);
    const allDeals = useMemo(
        () => mergeUniqueDeals(firstPageDeals, currentLoadedState.items),
        [currentLoadedState.items, firstPageDeals]
    );
    const hasMoreDeals = totalDealsCount !== null
        ? allDeals.length < totalDealsCount
        : firstPageDeals.length >= DEALS_PER_BATCH && currentLoadedState.hasMore;
    const animationScopeRef = useGsapAnimations(`deals-${listKey}-${firstPageDeals.length}`);

    useEffect(() => {
        loadedStateRef.current = loadedState;
    }, [loadedState]);

    useEffect(() => {
        if (!hasMoreDeals || !loadMoreRef.current) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                const latestState = loadedStateRef.current.listKey === listKey
                    ? loadedStateRef.current
                    : createLoadedState(listKey);

                if (latestState.isLoadingMore || !latestState.hasMore) return;

                const nextPage = latestState.nextPage;

                setLoadedState({
                    ...latestState,
                    isLoadingMore: true,
                });

                loadDealPage({
                    latitude,
                    limit: DEALS_PER_BATCH,
                    longitude,
                    page: nextPage,
                }).unwrap().then((response) => {
                    const nextPageDeals = getDealsFromResponse(response);
                    const responseTotal = getTotalDealsCount(response);

                    setLoadedState((currentState) => {
                        const baseState = currentState.listKey === listKey
                            ? currentState
                            : createLoadedState(listKey);
                        const mergedItems = mergeUniqueDeals(baseState.items, nextPageDeals);
                        const loadedCount = firstPageDeals.length + mergedItems.length;
                        const hasMoreFromTotal = responseTotal !== null
                            ? loadedCount < responseTotal
                            : nextPageDeals.length >= DEALS_PER_BATCH;

                        return {
                            ...baseState,
                            hasMore: hasMoreFromTotal,
                            isLoadingMore: false,
                            items: mergedItems,
                            nextPage: nextPage + 1,
                        };
                    });
                }).catch(() => {
                    setLoadedState((currentState) => ({
                        ...(currentState.listKey === listKey ? currentState : createLoadedState(listKey)),
                        isLoadingMore: false,
                    }));
                });
            },
            { rootMargin: "240px 0px" }
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [firstPageDeals.length, hasMoreDeals, latitude, listKey, loadDealPage, longitude]);

    if (isLoading) {
        return <DealCardSkeleton />
    }

    const dealColumns = allDeals.reduce(
        (columns, deal, index) => {
            columns[index % 2].push({ deal, index });
            return columns;
        },
        [[], []]
    );

    return (
        <div ref={animationScopeRef} className="bg-gray-50 min-h-[10vh] px-4 py-12.5" data-animate="fade-up">
            <div className="max-w-305 mx-auto">
                <div className="flex items-start justify-between gap-2 mb-6" data-animate="fade-up">
                    <h2 className="text-base font-bold leading-tight text-[#262626] sm:text-2xl md:text-[28px]">Explore nearby</h2>
                    <DynamicLocation
                        latitude={latitude}
                        longitude={longitude}
                        className="flex max-w-[52%] items-start justify-end gap-1.5 text-right text-sm font-semibold leading-snug text-primary sm:max-w-none sm:items-center sm:gap-2 sm:text-base md:text-lg"
                        iconClassName="mt-0.5 h-4 w-4 shrink-0 sm:mt-0 sm:h-5 sm:w-5"
                    />
                </div>

                {totalDeals?.data?.deals?.length > 0 ? (
                    <>
                        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-5 lg:hidden" data-animate="stagger">
                            {dealColumns.map((column, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    className={`flex flex-col gap-3 sm:gap-5 ${columnIndex === 1 ? "max-[500px]:pt-5" : ""}`}
                                >
                                    {column.map(({ deal, index }) => (
                                        <DealCard
                                            key={deal?._id || index}
                                            deal={deal}
                                            compact
                                            imageSize={index % 3 === 1 ? "tall" : "normal"}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-3" data-animate="stagger">
                            {allDeals?.map((deal) => (
                                <DealCard key={deal?._id} deal={deal} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 min-h-[10vh] flex items-center justify-center">
                        <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                    </div>
                )}
                {allDeals.length > 0 && (
                    <div ref={loadMoreRef} className="min-h-12" aria-hidden="true" />
                )}
            </div>
        </div>
    );
};

export default Deals;

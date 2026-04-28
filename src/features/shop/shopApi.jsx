import apiSlice from "../api/apiSlice";

export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createShop: builder.mutation({
      query: (data) => ({
        url: "/shop/create_shop",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getShopAnalyticsStat: builder.query({
      query: () => ({
        url: "/shop/analytics",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),

    getShopChats: builder.query({
      query: (year) => ({
        url: `/shop/yearly_analytics?year=${year}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),

    getTopViewDeals: builder.query({
      query: () => ({
        url: `/service/top_viewed_deals`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),

    getShopDetails: builder.query({
      query: (id) => ({
        url: `/shop/shop_details?shopId=${id}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),

    getVendorDetails: builder.query({
      query: (id) => ({
        url: `/shop/shop_details?myId=${id}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),

    editshop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shop/update_shop/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

    editShopOutlet: builder.mutation({
      query: ({ outletId, data }) => ({
        url: `/outlet?outletId=${outletId}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

    shopApprovedEdit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shop/update_shop/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Shops"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetShopAnalyticsStatQuery,
  useGetShopChatsQuery,
  useGetTopViewDealsQuery,
  useGetShopDetailsQuery,
  useGetVendorDetailsQuery,
  useEditshopMutation,
  useEditShopOutletMutation,
  useShopApprovedEditMutation
} = shopApi;

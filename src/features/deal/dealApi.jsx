import apiSlice from "../api/apiSlice";

export const dealApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewDeal: builder.mutation({
            query: (data) => ({
                url: "/service",
                headers: {
                    "Content-Type": "application/formdata"
                },
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Deals"],
        }),
        getAllDeal: builder.query({
            query: ({ longitude, latitude, page = 1, limit = 10 }) => ({
                url: `/service/deals/${longitude}/${latitude}?page=${page}&limit=${limit}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Deals"],
        }),
        getDealDetails: builder.query({
            query: ({ id, longitude, latitude }) => ({
                url: `/service/${id}/${longitude}/${latitude}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, arg) => [
                { type: "Deal", id: arg.id },
            ],
        }),
        getDealAllDeals: builder.query({
            query: ({ searchText, longitude, latitude }) => ({
                url: `/service/deals/all_deals/${longitude}/${latitude}?searchTerm=${searchText?.query ? searchText.query : searchText?.zipCode}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["AllQueryDeals"],
        }),
        getAllSaveDeals: builder.query({
            query: (ids) => ({
                url: `/service/saved?ids=${ids.join(",")}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Deals"],
        }),
        getMyDeals: builder.query({
            query: ({ text, openTab }) => ({
                url: `/service/my_deals?deal_filter=${openTab}&join=shop-business_name|business_logo,category-category_name|category_logo&fields=title,images,reguler_price,discount,promotedUntil,activePromotion&page=1&limit=20&searchTerm=${text}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Deals"],
        }),
        editDeal: builder.mutation({
            query: ({ id, data }) => (
                {
                    url: `/service/${id}`,
                    headers: {
                        "Content-Type": "application/formdata"
                    },
                    method: "PATCH",
                    body: data,
                }),
            invalidatesTags: (result, error, arg) => [
                "Deals",
                { type: "Deal", id: arg.id }
            ]
        }),
        handleDeleteDeal: builder.mutation({
            query: (id) => ({
                url: `/service/${id}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ["Deals"],
        }),
    }),
});

export const { useGetAllDealQuery, useLazyGetAllDealQuery, useGetDealDetailsQuery, useGetDealAllDealsQuery, useGetAllSaveDealsQuery, useGetMyDealsQuery, useCreateNewDealMutation, useEditDealMutation, useHandleDeleteDealMutation } = dealApi;

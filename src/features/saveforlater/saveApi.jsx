import apiSlice from "../api/apiSlice";

export const saveForLaterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSaveForLaterDeal: builder.query({
            query: () => ({
                url: "",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["saveIds"],
        }),
    }),
});

export const { useGetAllSaveForLaterDealQuery } = saveForLaterApi;





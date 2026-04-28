import apiSlice from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewCategory: builder.mutation({
            query: (data) => ({
                url: "/category",
                headers: {
                    "Content-Type": "application/formdata"
                },
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Categories"],
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: "/category",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Categories"],
        }),
        getCategoryDetails: builder.query({
            query: ({ id, longitude, latitude }) => ({
                url: `/service/c/${id}?lng=${longitude}&lat=${latitude}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, arg) => [
                { type: "Category", id: arg },
            ],
        }),
        editCategories: builder.mutation({
            query: ({ id, data }) => (
                {
                    url: `/category/${id}`,
                    headers: {
                        "Content-Type": "application/formdata"
                    },
                    method: "PATCH",
                    body: data,
                }),
            invalidatesTags: (result, error, arg) => [
                "Categories",
                { type: "Category", id: arg.id }
            ]
        }),
        handleCategoriesDelete: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});

export const { useGetAllCategoriesQuery, useGetCategoryDetailsQuery, useCreateNewCategoryMutation, useHandleCategoriesDeleteMutation, useEditCategoriesMutation} = categoriesApi;





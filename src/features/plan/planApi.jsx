import apiSlice from "../api/apiSlice";

export const planApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewPlan: builder.mutation({
            query: (data) => ({
                url: "/plan",
                headers: {
                    "Content-Type": "application/formdata"
                },
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Plans"],
        }),
        getAllPlan: builder.query({
            query: () => ({
                url: "/plan",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Plans"],
        }),

        editPlan: builder.mutation({
            query: ({ id, data }) => (
                {
                    url: `/plan/${id}`,
                    headers: {
                        "Content-Type": "application/formdata"
                    },
                    method: "PATCH",
                    body: data,
                }),
            invalidatesTags: (result, error, arg) => [
                "Plans",
                { type: "Plan", id: arg.id }
            ]
        }),

        deletePlan: builder.mutation({
            query: (id) => ({
                url: `/plan/${id}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ["Plans"],
        }),
    }),
});

export const { useCreateNewPlanMutation, useGetAllPlanQuery, useEditPlanMutation, useDeletePlanMutation } = planApi;


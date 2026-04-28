import apiSlice from "../api/apiSlice";

export const couponApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createVoucher: builder.mutation({
            query: (data) => ({
                url: "/voucher",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["VoucherCodes"],
        }),
        getAllVoucherCode: builder.query({
            query: () => ({
                url: `/voucher`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["VoucherCodes"],
        }),
        getCouponCode: builder.query({
            query: (code) => ({
                url: `/voucher/apply_voucher?voucher_code=${code}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["VoucherCodes"],
        }),
        deleteVoucherCode: builder.mutation({
            query: (id) => ({
                url: `/voucher/${id}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ["VoucherCodes"],
        }),
        editVoucherCode: builder.mutation({
            query: ({ id, data }) => (
                {
                    url: `/voucher/${id}`,
                    method: "PATCH",
                    body: data,
                }),
            invalidatesTags: (result, error, arg) => [
                "VoucherCodes",
                { type: "VoucherCode", id: arg.id }
            ]
        }),
    }),
});

export const { useGetCouponCodeQuery, useGetAllVoucherCodeQuery, useCreateVoucherMutation, useDeleteVoucherCodeMutation, useEditVoucherCodeMutation } = couponApi;

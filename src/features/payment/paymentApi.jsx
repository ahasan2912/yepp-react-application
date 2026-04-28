import apiSlice from "../api/apiSlice";
export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        handlePayment: builder.mutation({
            query: (data) => ({
                url: "/payment/stripe_pay",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Payments"],
        }),
        getAllPayment: builder.query({
            query: ({
                sort = "New to Old",
                searchTerm = "",
                page = 1,
                limit = 10,
            } = {}) => {
                const params = new URLSearchParams();
                if (searchTerm.trim()) {
                    params.append("searchTerm", searchTerm);
                }
                params.append(
                    "sort",
                    sort === "Old to New" ? "createdAt" : "-createdAt"
                );
                params.append("page", page);
                params.append("limit", limit);

                return {
                    url: `/dashboard/latest_transactions?${params.toString()}&fields=deal,plan,transaction_id,amount,payment_method,provider,payment_status,createdAt&join=deal-title,plan-title`,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
    }),
});

export const { useHandlePaymentMutation, useGetAllPaymentQuery } = paymentApi;

// /dashboard/latest_transactions?searchTerm=TXN_1773381035613_x7waou2r5&fields=deal,plan,transaction_id,amount,payment_method,provider,payment_status,createdAt&join=deal-title,plan-title
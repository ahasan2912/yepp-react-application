import apiSlice from "../api/apiSlice";

export const verifyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        handleSendEmail: builder.mutation({
            query: (email) => ({
                url: "/user/verification_otp",
                method: "POST",
                body: email,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        handleSendOTPVerification: builder.mutation({
            query: (otpData) => ({
                url: "/user/verify_profile",
                method: "POST",
                body: otpData,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useHandleSendEmailMutation, useHandleSendOTPVerificationMutation } = verifyApi;
import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";
import { userLoggedIn } from "./authSlice";

export const saveTokensAndFetchUser = async (tokens, dispatch) => {
  const { accessToken, refreshToken } = tokens;
  Cookies.set("accessToken", accessToken, {
    expires: 5,
    secure: false,
    sameSite: "Strict",
  });

  Cookies.set("refreshToken", refreshToken, {
    expires: 5,
    secure: false,
    sameSite: "Strict",
  });

  const userResponse = await dispatch(
    authApi.endpoints.handleCurrentLoggedInUser.initiate(undefined, {
      forceRefetch: true,
    })
  ).unwrap();

  const user = userResponse?.data;

  if (user) {
    dispatch(userLoggedIn(user));
  }
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    handleRegister: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const tokens = result?.data?.data;
          // console.log(tokens);
          if (tokens) {
            await saveTokensAndFetchUser(tokens, dispatch);
          }
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),

    handleLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const tokens = result?.data?.data;
          if (tokens) {
            await saveTokensAndFetchUser(tokens, dispatch);
          }
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),

    handleCurrentLoggedInUser: builder.query({
      query: () => ({
        url: "/user/get_me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    forgetPassword: builder.query({
      query: (email) => ({
        url: `/auth/forget_password/${email}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    handleForgetPasswordOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/verify_otp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset_password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change_password",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useHandleRegisterMutation,
  useHandleLoginMutation,
  useHandleCurrentLoggedInUserQuery,
  useForgetPasswordQuery,
  useLazyForgetPasswordQuery,
  useHandleForgetPasswordOTPMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authApi;


// invalidatesTags: ["Products"]
import Cookies from "js-cookie";
import { baseQuery } from "./apiSlice";

export const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const refreshtoken = Cookies.get("refreshToken");
    if (refreshtoken) {
        if (result.error?.status === 500) {
            const refreshResult = await baseQuery(
                {
                    url: "/auth/generate_token",
                    method: "POST",
                    body: {
                        refreshToken: refreshtoken,
                    }
                },
                api,
                extraOptions
            );
            if (refreshResult?.data?.data) {
                const accessToken = refreshResult?.data?.data?.newAccessToken;
                const refreshToken = refreshResult?.data?.data?.newRefreshToken;

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

            } else {
                console("");
            }
        }
    }
    return result;
};

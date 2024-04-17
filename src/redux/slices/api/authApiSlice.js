import { apiSlice } from "../apiSlice";

const AUTH_URL = "/user";

export const authApiSlie = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlie;

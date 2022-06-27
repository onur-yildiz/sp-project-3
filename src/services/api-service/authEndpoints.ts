import api from ".";

enum AE { // Auth Endpoints
  Register = "auth/register",
  Login = "auth/login",
  Logout = "auth/logout",
}

const apiAuthEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, RegisterCredentials>({
      query: (credentials) => ({
        url: AE.Register,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: AE.Login,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.mutation<void, void>({
      query: (credentials) => ({
        url: AE.Logout,
        method: "GET",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  apiAuthEndpoints;

export default apiAuthEndpoints;

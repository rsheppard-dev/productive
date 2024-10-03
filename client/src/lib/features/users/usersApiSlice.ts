import { apiSlice } from "@/lib/api/apiSlice";
import { User } from "@/types/user";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser();
          const session = await fetchAuthSession();

          if (!session) throw new Error("No session found");

          const { userSub } = session;
          //   const { accessToken } = session.tokens ?? {};

          const userDetailsResponse = await fetchWithBQ(`/users/${userSub}`);
          const userDetails = userDetailsResponse.data as User;

          return { data: { user, userSub, userDetails } };
        } catch (error) {
          if (error instanceof Error) {
            return {
              error: {
                status: 500,
                data: error.message ?? "Could not fetch user data.",
              },
            };
          }
          return { error: { status: 500, data: "Could not fetch user data." } };
        }
      },
    }),
  }),
});

export const { useGetAuthUserQuery } = usersApiSlice;

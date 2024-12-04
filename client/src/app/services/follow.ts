import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: builder => {
    return {
      followUser: builder.mutation<void, { followingId: string }>({
        query: followingId => {
          return {
            url: "/follows",
            method: "POST",
            body: followingId,
          }
        },
      }),
      unfollowUser: builder.mutation<void, string>({
        query: userId => {
          return {
            url: `/follows/${userId}`,
            method: "DELETE",
          }
        },
      }),
    }
  },
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi

export const {
  endpoints: { followUser, unfollowUser },
} = followApi

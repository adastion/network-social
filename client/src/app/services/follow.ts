import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: builder => {
    return {
      followUser: builder.mutation<void, { followingId: string }>({
        query: followingId => {
          return {
            url: "/follow",
            method: "POST",
            body: followingId,
          }
        },
      }),
      unfollowUser: builder.mutation<void, string>({
        query: userId => {
          return {
            url: `/follow/${userId}`,
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

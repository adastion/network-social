import { api } from "./api"
import { Like } from "../types"

export const likesApi = api.injectEndpoints({
  endpoints: builder => {
    return {
      addLike: builder.mutation<Like, { postId: string }>({
        query: postId => {
          return {
            url: "/likes",
            method: "POST",
            body: postId,
          }
        },
      }),
      deleteLike: builder.mutation<void, string>({
        query: postId => {
          return {
            url: `/likes/${postId}`,
            method: "DELETE",
          }
        },
      }),
    }
  },
})

export const { useAddLikeMutation, useDeleteLikeMutation } = likesApi

export const {
  endpoints: { addLike, deleteLike },
} = likesApi

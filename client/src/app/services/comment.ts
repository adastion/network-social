import { Comment } from "../types"
import { api } from "./api"

export const commentsApi = api.injectEndpoints({
  endpoints: builder => {
    return {
      createComment: builder.mutation<Comment, Partial<Comment>>({
        query: newComment => {
          return {
            url: "/comments",
            method: "POST",
            body: newComment,
          }
        },
      }),
      deleteComment: builder.mutation<void, string>({
        query: id => {
          return {
            url: `/comments/${id}`,
            method: "DELETE",
          }
        },
      }),
    }
  },
})

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentsApi

export const {
  endpoints: { createComment, deleteComment },
} = commentsApi

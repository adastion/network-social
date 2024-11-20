import { Post } from "../types"
import { api } from "./api"

export const postApi = api.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<Post, { content: string }>({
        query: postData => {
          return {
            url: "/posts",
            method: "POST",
            body: postData,
          }
        },
      }),
      getAllPost: builder.query<Post[], void>({
        query: () => {
          return {
            url: "/posts",
            method: "GET",
          }
        },
      }),
      getPostById: builder.query<Post, string>({
        query: id => {
          return {
            url: `/posts/${id}`,
            method: "GET",
          }
        },
      }),
      deletePost: builder.mutation<void, string>({
        query: id => {
          return {
            url: `/posts/${id}`,
            method: "DELETE",
          }
        },
      }),
    }
  },
})

export const {
  useCreatePostMutation,
  useGetAllPostQuery,
  useLazyGetAllPostQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useDeletePostMutation,
} = postApi

export const {
  endpoints: { createPost, getAllPost, getPostById, deletePost },
} = postApi

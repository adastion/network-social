import { User } from "../types"
import { api } from "./api"

type TypeLogin = {
  email: string
  password: string
  name?: string
}

type TypeToken = {
  token: string
}

export const userApi = api.injectEndpoints({
  endpoints: builder => {
    return {
      register: builder.mutation<TypeLogin, TypeLogin>({
        query: userData => {
          return {
            url: "/register",
            method: "POST",
            body: userData,
          }
        },
      }),
      login: builder.mutation<TypeToken, TypeLogin>({
        query: userData => {
          return {
            url: "/login",
            method: "POST",
            body: userData,
          }
        },
      }),
      current: builder.query<User, void>({
        query: () => {
          return {
            url: "/current",
            method: "GET",
          }
        },
      }),
      getUserById: builder.query<User, string>({
        query: id => {
          return {
            url: `/users/${id}`,
            method: "GET",
          }
        },
      }),
      updateUser: builder.mutation<User, { userData: FormData, id: string }>({
        query: ({ userData, id }) => {
          return {
            url: `/users/${id}`,
            method: "PUT",
            body: userData,
          }
        },
      }),
    }
  },
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi

export const {
  endpoints: { register, login, current, getUserById, updateUser },
} = userApi

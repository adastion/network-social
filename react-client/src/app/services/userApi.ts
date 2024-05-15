import { User } from "../types"
import { api } from "./api"

type TypeUserData = {
  email: string
  password: string
  name: string
}

type TypeUserToken = {
  token: string
}

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<TypeUserToken, TypeUserData>({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<TypeUserData, TypeUserData>({
      query: userData => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    getUSerById: builder.query<User, string>({
      query: id => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUSerByIdQuery,
  useLazyGetUSerByIdQuery,
  useUpdateUserMutation,
} = userApi

export const {
  endpoints: { login, register, current, getUSerById, updateUser }
} = userApi

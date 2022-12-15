import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import {listPlayers, listGames} from "../../graphql/queries"
import { createGame, createPlayer } from "../../graphql/mutations";
import { ListGamesQuery, ListPlayersQuery, CreateGameMutation, CreatePlayerMutation, CreateGameMutationVariables, CreatePlayerMutationVariables } from "../../API"

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: "/graphql" }),
  tagTypes: ["players", "games"],
  endpoints: (builder) => ({
    listPlayers: builder.query<ListPlayersQuery, string>({
      //@ts-ignore
      queryFn: async () => {
        try {
          const res = await API.graphql(graphqlOperation(listPlayers)) as GraphQLResult<ListPlayersQuery>
          let sorted = res.data?.listPlayers?.sort((a,b) => {
            if (a!.rating > b!.rating) {
              return -1
            } else  {
              return 1
            }
          })
          return { data: {listPlayers: sorted} }
        } catch (error: any) {
          return { error }
        }
      },
      providesTags: ["players"]
    }),
    listGames: builder.query<ListGamesQuery, string>({
      //@ts-ignore
      queryFn: async () => {
        try {
          const res = await API.graphql(graphqlOperation(listGames)) as GraphQLResult<ListGamesQuery>
          let sorted = res.data?.listGames?.sort((a,b) => {
            //@ts-ignore
            if (a.time > b.time) {
              return -1
            } else  {
              return 1
            }
          })
          return { data: {listGames: sorted} }
        } catch (error: any) {
          return { error }
        }
      },
      providesTags: ["games"]
    }),
    createPlayer: builder.mutation<CreatePlayerMutation, CreatePlayerMutationVariables>({
      //@ts-ignore
      queryFn: async (input: CreatePlayerMutationVariables) => {
        try {
          const res = await API.graphql(graphqlOperation(createPlayer, input)) as GraphQLResult<CreatePlayerMutation>
          return { data: res.data }
        } catch (error: any) {
          return { error }
        }
      },
      invalidatesTags: ["players"]
    }),
    createGame: builder.mutation<CreateGameMutation, CreateGameMutationVariables>({
      //@ts-ignore
      queryFn: async (input: CreateGameMutationVariables) => {
        try {
          const res = await API.graphql(graphqlOperation(createGame, input)) as GraphQLResult<CreateGameMutation>
          return { data: res.data }
        } catch (error: any) {
          return { error }
        }
      },
      invalidatesTags: ["games", "players"]
    }),
  }),
})

export const { useListPlayersQuery, useListGamesQuery, useCreatePlayerMutation, useCreateGameMutation } = mainApi

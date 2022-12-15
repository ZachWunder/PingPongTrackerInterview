/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GameInput = {
  p1: string,
  p2: string,
  p1Score?: number | null,
  p2Score: number,
};

export type PlayerInput = {
  name: string,
  rating: number,
};

export type CreateGameMutationVariables = {
  game?: GameInput | null,
};

export type CreateGameMutation = {
  createGame:  {
    __typename: "GameCreateRes",
    game:  {
      __typename: "Game",
      id: string,
      p1: string,
      p2: string,
      p1Score: number | null,
      p2Score: number,
      time: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type CreatePlayerMutationVariables = {
  player?: PlayerInput | null,
};

export type CreatePlayerMutation = {
  createPlayer:  {
    __typename: "PlayerCreateRes",
    player:  {
      __typename: "Player",
      name: string,
      rating: number,
    } | null,
    error: string | null,
  } | null,
};

export type ListGamesQuery = {
  listGames:  Array< {
    __typename: "Game",
    id: string,
    p1: string,
    p2: string,
    p1Score: number | null,
    p2Score: number,
    time: string | null,
  } | null > | null,
};

export type ListPlayersQuery = {
  listPlayers:  Array< {
    __typename: "Player",
    name: string,
    rating: number,
  } | null > | null,
};

/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame($game: GameInput) {
    createGame(game: $game) {
      game {
        id
        p1
        p2
        p1Score
        p2Score
        time
      }
      error
    }
  }
`;
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer($player: PlayerInput) {
    createPlayer(player: $player) {
      player {
        name
        rating
      }
      error
    }
  }
`;

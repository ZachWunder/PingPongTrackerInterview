import Game from "Game";
import {createGame, createPlayer, listGames, listPlayers} from "../api";
import Player from "../Player";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    player: Player,
    game: Game
  };
};

export async function handler(
  event: AppSyncEvent
) {
  switch (event.info.fieldName) {
    case "createPlayer":
      return createPlayer(event.arguments.player);
    case "listPlayers":
      return listPlayers();
    case "createGame":
      return createGame(event.arguments.game);
    case "listGames":
      return listGames();
    default:
      return null;
  }
}

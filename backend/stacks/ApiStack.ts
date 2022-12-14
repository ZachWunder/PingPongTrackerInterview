import { use, StackContext, AppSyncApi } from "@serverless-stack/resources";
import { DbStack } from "./DbStack";

export function MyStack({ stack }: StackContext) {
  const {gamesTable, playerTable} = use(DbStack);
  // Create the AppSync GraphQL API
  const api = new AppSyncApi(stack, "AppSyncApi", {
    schema: "services/graphql/schema.graphql",
    defaults: {
      function: {
        environment: {
          PLAYER_TABLE_NAME: playerTable.tableName,
          GAME_TABLE_NAME: gamesTable.tableName
        }
      },
    },
    dataSources: {
      main: "functions/main.handler",
    },
    resolvers: {
      "Query    listGames": "main",
      "Query    listPlayers": "main",
      "Mutation createPlayer": "main",
      "Mutation createGame": "main",
    },
  });
  api.attachPermissions(["dynamodb"])
}

import { use, StackContext, AppSyncApi } from "@serverless-stack/resources";
import { DbStack } from "./DbStack";
// import * as cdk from "aws-cdk-lib";
// import * as appsync from "@aws-cdk/aws-appsync-alpha";

export function ApiStack({ stack }: StackContext) {
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
    // cdk: {
    //   graphqlApi: {
    //     authorizationConfig: {
    //       defaultAuthorization: {
    //         authorizationType: appsync.AuthorizationType.API_KEY,
    //         apiKeyConfig: {
    //           expires: cdk.Expiration.after(cdk.Duration.days(365)),
    //         },
    //       },
    //     },
    //   },
    // },
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
  return api
}

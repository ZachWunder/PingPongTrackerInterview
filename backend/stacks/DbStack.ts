import { StackContext, Table } from "@serverless-stack/resources";

export function DbStack({ stack }: StackContext) {
  // Create a notes table
  const gamesTable = new Table(stack, "gamesTable", {
    fields: {
      p1: "string",
      p2: "string",
      p1Score: "number",
      p2Score: "number",
      winner: "string",
      time: "string"
    },
    primaryIndex: { partitionKey: "p1" },
  });

  const playerTable = new Table(stack, "playerTable", {
    fields: {
      name: "string",
      rating: "number"
    },
    primaryIndex: { partitionKey: "name" }
  });

  return {
    gamesTable, playerTable
  }
}

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import Game, { Winner } from "./Game";
import Player from "./Player";
import crypto from "crypto";

const dynamo = new DynamoDBClient({ region: "us-east-1"});
const client = DynamoDBDocument.from(dynamo)

// NOTE: Would create another function to take out rating logic to be unit tested.
export async function createGame(game: Game) {
  try {
    // Calculate point spread between players
    const p1 = await client.get({
      TableName: process.env.PLAYER_TABLE_NAME,
      Key: {name: game.p1}
    })

    const p2 = await client.get({
      TableName: process.env.PLAYER_TABLE_NAME,
      Key: {name: game.p2}
    })
    
    if (game.p1Score === game.p2Score) {
      game.winner = Winner.tie
    } else if (game.p1Score > game.p2Score) {
      game.winner = Winner.p1
    } else {
      game.winner = Winner.p2
    }

    if(game.winner !== Winner.tie) {
      // Calculate updated ratings based on rating difference
      const p1Rating = p1.Item?.rating
      const p2Rating = p2.Item?.rating
      const expectedWinner = p1Rating > p2Rating ? Winner.p1 : Winner.p2
      const expectedOutcome = game.winner === expectedWinner
      // Upsets exchange more points, scaled by rating difference
      const ratingChange = calcRatingChange(p1Rating, p2Rating, expectedOutcome)
      const p1NewRating = game.winner === Winner.p1 ? p1Rating + ratingChange : p1Rating - ratingChange 
      const p2NewRating = game.winner === Winner.p2 ? p2Rating + ratingChange : p2Rating - ratingChange 

      // Save new ratings
      await client.update({
        TableName: process.env.PLAYER_TABLE_NAME,
        Key: { name: p1.Item?.name },
        UpdateExpression: "set rating = :r",
        ExpressionAttributeValues: {
          ":r": p1NewRating
        }
      })

      await client.update({
        TableName: process.env.PLAYER_TABLE_NAME,
        Key: { name: p2.Item?.name },
        UpdateExpression: "set rating = :r",
        ExpressionAttributeValues: {
          ":r": p2NewRating
        }
      })
    }
    game.id = crypto.randomUUID()
    game.time = new Date().toISOString()
    // Save game for stats
    const res = await client.put({
      TableName: process.env.GAME_TABLE_NAME,
      Item: game
    })
  } catch (e) {
    console.log(e)
    return {error: "NotCreated", game: null}
  }

  return {error: null, game}
}

export async function listGames() {
  try {
    // TODO: Implement pagination to support more games
    const res = await client.scan({
      TableName: process.env.GAME_TABLE_NAME,
      Limit: 250
    })
    return res.Items
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function createPlayer(player: Player) {
  try {
    const res = await client.put({
      TableName: process.env.PLAYER_TABLE_NAME,
      Item: player,
      ConditionExpression: 'attribute_not_exists(#name)',
      ExpressionAttributeNames: {
        "#name": "name"
      }
    })
  } catch (e: any) {
      if (e.name === "ConditionalCheckFailedException") {
        return {error: "PlayerExists", player: null}
      } else {
        return {error: "NotCreated", player: null}
      }
  }

  console.log("returning success")
  return { error: null, player }
}

export async function listPlayers() {
  try {
    // TODO: Implement pagination to support more players
    const res = await client.scan({
      TableName: process.env.PLAYER_TABLE_NAME,
      Limit: 250
    })
    return res.Items
  } catch (e) {
    console.log(e)
    throw e
  }
}

const calcRatingChange = (p1Rating: number, p2Rating: number, expected: boolean) => {
  const difference = Math.abs(p1Rating - p2Rating)
  if (difference <= 12) {
    return expected ? 8 : 8
  } else if (difference <= 37) {
    return expected ? 7 : 10
  } else if (difference <= 62) {
    return expected ? 6 : 13
  } else if (difference <= 87) {
    return expected ? 5 : 16
  } else if (difference <= 112) {
    return expected ? 4 : 20
  } else if (difference <= 137) {
    return expected ? 3 : 25
  } else if (difference <= 162) {
    return expected ? 2 : 30
  } else if (difference <= 187) {
    return expected ? 2 : 35
  } else if (difference <= 212) {
    return expected ? 1 : 40
  } else if (difference <= 237) {
    return expected ? 1 : 45
  } else {
    return expected ? 0 : 50
  }
}
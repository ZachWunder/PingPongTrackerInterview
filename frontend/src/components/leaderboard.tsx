import React from "react"
import { useListPlayersQuery } from "../features/players/playerSlice"

export function Leaderboard () {
  const { data, error, isLoading } = useListPlayersQuery("")
  return (
    <div>
      <h2>Leaderboard</h2>
      <div className="dataDisplay">
        { isLoading ? <div><p>Loading player leaderboard!</p></div> : null }
        {
          error ? <div><p>Error occurred while loading leaderboard</p></div> : null
        }
        {
          data?.listPlayers ? data.listPlayers.map((player: any, i: number) => <ul key={i}>{i+1}. {player.name} - {player.rating}</ul>) : null
        }
      </div>
    </div>
  )
}

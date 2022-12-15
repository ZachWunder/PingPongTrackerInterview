import React from "react"
import { useListGamesQuery } from "../features/players/playerSlice"

export function Games () {
  const { data, error, isLoading } = useListGamesQuery("")
  console.log(data)
  return (
    <div>
      <h2>All Games</h2>
      <div className="dataDisplay">
        { isLoading ? <div><p>Loading games!</p></div> : null }
        {
          error ? <div><p>Error occurred while loading games</p></div> : null
        }
        {
          data?.listGames ? data.listGames.map((game: any, i: number) => 
            <ul key={i}>{game.p1} - {game.p1Score} vs. {game.p2} - {game.p2Score} </ul>
          ) : null
        }
      </div>
    </div>
  )
}

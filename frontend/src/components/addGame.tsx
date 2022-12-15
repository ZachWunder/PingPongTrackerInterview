import React, {useState} from "react"
import { useCreateGameMutation } from "../features/players/playerSlice"

export function AddGame () {
  const [createGame, result] = useCreateGameMutation()
  const p1ChangeHandler = (event: any) => {
    setP1(event.target.value);
  };
  const p2ChangeHandler = (event: any) => {
    setP2(event.target.value);
  }  

  const p1ScoreChangeHandler = (event: any) => {
    setP1Score(event.target.value);
  };
  const p2ScoreChangeHandler = (event: any) => {
    setP2Score(event.target.value);
  };;
  const [p1, setP1] = useState("")
  const [p2, setP2] = useState("")
  const [p1Score, setP1Score] = useState(0)
  const [p2Score, setP2Score] = useState(0)
  return (
    <div>
      <h2>Add Game</h2>
      <div>
        <h3>Players</h3>
        <label>Player One Name</label>
        <input
          type="text"
          name="playerOne"
          onChange={p1ChangeHandler}
          value={p1}
        />
        <label>Player Two Name</label>
        <input
          type="text"
          name="playerTwo"
          onChange={p2ChangeHandler}
          value={p2}
        />
        <h3>Score</h3>
        <label>Player One Score</label>
        <input
          type="text"
          name="playerOneScore"
          onChange={p1ScoreChangeHandler}
          value={p1Score}
        />
        <label>Player Two Score</label>
        <input
          type="text"
          name="playerTwoScore"
          onChange={p2ScoreChangeHandler}
          value={p2Score}
        /> 
        {
          result.data?.createGame?.error === "NotCreated" ? <p>Error creating game</p>: null
        }
        <button onClick={() => {
          if (p1 !== "" && p2 !== "" && p1Score !== 0 && p2Score !== 0) {
            createGame({game: {p1, p2, p1Score, p2Score }})
            setP1("")
            setP2("")
            setP1Score(0)
            setP2Score(0)
          } 
        }}>Add Game</button>
      </div>
    </div>
  )
}

        
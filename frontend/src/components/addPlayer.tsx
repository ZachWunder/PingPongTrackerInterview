import { create } from "domain"
import React, {useState} from "react"
import { useCreatePlayerMutation } from "../features/players/playerSlice"

export function AddPlayer () {
  const [createPlayer, result] = useCreatePlayerMutation()
  const [newPlayerName, setNewPlayerName] = useState("John Smith")
  const [newPlayerRating, setNewPlayerRating] = useState(1000)
  const newPlayerNameChangeHandler = (event: any) => {
    setNewPlayerName(event.target.value);
  };
  const newPlayerRatingChangeHandler = (event: any) => {
    setNewPlayerRating(event.target.value);
  }  
  return (
    <div>
      <h2>Add player</h2>
      <label>Name</label>
      <input type="text" name="name" onChange={newPlayerNameChangeHandler} value={newPlayerName} />
      <label>Rating</label>
      <input type="text" name="rating" onChange={newPlayerRatingChangeHandler} value={newPlayerRating} />
      {
        result.data?.createPlayer?.error == "PlayerExists" ? <p>Player already exists</p>: null
      }
      {
        result.data?.createPlayer?.error == "NotCreated" ? <p>Error creating player</p>: null
      }
      <button onClick={() => {
        if (newPlayerName !== "" && newPlayerRating !== 0) {
          createPlayer({player: {name: newPlayerName, rating: newPlayerRating}})
          setNewPlayerName("")
          setNewPlayerRating(0)
        } 
      }}>Add Player</button>
    </div>
  )
}
// {player: {name: newPlayerName, rating: newPlayerRating}}
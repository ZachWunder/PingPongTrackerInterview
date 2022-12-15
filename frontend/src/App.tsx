import React from 'react';
import { Leaderboard } from './components/leaderboard';
import { Games } from './components/games';
import { AddPlayer } from './components/addPlayer';
import './App.css';
import { AddGame } from './components/addGame';

function App() {
  return (
    <div className="App">
      <h1>Ping Pong Score Tracker</h1>
      <div>
        <Leaderboard />
        <Games />
        <AddPlayer />
        <AddGame />
      </div>
    </div>
  );
}

export default App;

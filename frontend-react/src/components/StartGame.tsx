// src/components/StartGame.tsx
import React, { useState } from 'react';
import { startGame } from '../api';

const StartGame = () => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await startGame(playerName);
    console.log(response.message); // Or handle this message in the UI
  };

  return (
    <div className="start-game">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter Player Name"
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default StartGame;

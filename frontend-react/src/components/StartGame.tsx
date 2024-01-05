// StartGame.tsx
import React, { useState } from 'react';

const StartGame = () => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // API call to start the game
    console.log(`Starting game for ${playerName}`);
    // Implement the API call here
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

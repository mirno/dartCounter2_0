// src/components/ScoreBoard.tsx
import React, { useState } from 'react';
import { updateScore } from '../api';

const ScoreBoard = () => {
  const [inputScore, setInputScore] = useState('');
  const [displayedScore, setDisplayedScore] = useState('');

  const handleScoreSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const scoreValue = parseInt(inputScore, 10);
    if (!isNaN(scoreValue)) {
      const response = await updateScore(scoreValue);
      setDisplayedScore(response.player1Score); // Update the displayed score
      setInputScore(''); // Reset the input field
    }
  };

  return (
    <div className="score-board">
      <h2>Score: {displayedScore}</h2>
      <form onSubmit={handleScoreSubmit}>
        <input
          type="number"
          value={inputScore}
          onChange={(e) => setInputScore(e.target.value)}
          placeholder="Enter Score"
        />
        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
};

export default ScoreBoard;

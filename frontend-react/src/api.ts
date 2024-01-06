// src/api.ts
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const startGame = async (playerName: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/game/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ player1: playerName }),
  });
  return response.json();
};

export const updateScore = async (score: number): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/game/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score }),
  });
  return response.json();
};

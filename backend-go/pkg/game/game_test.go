package game

import (
	"dartCounter/pkg/participant"
	"testing"
)

func TestSinglePlayerGame(t *testing.T) {
	player := participant.NewPlayer("Alice", 501)
	game := NewGame([]participant.Participant{player}, 501)

	// Test score update
	game.UpdateScore(0, 50) // Assuming player ID 0 for single player
	if player.GetScore() != 451 {
		t.Errorf("Expected score 451, got %d", player.GetScore())
	}

	// Test win condition
	if game.CheckWinCondition() {
		t.Errorf("Win condition should not be met yet")
	}
}

func TestTwoPlayerGame(t *testing.T) {
	player1 := participant.NewPlayer("Alice", 501)
	player2 := participant.NewPlayer("Bob", 501)
	game := NewGame([]participant.Participant{player1, player2}, 501)

	// Test score update for player 1
	game.UpdateScore(0, 50) // Player 1 ID is 0
	if player1.GetScore() != 451 {
		t.Errorf("Expected score 451 for player 1, got %d", player1.GetScore())
	}

	// Test score update for player 2
	game.UpdateScore(1, 60) // Player 2 ID is 1
	if player2.GetScore() != 441 {
		t.Errorf("Expected score 441 for player 2, got %d", player2.GetScore())
	}

	// Test win condition
	if game.CheckWinCondition() {
		t.Errorf("Win condition should not be met yet")
	}
}

// Additional tests can be added for more complex scenarios, such as testing win conditions being met, etc.
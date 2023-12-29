package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
    "dartCounter/pkg/game"
    "dartCounter/pkg/player"
    "dartCounter/pkg/scoring"
)

// Optional put this in a utility package
func isValidTurnScore(score int) bool {
    // Scores that are not possible in a single turn
    impossibleScores := map[int]bool{
        159: true, 162: true, 163: true, 166: true, 169: true,
        172: true, 173: true, 175: true, 176: true, 178: true, 179: true,
    }

    // Check if the score is in the range and not in the list of impossible scores
    return score >= 0 && score <= 180 && !impossibleScores[score]
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    fmt.Print("Enter name for Player 1: ")
    name1, _ := reader.ReadString('\n')
    name1 = strings.TrimSpace(name1)

    fmt.Print("Enter name for Player 2: ")
    name2, _ := reader.ReadString('\n')
    name2 = strings.TrimSpace(name2)

    p1 := player.NewPlayer(name1, 501)
    p2 := player.NewPlayer(name2, 501)
    scoringSystem := &scoring.StandardScoring{}
    g := game.NewGame(p1, p2, scoringSystem)

    currentPlayer := p1
    for {
        fmt.Printf("Current player: %s (Score: %d)\n", currentPlayer.Name, currentPlayer.Score)
        fmt.Print("Enter score: ")
        input, _ := reader.ReadString('\n')
        score, err := strconv.Atoi(strings.TrimSpace(input))
        if err != nil || !isValidTurnScore(score) || score > currentPlayer.Score {
            fmt.Println("Invalid total score for the turn. Please enter a valid score.")
            continue
        }

        currentPlayer.AddThrow(score)
        g.UpdateScore(currentPlayer, score)
        fmt.Printf("%s's Score: %d\n", currentPlayer.Name, currentPlayer.Score)

        if g.CheckWinCondition() {
            fmt.Printf("Player %s wins!\n", currentPlayer.Name)
            break
        }

        // Switching the current player
        if currentPlayer == p1 {
            currentPlayer = p2
        } else {
            currentPlayer = p1
        }
    }

    // Display the scores thrown by each player
    fmt.Println("Game Over! Final Throws:")
    fmt.Printf("%s: %v\n", p1.Name, p1.Throws)
    fmt.Printf("%s: %v\n", p2.Name, p2.Throws)
}
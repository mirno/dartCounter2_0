package main

import (
    "dartCounter/pkg/game"
    "fmt"
    "bufio"
    "os"
    "strconv"
    "strings"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    g := game.NewGame(501, 3) // Example: Start a game with 501 score and 3 target legs

    for {
        fmt.Print("Enter score: ")
        input, _ := reader.ReadString('\n')
        input = strings.TrimSpace(input)
        score, err := strconv.Atoi(input)
        if err != nil {
            fmt.Println("Invalid input. Please enter a number.")
            continue
        }

        g.UpdateScore(score)
        fmt.Printf("Current Score: %d, Legs Won: %d\n", g.CurrentScore, g.LegsWon)

        if g.LegsWon == g.TargetLegs {
            fmt.Println("Game over!")
            break
        }
    }
}
package game

import (
    "fmt"
)

type Game struct {
    CurrentScore int
    TargetLegs   int
    LegsWon      int
}

func NewGame(startScore, targetLegs int) *Game {
    return &Game{
        CurrentScore: startScore,
        TargetLegs:   targetLegs,
        LegsWon:      0,
    }
}

// UpdateScore updates the game score based on the dart input
func (g *Game) UpdateScore(score int) {
    if score <= g.CurrentScore {
        g.CurrentScore -= score
        if g.CurrentScore == 0 {
            g.LegsWon++
            fmt.Println("Leg won!")
            if g.LegsWon == g.TargetLegs {
                fmt.Println("Game won!")
            }
        }
    }
}
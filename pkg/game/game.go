package game

import (
    "dartCounter/pkg/player"
    "dartCounter/pkg/scoring"
)

type Game struct {
    Player1       *player.Player
    Player2       *player.Player
    ScoringSystem scoring.ScoringSystem
}

func NewGame(p1, p2 *player.Player, scoringSystem scoring.ScoringSystem) *Game {
    return &Game{
        Player1:       p1,
        Player2:       p2,
        ScoringSystem: scoringSystem,
    }
}

func (g *Game) UpdateScore(p *player.Player, score int) {
    g.ScoringSystem.UpdateScore(p, score)
}

func (g *Game) CheckWinCondition() bool {
    return g.ScoringSystem.CheckWinCondition(g.Player1, g.Player2)
}
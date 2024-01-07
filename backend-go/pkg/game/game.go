package game

import (
	"dartCounter/pkg/match"
	"dartCounter/pkg/participant"
)

type Game struct {
    match interface{} // Can be match.SinglePlayerMatch or match.TeamMatch
}

func NewGame(participants []participant.Participant, startingScore int) *Game {
    game := &Game{}
    game.StartMatch(participants, startingScore)
    return game
}

func (g *Game) StartMatch(participants []participant.Participant, startingScore int) {
    if len(participants) == 1 {
        g.match = match.NewSinglePlayerMatch(participants[0], startingScore)
    } else {
        g.match = match.NewTeamMatch(participants, startingScore)
    }
}

func (g *Game) UpdateScore(playerID int, score int) {
    switch m := g.match.(type) {
    case match.SinglePlayerMatch:
        m.UpdateScore(score)
    case match.TeamMatch:
        m.UpdateScore(playerID, score)
    }
}

func (g *Game) CheckWinCondition() bool {
    switch m := g.match.(type) {
    case match.SinglePlayerMatch:
        return m.CheckWinCondition()
    case match.TeamMatch:
        return m.CheckWinCondition()
    }
    return false
}
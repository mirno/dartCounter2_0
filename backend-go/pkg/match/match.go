package match

import "dartCounter/pkg/participant"

// SinglePlayerMatch interface
type SinglePlayerMatch interface {
    UpdateScore(score int)
    CheckWinCondition() bool
}

// TeamMatch interface
type TeamMatch interface {
    UpdateScore(teamID int, score int)
    CheckWinCondition() bool
}

// SinglePlayerMatchImpl struct
type SinglePlayerMatchImpl struct {
    player        participant.Participant
    startingScore int
}

// NewSinglePlayerMatch creates a new single-player match
func NewSinglePlayerMatch(player participant.Participant, startingScore int) SinglePlayerMatch {
    return &SinglePlayerMatchImpl{
        player:        player,
        startingScore: startingScore,
    }
}

func (spm *SinglePlayerMatchImpl) UpdateScore(score int) {
    // Subtract score from player's current score
    spm.player.UpdateScore(-score)
}

func (spm *SinglePlayerMatchImpl) CheckWinCondition() bool {
    // Check if player's score is zero
    return spm.player.GetScore() == 0
}

// TeamMatchImpl struct
type TeamMatchImpl struct {
    teams         []participant.Participant // Assuming each team is a participant
    startingScore int
}

// NewTeamMatch creates a new team match
func NewTeamMatch(teams []participant.Participant, startingScore int) TeamMatch {
    return &TeamMatchImpl{
        teams:         teams,
        startingScore: startingScore,
    }
}

func (tm *TeamMatchImpl) UpdateScore(teamID int, score int) {
    // Subtract score from the specified team's current score
    tm.teams[teamID].UpdateScore(-score)
}

func (tm *TeamMatchImpl) CheckWinCondition() bool {
    // Check if all teams have a score of zero
    for _, team := range tm.teams {
        if team.GetScore() != 0 {
            return false
        }
    }
    return true
}
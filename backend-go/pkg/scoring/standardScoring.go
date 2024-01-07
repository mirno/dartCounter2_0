package scoring

import "dartCounter/pkg/participant"

type StandardScoring struct {
    StartingScore int
}

func NewStandardScoring(startingScore int) *StandardScoring {
    return &StandardScoring{StartingScore: startingScore}
}

func (ss *StandardScoring) CalculateScoreChange(p participant.Participant, score int) {
    // Subtract score from participant's current score
    p.UpdateScore(-score)
}

func (ss *StandardScoring) CheckWinCondition(p participant.Participant) bool {
    return p.GetScore() == 0
}
package scoring

import "dartCounter/pkg/participant"

type ScoringSystem interface {
    CalculateScoreChange(p participant.Participant, score int)
    CheckWinCondition(p participant.Participant) bool
}
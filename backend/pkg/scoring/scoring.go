package scoring

import "dartCounter/pkg/player"

type ScoringSystem interface {
	UpdateScore(p *player.Player, score int)
	CheckWinCondition(p1, p2 *player.Player) bool
}

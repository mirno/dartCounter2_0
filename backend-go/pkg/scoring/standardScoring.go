package scoring

import "dartCounter/pkg/player"

type StandardScoring struct{}

func (s *StandardScoring) UpdateScore(p *player.Player, score int) {
	if score <= p.Score {
		p.Score -= score
	}
	// Additional scoring logic can be added here
}

func (s *StandardScoring) CheckWinCondition(p1, p2 *player.Player) bool {
	return p1.Score == 0 || p2.Score == 0
}

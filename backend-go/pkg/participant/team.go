package participant

type Team struct {
	Players []*Player
	Score   int
}

func NewTeam(players []*Player, startingScore int) *Team {
	return &Team{
		Players: players,
		Score:   startingScore,
	}
}

func (t *Team) UpdateScore(scoreChange int) {
	t.Score += scoreChange
	// Additional logic for team score update can be added here.
}

func (t *Team) GetScore() int {
	return t.Score
}
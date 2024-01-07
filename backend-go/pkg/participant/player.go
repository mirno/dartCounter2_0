package participant

type Player struct {
	Name  string
	Score int
}

func NewPlayer(name string, startingScore int) *Player {
	return &Player{
		Name:  name,
		Score: startingScore,
	}
}

func (p *Player) UpdateScore(scoreChange int) {
	p.Score += scoreChange
}

func (p *Player) GetScore() int {
	return p.Score
}
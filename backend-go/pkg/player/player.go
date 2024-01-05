package player

type Player struct {
	Name   string
	Score  int
	Throws []int // Slice to store the scores of each throw
}

func NewPlayer(name string, score int) *Player {
	return &Player{
		Name:   name,
		Score:  score,
		Throws: []int{},
	}
}

func (p *Player) AddThrow(score int) {
	p.Throws = append(p.Throws, score)
}

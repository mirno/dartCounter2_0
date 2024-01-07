package participant

type Participant interface {
	UpdateScore(scoreChange int)
	GetScore() int
}
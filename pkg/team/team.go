package team

import "dartCounter/pkg/player"

type Team struct {
	Players   []player.Player
	TeamScore int
}

func NewTeam() *Team {
	return &Team{
		Players:   make([]player.Player, 0),
		TeamScore: 0,
	}
}

// Methods to add player, update team score, etc.

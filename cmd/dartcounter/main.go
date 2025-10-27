package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"

	"github.com/google/uuid"
)

var (
	ErrNoScore = errors.New("no scores in history")
)

type Contributor interface {
	Name() string
	Push(score int)
	Peek() (int, error)
	Undo() (*int, error)
}

type Player struct {
	PName string
	id    uuid.UUID

	history []int
}

func (p *Player) Name() string {
	return p.PName
}

// Push will append the newest score to the
func (p *Player) Push(score int) { // save current score for undo
	p.history = append(p.history, score)
}

// Peek displays the last Score without Undoing it.
func (p *Player) Peek() (int, error) { // save current score for undo
	if len(p.history) == 0 {
		return 0, ErrNoScore
	}

	score := p.history[len(p.history)-1]

	return score, nil
}

// Undo removed the last value from the stack. A Pop without return.
func (p *Player) Undo() (*int, error) {
	if len(p.history) == 0 {
		return nil, ErrNoScore
	}

	pop := p.history[len(p.history)-1]

	p.history = p.history[:len(p.history)-1] // remove the last

	return &pop, nil
}

type GameType string

const (
	GameTypePoints GameType = "points"
)

type Game struct {
	StartScore   int
	GameType     GameType
	Current      int
	Ended        bool
	Contributors map[int]Contributor
	CurrentIndex int // index of current Contributors
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("== Darts Counter (simple) ==")

	contributors := make(map[int]Contributor, 2)

	start := askStartScore(reader)
	players := setup2Players(reader)

	for i, player := range players {
		contributors[i] = &player
	}

	game := &Game{
		StartScore:   start,
		GameType:     GameTypePoints, // Just for show now.
		Contributors: contributors,
		CurrentIndex: 0, // Default index should start at 0
	}

	fmt.Printf("\nGame start — %d points\n", game.StartScore)
	game.PrintScoreBoard()
}

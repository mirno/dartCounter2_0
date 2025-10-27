package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

// ---------- Setup prompts ----------

func askStartScore(r *bufio.Reader) int {
	for {
		in := prompt(r, "Start score [301/501/701] (default 501): ")
		trim := strings.TrimSpace(in)
		if trim == "" {
			return 501
		}
		switch trim {
		case "301", "501", "701":
			n, _ := strconv.Atoi(trim)
			return n
		default:
			fmt.Println("Choose 301, 501, or 701.")
		}
	}
}

// setup2Players implements a two player match
func setup2Players(r *bufio.Reader) []Player {
	players := make([]Player, 2)
	for i := range 2 {
		name := prompt(r, fmt.Sprintf("Player %d name (default P%d): ", i+1, i+1))
		name = strings.TrimSpace(name)
		if name == "" {
			name = fmt.Sprintf("P%d", i+1)
		}
		players[i] = Player{PName: name}
	}

	return players
}

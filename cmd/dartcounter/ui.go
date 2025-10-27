package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"strings"
)

// ---------- UI helpers ----------

func prompt(r *bufio.Reader, label string) string {
	fmt.Print(label)
	text, _ := r.ReadString('\n')
	return strings.TrimRight(text, "\r\n")
}

func (g *Game) PrintScoreBoard() {
	fmt.Println("--------- Scoreboard ---------")

	for i, p := range g.Contributors {
		score, err := p.Peek()
		if err != nil {
			if errors.Is(err, ErrNoScore) {
				score = g.StartScore
			} else {
				log.Fatalf("unkown error: %v", err)
			}
		}

		turn := " "
		if i == g.Current && !g.Ended {
			turn = "▶"
		}

		fmt.Printf("%s %-12s : %d\n", turn, p.Name(), score)

	}

}

func printHelp() {
	fmt.Println("\nCommands:")
	fmt.Println("  <0–180>  enter a visit score (sum of 3 darts)")
	fmt.Println("  score    show the scoreboard")
	fmt.Println("  undo     undo last move")
	fmt.Println("  help     show this help")
	fmt.Println("  quit     exit the program")
	fmt.Println("")
}

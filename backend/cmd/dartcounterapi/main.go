package main

import (
    "dartCounter/pkg/game"
    "dartCounter/pkg/player"
    "dartCounter/pkg/scoring"
    "encoding/json"
    "net/http"
    "github.com/gorilla/mux"
    // Import other necessary packages
)

var currentGame *game.Game

func main() {
    router := mux.NewRouter()
    router.Use(enableCORS)
    router.HandleFunc("/game/start", startGameHandler).Methods("POST", "OPTIONS")
    router.HandleFunc("/game/score", updateScoreHandler).Methods("POST", "OPTIONS")
    // Define other routes

    http.ListenAndServe(":8080", router)
}

func startGameHandler(w http.ResponseWriter, r *http.Request) {
    // Start game logic
    p1 := player.NewPlayer("Player 1", 501) // := declares ;)
    p2 := player.NewPlayer("Player 2", 501)
    scoringSystem := &scoring.StandardScoring{}

    // Initialize and store the game
    currentGame = game.NewGame(p1, p2, scoringSystem)

    // Respond with confirmation
    response := map[string]string{"message": "Game started"}
    json.NewEncoder(w).Encode(response)

    // Parse request data
    // Initialize a new game using the game logic
    // Save the game state if necessary
    // Respond with game details or confirmation
    
}

func updateScoreHandler(w http.ResponseWriter, r *http.Request) {
    // Parse request data to get the score
    // For example, let's assume the request contains a JSON with the score
    var data struct {
        Score int `json:"score"`
    }
    json.NewDecoder(r.Body).Decode(&data)

    // Update the game state (you'll need logic to determine the current player)
    // For simplicity, let's assume player 1 is always playing
    currentGame.UpdateScore(currentGame.Player1, data.Score)

    // Respond with the updated score
    response := map[string]int{"player1Score": currentGame.Player1.Score}
    json.NewEncoder(w).Encode(response)
}

func enableCORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        next.ServeHTTP(w, r)
    })
}
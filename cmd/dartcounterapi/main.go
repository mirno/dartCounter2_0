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

var currentGame *game.game
func main() {
    router := mux.NewRouter()

    router.HandleFunc("/game/start", startGameHandler).Methods("POST")
    router.HandleFunc("/game/score", updateScoreHandler).Methods("POST")
    // Define other routes

    http.ListenAndServe(":8080", router)
}

func startGameHandler(w http.ResponseWriter, r *http.Request) {
    // Start game logic
    response := map[string]string{"message": "Game started"}
    json.NewEncoder(w).Encode(response)

    // Parse request data
    // Initialize a new game using the game logic
    // Save the game state if necessary
    // Respond with game details or confirmation
    
}

func updateScoreHandler(w http.ResponseWriter, r *http.Request) {
    // Update score logic
    response := map[string]string{"message": "Score updated"}
    json.NewEncoder(w).Encode(response)

    // Parse request data
    // Update the game state using the game logic
    // Respond with the updated game state or confirmation
}

// Define other handlers
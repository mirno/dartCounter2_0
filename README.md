# dartCounter2_0
DartCounter2.0 back-end with GoLang front-end with Angular

# Folder structure
cmd/dartcounter/main.go: The entry point of your application.
pkg/game/game.go: Contains the Game struct and related methods.
pkg/player/player.go: Defines the Player struct.
pkg/score/score.go: Manages the Score struct.
go.mod: Manages your project's dependencies.

# Execution and Testing
After creating these files, you can build and run your application using the Go command line:

Navigate to the dartCounter directory.
Run go build ./cmd/dartcounter to build your application.
Execute ./dartcounter to run the application.

# General Information
Package Management: Use go mod init <module-name> to initialize a new module. This will create a go.mod file which will manage your dependencies.

# Design
PlantUml is used for making the classes visible. 

# Documentation for information
- Interfacing:
 https://www.baeldung.com/cs/program-to-interface

Interface Definition: The ScoringSystem interface declares methods like UpdateScore and CheckWinCondition. These methods are essential for updating a player's score and checking the win condition of the game.

StandardScoring Implementation: The StandardScoring class is a concrete implementation of the ScoringSystem interface. It provides specific logic for updating scores based on dart throws and determining the game's win condition.

Flexibility: By using an interface, the DartCounter application can easily adapt to different scoring rules without modifying the core game logic. New scoring systems can be implemented and integrated seamlessly.

Maintainability: This approach enhances the maintainability of the code. Changes in the scoring logic only require modifications in the scoring system implementations, not in the Game class or elsewhere.


- Trunk.yaml:

https://docs.trunk.io/check/reference/trunk-yaml
-  pre-commit (to be implemented):

https://pre-commit.com/
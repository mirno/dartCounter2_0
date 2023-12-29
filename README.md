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
- Trunk.yaml:
https://docs.trunk.io/check/reference/trunk-yaml
-  pre-commit (to be implemented):
https://pre-commit.com/
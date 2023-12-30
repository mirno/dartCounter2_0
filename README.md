# dartCounter2_0
DartCounter2.0 back-end with GoLang front-end with Angular

# Folder structure
cmd/dartcounter/main.go: The entry point of your application.
pkg/game/game.go: Contains the Game struct and related methods.
pkg/player/player.go: Defines the Player struct.
pkg/score/score.go: Manages the Score struct.
go.mod: Manages your project's dependencies.

# GoLang Syntax information.
## Receiver parameter. https://blog.devgenius.io/receiver-parameter-in-go-f0c3e25b7b10
```
func (m MyInt) IsPositive() bool {
    return m > 0
}

func main() {
    var i MyInt = 5
    fmt.Println(i.IsPositive()) // Output: true
}
```
> The method takes a receiver parameter m of type MyInt, which is the instance of the type that the method is called on.

- Pointers and the * Symbol
## The * symbol is used to denote pointers in Go. A pointer holds the memory address of a value.
When you see *Game, it means a pointer to a Game instance, allowing you to modify the original Game instance passed around.
##  The this Keyword and Interfaces
> Go does not use the this keyword like TypeScript or JavaScript. Instead, Go methods are defined with a receiver argument, which serves a similar purpose.
Interfaces in Go are a way to specify a set of method signatures. Any type that implements those methods satisfies the interface. This is different from languages with class-based inheritance.
---
# Execution and Testing
After creating these files, you can build and run your application using the Go command line:

Navigate to the dartCounter directory.
Run 'go build ./cmd/dartcounter' to build your application.
Execute ./dartcounter to run the application.

# General Information
Package Management: Use go mod init <module-name> to initialize a new module. This will create a go.mod file which will manage your dependencies.

# Design
PlantUml makes the design of classes & interfaces visible. 

![Class Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/mirno/dartCounter2_0/main/diagram.puml)


# Documentation for information
##  Interfacing:
 https://www.baeldung.com/cs/program-to-interface

- Interface Definition: The ScoringSystem interface declares methods like UpdateScore and CheckWinCondition. These methods are essential for updating a player's score and checking the win condition of the game.

- StandardScoring Implementation: The StandardScoring class is a concrete implementation of the ScoringSystem interface. It provides specific logic for updating scores based on dart throws and determining the game's win condition.

- Flexibility: By using an interface, the DartCounter application can easily adapt to different scoring rules without modifying the core game logic. New scoring systems can be implemented and integrated seamlessly.

- Maintainability: This approach enhances the maintainability of the code. Changes in the scoring logic only require modifications in the scoring system implementations, not in the Game class or elsewhere.

---
> Benefits of Using the Interface
Flexibility: The game logic is not tied to a specific scoring implementation. If you decide to introduce a new scoring system (e.g., a variant of dart scoring rules), you can simply create a new struct that implements the ScoringSystem interface.

> Maintainability: Changes to the scoring logic can be made in the specific implementations of the ScoringSystem interface, without affecting the Game struct or other parts of the application.

> Testability: It's easier to test the Game logic by mocking different scoring systems.

---

- Trunk.yaml:

https://docs.trunk.io/check/reference/trunk-yaml

---

-  pre-commit (to be implemented):

https://pre-commit.com/
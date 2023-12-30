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
PlantUml makes the design of classes & interfaces visible. 

![Class Diagram]('https://www.plantuml.com/plantuml/png/nL8zJyCm4DtzAsvCHLC9HgkAYZgmC205n6pYex58pf7lAbGL_Zjnug8aC28n9Nu-lu-dsx6O8CUsKLLZcE7Ej0Xd1G2GGzUO4uPh3G_3pmozMQ1S-U3eK9vOiDLGJe_3o1MKKIeAPAk4F7NM2CPPp4RQ2-jw84GDZkGolQ-nUdjsjFTadJXFsKh3Y_SD6bAVAYKOttzde5vFzzBHpGXDc1CWTV3lhE7UiMnxk4Y2jzO-ngjiuYKAzLyChwR2UKmu_r6iHU_hPUM_n8xbaZN19aV_v6LOdpouGorviMX7mv6HeL1pUFknsVnmhy6rNOCjah3Q8TcueLy0')

![Class Diagram](https://www.plantuml.com/plantuml/png/nL8zJyCm4DtzAsvCHLC9HgkAYZgmC205n6pYex58pf7lAbGL_ZjEug8aC2AH9Sdp-NqytOx513csZQeQmmntfaKuAuXF3brZJXYkDJmC7pFqPe5ovOEZGtbYmLP3EVqTHgwWxALwWMoLaAVE6i5-5hEHziAw7WXHWoEvJEzhhDwU7UqzMIVEKxRIyE9zWuRKfneJfFlV6IZgwIZTkncX2NC2f0x-dJNSEvPjX8iaU6ljOt-KJRr4eVZ6y6egdCU4yn_5MlI-NbR-M-nOBbaJR7BqJrw6zSc3EzII5ujsD1mP6GerXxSVcyqFzz5KspNO8Wch7PAD6_e5)

![Class Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/mirno/dartCounter2_0/f_interfaces/diagram.puml)

![Class Diagram](https://www.plantuml.com/plantuml/png/nL8zJyCm4DtzAsvCHLC9HgkAYZgmC205n6pYex58pf7lAbGL_Zjnug8aC28n9Nu-lu-dsx6O8CUsKLLZcE7Ej0Xd1G2GGzUO4uPh3G_3pmozMQ1S-U3eK9vOiDLGJe_3o1MKKIeAPAk4F7NM2CPPp4RQ2-jw84GDZkGolQ-nUdjsjFTadJXFsKh3Y_SD6bAVAYKOttzde5vFzzBHpGXDc1CWTV3lhE7UiMnxk4Y2jzO-ngjiuYKAzLyChwR2UKmu_r6iHU_hPUM_n8xbaZN19aV_v6LOdpouGorviMX7mv6HeL1pUFknsVnmhy6rNOCjah3Q8TcueLy0)


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
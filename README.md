# dartCounter2_0
DartCounter2.0 back-end with GoLang front-end with Angular
Project contains of two parts:
- Go (API) back-end
- Angular front-end

===
# Flow chart design for both front & back-end 
( Placeholder since we need to show the flowcharts after v1.0.0 is released )

=== GO ===

# Installation
- Gorilla Mux | 
'go get -u github.com/gorilla/mux.' 

- air | *Having some trouble getting air to work... (WIP)
'go get -u github.com/cosmtrek/air' 

- CORS (Cross-Origin Resource Sharing)
> is a mechanism that allows or restricts requested resources on a web server depending on where the HTTP request was initiated. This is used for security reasons and is particularly important when your front-end and back-end are served from different origins (e.g., different ports during development).
---
> By enabling CORS in your Go server, you're allowing your Angular app (running on a different port) to make requests to your Go API.

# Folder structure
cmd/dartcounter/main.go: The entry point of your application.
pkg/game/game.go: Contains the Game struct and related methods.
pkg/player/player.go: Defines the Player struct.
pkg/score/score.go: Manages the Score struct.
go.mod: Manages your project's dependencies.

# GoLang Syntax information.
## [Receiver parameter](https://blog.devgenius.io/receiver-parameter-in-go-f0c3e25b7b10)
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

> In Go, := is for declaration + assignment, whereas = is for assignment only.
For example, var foo int = 10 is the same as foo := 10.

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

(Note, this was working, need to troubleshoot to make this thing work again dynamically)
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

- Trunk.yaml (To Investigate):

https://docs.trunk.io/check/reference/trunk-yaml

---

-  pre-commit (to be implemented):

https://pre-commit.com/

## Topic to investigate
### Go back-end & API
- [pocketBase](https://pocketbase.io/)
- [Gin webframework](https://pkg.go.dev/github.com/gin-gonic/gin) [2](https://gin-gonic.com/) [git](https://github.com/gin-gonic/gin)
- [Compare Gin, Gorilla, mux and net/http](https://www.golang.company/blog/comparison-between-gin-gorilla-mux-and-net-http)
- [Selecting GO router](https://www.alexedwards.net/blog/which-go-router-should-i-use)

# Extensions used:
- Go https://marketplace.visualstudio.com/items?itemName=golang.Go
- REST Client https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- ESLint https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

=== Angular ===
# Angular Front-End documentation
Install angular and create project
```
npm install -g @angular/cli
ng new dart-counter-frontend  --no-standalone --routing --ssr=false # 
cd dart-counter-frontend
```
Some issue's regarding app.module.ts and routing, please read:
https://github.com/angular/angular/pull/52761
https://github.com/angular/angular/issues/52751

Testing:
```
ng server
```

## app routing
```
ng generate module app-routing --flat --module=app
```

Generate components and service
```
ng generate component <component>
ng generate service game
```

Linting
```
# Install ESLint extension
ng lint
```

# Issue's regarding CORS
## Understanding CORS and Preflight Requests
CORS (Cross-Origin Resource Sharing) is a security feature implemented in web browsers. It restricts web applications from making requests to a domain different from the one that served the web page, unless the server on the other end explicitly allows it. This is particularly important for applications like yours, where the Angular front-end (served from http://localhost:4200) makes requests to a Go API server (running on http://localhost:8080).

## Preflight Requests
When you make certain types of HTTP requests (like POST, PUT, DELETE, or any request that includes custom headers) from a web page to a different domain, the browser first sends an OPTIONS request before the actual request. This is known as a "preflight" request. The purpose is to check whether the actual request is safe to send, based on the CORS policy of the server.

## The Role of OPTIONS Requests
The OPTIONS request asks the server for the permissions (or "CORS policy") it has regarding requests from other origins. The server responds with headers that indicate whether the actual request is allowed. These headers include:

>Access-Control-Allow-Origin: Specifies which origins are allowed. A value of * means any origin is allowed.
Access-Control-Allow-Methods: Lists the HTTP methods that are allowed.
Access-Control-Allow-Headers: Indicates which headers can be used in the actual request.

## problem description
The Angular application, when  tried to make a POST request to the Go API, the browser first sent an OPTIONS request as a preflight check. However, the Go server was not configured to handle OPTIONS requests correctly for the /game/start and /game/score endpoints. As a result, the server responded with a 405 Method Not Allowed status, causing the browser to block the subsequent POST request due to the CORS policy violation.

---

# Frontend development REACT

> npx create-react-app frontend-react --template typescript

## Using TypeScript with React
1. Using TypeScript in your React project offers several benefits, such as improved code quality and developer experience due to static typing. Here are some key points about using TypeScript with React:

2. TypeScript Interfaces: TypeScript interfaces are a powerful way to define the shape of objects or props in React. They help ensure that components receive and use props correctly.

3. Component Props and State: Define interfaces for your component props and state for better type checking.

4. Event Handling: TypeScript can help define the types for event objects in your event handlers, making it easier to access event properties safely.

5. Integration with Third-Party Libraries: Many popular libraries have TypeScript type definitions available, either bundled with the library or as separate @types/ packages.
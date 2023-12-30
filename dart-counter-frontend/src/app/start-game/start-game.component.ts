// score-board.component.ts
import { Component } from '@angular/core';
import { GameService } from '../game.service'; // Adjust the path as necessary

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {

  constructor(private gameService: GameService) { }

  startGame(): void {
    this.gameService.startGame().subscribe(response => {
      console.log('Game started:', response);
      // Handle response
    }, error => {
      console.error('Error starting game:', error);
    });
  }
}

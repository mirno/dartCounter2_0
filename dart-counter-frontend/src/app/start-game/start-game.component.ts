// score-board.component.ts
import { Component } from '@angular/core';
import { GameService } from '../game.service'; // Adjust the path as necessary

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {
  playerName: string = '';

  constructor(private gameService: GameService) { }

  startGame(): void {
    this.gameService.startGame(this.playerName).subscribe(response => {
      console.log('Game started for:', this.playerName);
      // Handle response, e.g., display player's initial score
    }, error => {
      console.error('Error starting game:', error);
    });
  }
}

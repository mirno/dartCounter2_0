// score-board.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service'; // Adjust the path as necessary

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {
  playerName: string = '';
  @Output() gameStarted = new EventEmitter<number>(); // To notify when the game starts

  constructor(private gameService: GameService) { }

  startGame(): void {
    this.gameService.startGame(this.playerName).subscribe(response => {
      console.log('Game started:', response);
      this.gameStarted.emit(501); // Emit the initial score
    }, error => {
      console.error('Error starting game:', error);
    });
  }
}
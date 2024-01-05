import { Component, Input } from '@angular/core';
import { GameService } from '../game.service'; // Adjust the path as necessary

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {
  currentScore: number = 501;
  inputScore: number = 0;

  constructor(private gameService: GameService) { }

  updateScore(newScore: number): void {
    this.gameService.updateScore(newScore).subscribe(response => {
      console.log('Score updated:', response);
      this.currentScore = response.player1Score;
    }, error => {
      console.error('Error updating score:', error);
    });
  }
  resetScore(initialScore: number): void {
    this.currentScore = initialScore;
    this.inputScore = 0; // Reset the input field
  }
}

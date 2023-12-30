import { Component } from '@angular/core';
import { GameService } from '../game.service'; // Adjust the path as necessary

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {
  score: number = 0; // Initialize score

  constructor(private gameService: GameService) { }

  updateScore(): void {
    // Example: increment score by 1 for demonstration
    this.gameService.updateScore(this.score + 1).subscribe(response => {
      console.log('Score updated:', response);
      this.score = response.updatedScore; // Update the score based on the response
    }, error => {
      console.error('Error updating score:', error);
    });
  }
}

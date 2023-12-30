import { Component } from '@angular/core';
import { GameService } from '../game.service'; // Adjust the path as necessary

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  constructor(private gameService: GameService) { }
  
}

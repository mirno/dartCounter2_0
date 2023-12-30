import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080'; // Your Go API URL

  constructor(private http: HttpClient) { }

  startGame(playerName: string) {
    return this.http.post<any>(`${this.apiUrl}/game/start`, { playerName });
  }

  updateScore(score: number) {
    return this.http.post<any>(`${this.apiUrl}/game/score`, { score });
  }
}
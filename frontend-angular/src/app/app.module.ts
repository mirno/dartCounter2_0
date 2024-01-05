import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartGameComponent } from './start-game/start-game.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { TeletextDisplayComponent } from './teletext-display/teletext-display.component';
import { HeaderComponent } from './header/header.component';
import { ScoreDisplayComponent } from './score-display/score-display.component';
import { ScoreInputComponent } from './score-input/score-input.component';
import { ControlButtonsComponent } from './control-buttons/control-buttons.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    StartGameComponent,
    ScoreBoardComponent,
    TeletextDisplayComponent,
    HeaderComponent,
    ScoreDisplayComponent,
    ScoreInputComponent,
    ControlButtonsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

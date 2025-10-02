import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { CounterComponent } from '../../../shared/counter/counter';
import { GameService } from '../../../../services/game.service';
import { MatIconModule } from '@angular/material/icon';
import { GameHistoryService } from '../../../../services/gameHistory';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-running-game',
  templateUrl: './runningGame.html',
  styleUrl: './runningGame.scss',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CounterComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class RunnningGameComponent {
  private readonly gameService = inject(GameService);
  private readonly gameHistoryService = inject(GameHistoryService);

  protected runningGame = this.gameService.runningGame;

  protected updateRoundPoints(
    roundIndex: number,
    team: 'team1' | 'team2',
    points: number,
  ) {
    this.gameService.updateRoundPoints(roundIndex, team, points);
  }

  protected getRoundPoints(
    roundIndex: number,
    team: 'team1' | 'team2',
  ): number {
    const game = this.runningGame();
    if (!game || !game.roundsToPlay[roundIndex]) return 0;
    return team === 'team1'
      ? game.roundsToPlay[roundIndex].team1Points
      : game.roundsToPlay[roundIndex].team2Points;
  }

  protected completeGame(): void {
    const game = this.runningGame();
    if (!game) return;

    this.gameHistoryService.addGameToHistory(game);
    this.gameService.clearGame();
  }
}

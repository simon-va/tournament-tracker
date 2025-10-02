import { Component, inject, linkedSignal } from '@angular/core';
import { CounterComponent } from '../../../../shared/counter/counter';
import { MatDividerModule } from '@angular/material/divider';
import { GameService } from '../../../../../services/game.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-settings',
  templateUrl: './gameSettings.html',
  styleUrl: './gameSettings.scss',
  imports: [CounterComponent, MatDividerModule, FormsModule],
})
export class GameSettingsComponent {
  private readonly gameService = inject(GameService);

  protected runningGame = this.gameService.runningGame;

  protected rounds = linkedSignal(() => this.runningGame()?.rounds);
  protected points = linkedSignal(() => this.runningGame()?.points);

  protected getTeamMembers(teamId: number) {
    const team =
      this.runningGame()?.[teamId === 1 ? 'team1Players' : 'team2Players'] ??
      [];

    if (team.length === 0) {
      return 'Keine Spieler zugewiesen';
    }

    return team.join(', ');
  }
}

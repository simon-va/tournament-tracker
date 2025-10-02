import { Component, computed, inject } from '@angular/core';
import { GameHistoryService } from '../../../services/gameHistory';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { RunningGameConfig } from '../../../services/game.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
  imports: [MatExpansionModule, MatButtonModule, MatCardModule, MatIconModule],
})
export class StatisticsComponent {
  private readonly gameHistoryService = inject(GameHistoryService);

  protected readonly games = this.gameHistoryService.gameHistory;

  protected readonly sortedGames = computed(() =>
    this.games().sort(
      (a, b) => b.completedAt.getTime() - a.completedAt.getTime(),
    ),
  );

  protected deleteEntry(id: string) {
    this.gameHistoryService.removeGameFromHistory(id);
  }

  protected getWinnerNames(gameItem: RunningGameConfig): string {
    const teamId = this.getWinnerTeam(gameItem);

    const team =
      gameItem?.[teamId === 1 ? 'team1Players' : 'team2Players'] ?? [];

    if (team.length === 0) {
      return 'Keine Spieler zugewiesen';
    }

    return team.join(', ');
  }

  private getWinnerTeam(gameItem: RunningGameConfig): number {
    let team1Wins = 0;
    let team2Wins = 0;

    gameItem.roundsToPlay.forEach((round) => {
      if (round.team1Points > round.team2Points) {
        ++team1Wins;
      } else if (round.team1Points < round.team2Points) {
        ++team2Wins;
      }
    });

    if (team1Wins === team2Wins) {
      return 0;
    }

    return team1Wins > team2Wins ? 1 : 2;
  }
}

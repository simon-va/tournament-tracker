// game.service.ts
import { Injectable, effect } from '@angular/core';
import { signal } from '@angular/core';

export interface NewGameConfig {
  rounds: number;
  points?: number;
  usePointLimit: boolean;
  team1Players: string[];
  team2Players: string[];
}

export interface RunningGameConfig extends NewGameConfig {
  roundsToPlay: {
    team1Points: number;
    team2Points: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly STORAGE_KEY = 'runningGame';
  private readonly _runningGame = signal<RunningGameConfig | undefined>(
    this.loadGameFromStorage(),
  );
  public runningGame = this._runningGame.asReadonly();

  constructor() {
    effect(() => {
      const game = this._runningGame();
      this.saveGameToStorage(game);
    });
  }

  public startNewGame(newGameConfig: NewGameConfig) {
    this._runningGame.set(this.getRunningGameConfig(newGameConfig));
  }

  public clearGame() {
    this._runningGame.set(undefined);
  }

  // Neue Methode zum Aktualisieren der Punkte für eine bestimmte Runde
  public updateRoundPoints(
    roundIndex: number,
    team: 'team1' | 'team2',
    points: number,
  ) {
    const currentGame = this._runningGame();
    if (!currentGame || !currentGame.roundsToPlay[roundIndex]) return;

    const updatedRounds = [...currentGame.roundsToPlay];
    updatedRounds[roundIndex] = {
      ...updatedRounds[roundIndex],
      [team === 'team1' ? 'team1Points' : 'team2Points']: points,
    };

    this._runningGame.set({
      ...currentGame,
      roundsToPlay: updatedRounds,
    });
  }

  private saveGameToStorage(game: RunningGameConfig | undefined): void {
    try {
      if (game) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(game));
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (error) {
      console.error('Fehler beim Speichern im LocalStorage:', error);
    }
  }

  private loadGameFromStorage(): RunningGameConfig | undefined {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : undefined;
    } catch (error) {
      console.error('Fehler beim Laden aus dem LocalStorage:', error);
      return undefined;
    }
  }

  private getRunningGameConfig(
    newGameConfig: NewGameConfig,
  ): RunningGameConfig {
    return {
      ...newGameConfig,
      roundsToPlay: Array.from({ length: newGameConfig.rounds }, () => ({
        team1Points: 0,
        team2Points: 0,
      })),
    };
  }
}

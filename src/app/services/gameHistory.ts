import { Injectable, effect, signal } from '@angular/core';
import { RunningGameConfig } from './game.service';

export interface GameHistoryEntry {
  id: string;
  game: RunningGameConfig;
  completedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class GameHistoryService {
  private readonly STORAGE_KEY = 'gameHistory';
  private readonly _gameHistory = signal<GameHistoryEntry[]>(
    this.loadHistoryFromStorage(),
  );
  public gameHistory = this._gameHistory.asReadonly();

  constructor() {
    effect(() => {
      const history = this._gameHistory();
      this.saveHistoryToStorage(history);
    });
  }

  public addGameToHistory(game: RunningGameConfig): void {
    const newEntry: GameHistoryEntry = {
      id: this.generateId(),
      game,
      completedAt: new Date(),
    };

    this._gameHistory.update((history) => [newEntry, ...history]);
  }

  public clearHistory(): void {
    this._gameHistory.set([]);
  }

  public removeGameFromHistory(id: string): void {
    this._gameHistory.update((history) =>
      history.filter((entry) => entry.id !== id),
    );
  }

  private saveHistoryToStorage(history: GameHistoryEntry[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error(
        'Fehler beim Speichern der History im LocalStorage:',
        error,
      );
    }
  }

  private loadHistoryFromStorage(): GameHistoryEntry[] {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (!saved) return [];

      const parsed = JSON.parse(saved);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return parsed.map((entry: any) => ({
        ...entry,
        completedAt: new Date(entry.completedAt),
      }));
    } catch (error) {
      console.error(
        'Fehler beim Laden der History aus dem LocalStorage:',
        error,
      );
      return [];
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

import { Component, model, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rounds-step',
  standalone: true,
  imports: [MatIconModule, MatChipsModule, MatButtonModule],
  template: `
    <div class="rounds-input remove-tabs-header">
      <button mat-icon-button (click)="decrement()" [disabled]="rounds() <= 1">
        <mat-icon>remove</mat-icon>
      </button>
      <div class="rounds-display">{{ rounds() }}</div>
      <button mat-icon-button (click)="increment()">
        <mat-icon>add</mat-icon>
      </button>
    </div>
    <mat-chip-set aria-label="Schnellwahl Runden">
      <mat-chip (click)="selectRounds(3)">Best-Of 3</mat-chip>
      <mat-chip (click)="selectRounds(5)">Best-Of 5</mat-chip>
      <mat-chip (click)="selectRounds(7)">Best-Of 7</mat-chip>
    </mat-chip-set>
    <div class="hint">Anzahl Runden eintragen</div>
  `,
  styles: [
    `
      .rounds-input {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        user-select: none;
        margin-bottom: 1rem;
      }
      .rounds-display {
        font-size: 2rem;
        min-width: 3rem;
        text-align: center;
      }
      mat-chip-set {
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class RoundsStepComponent {
  rounds = model<number>(1);
  roundsSelected = output<void>();

  increment() {
    this.rounds.update((r) => r + 1);
  }

  decrement() {
    if (this.rounds() > 1) {
      this.rounds.update((r) => r - 1);
    }
  }

  selectRounds(value: number) {
    this.rounds.set(value);
    this.roundsSelected.emit();
  }
}

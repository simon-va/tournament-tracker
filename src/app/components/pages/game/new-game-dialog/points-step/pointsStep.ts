import { Component, model, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-points-step',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    FormsModule,
  ],
  template: `
    <div class="remove-tabs-header">
      <div class="points-toggle">
        <mat-slide-toggle labelPosition="before" [(ngModel)]="usePointsLimit">
          Punkte limitieren
        </mat-slide-toggle>
      </div>

      @if (usePointsLimit()) {
        <div class="points-input">
          <button
            mat-icon-button
            (click)="decrement()"
            [disabled]="points() <= 1"
          >
            <mat-icon>remove</mat-icon>
          </button>
          <div class="points-display">{{ points() }}</div>
          <button mat-icon-button (click)="increment()">
            <mat-icon>add</mat-icon>
          </button>
        </div>
        <mat-chip-set aria-label="Schnellwahl Punkte">
          <mat-chip (click)="selectPoints(10)">10</mat-chip>
          <mat-chip (click)="selectPoints(21)">21</mat-chip>
          <mat-chip (click)="selectPoints(25)">25</mat-chip>
        </mat-chip-set>
        <div class="hint">Benötigte Punkte zum Gewinnen.</div>
      }
    </div>
  `,
  styles: [
    `
      .points-toggle {
        display: flex;
        justify-content: end;
        margin-bottom: 1rem;
      }
      .points-input {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        user-select: none;
      }
      .points-display {
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
export class PointsStepComponent {
  points = model<number>(1);
  usePointsLimit = model<boolean>(true);
  pointsSelected = output<void>();

  increment() {
    this.points.update((p) => p + 1);
  }

  decrement() {
    if (this.points() > 1) {
      this.points.update((p) => p - 1);
    }
  }

  selectPoints(value: number) {
    this.points.set(value);
    this.pointsSelected.emit();
  }
}

import { Component, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './newGameDialog.html',
  styleUrl: './newGameDialog.scss',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatChipsModule,
  ],
})
export class NewGameDialogComponent {
  private dialogRef = inject(MatDialogRef<NewGameDialogComponent>);

  tabs = ['Runden', 'Spieler', 'Punkte'];
  selected = signal(0);

  rounds = signal(1);
  points = signal(1);
  usePointsLimit = signal(true);
  team1Player1 = signal('');
  team1Player2 = signal('');
  team2Player1 = signal('');
  team2Player2 = signal('');

  protected switchTab(value: number) {
    const newIndex = this.selected() + value;

    if (newIndex < 0) {
      return;
    }

    if (newIndex > this.tabs.length - 1) {
      this.dialogRef.close({
        rounds: this.rounds(),
        points: this.points(),
        usePointLimit: this.usePointsLimit(),
        team1Player1: this.team1Player1(),
        team1Player2: this.team1Player2(),
        team2Player1: this.team2Player1(),
        team2Player2: this.team2Player2(),
      });

      return;
    }
    this.selected.set(newIndex);
  }

  protected changeRounds(value: number) {
    this.rounds.update((rounds) => rounds + value);
  }

  protected changePoints(value: number) {
    this.points.update((points) => points + value);
  }

  protected onRoundsToggleChange({ checked }: { checked: boolean }) {
    this.usePointsLimit.set(checked);
  }

  protected setRounds(value: number) {
    this.rounds.set(value);
    this.switchTab(1);
  }

  protected setPoints(value: number) {
    this.points.set(value);
    this.switchTab(1);
  }
}

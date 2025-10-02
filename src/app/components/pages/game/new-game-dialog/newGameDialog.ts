// newGameDialog.ts
import { Component, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RoundsStepComponent } from './rounds-step/roundsStep';
import { PlayersStepComponent } from './players-step/playersStep';
import { PointsStepComponent } from './points-step/pointsStep';
import { NewGameConfig } from '../../../../services/game.service';

@Component({
  selector: 'app-new-game-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    RoundsStepComponent,
    PlayersStepComponent,
    PointsStepComponent,
  ],
  templateUrl: './newGameDialog.html',
  styleUrl: './newGameDialog.scss',
})
export class NewGameDialogComponent {
  private dialogRef = inject(
    MatDialogRef<NewGameDialogComponent, NewGameConfig>,
  );

  selectedTab = signal(0);

  // Game configuration data
  rounds = signal(1);
  points = signal(1);
  usePointsLimit = signal(true);
  team1Players = signal<string[]>(['']);
  team2Players = signal<string[]>(['']);

  previousTab() {
    if (this.selectedTab() > 0) {
      this.selectedTab.update((tab) => tab - 1);
    }
  }

  nextTab() {
    if (this.selectedTab() < 2) {
      this.selectedTab.update((tab) => tab + 1);
    } else {
      this.closeDialog();
    }
  }

  private closeDialog() {
    const config: NewGameConfig = {
      rounds: this.rounds(),
      points: this.usePointsLimit() ? this.points() : undefined,
      usePointLimit: this.usePointsLimit(),
      team1Players: this.team1Players().filter((p) => p.trim() !== ''),
      team2Players: this.team2Players().filter((p) => p.trim() !== ''),
    };
    this.dialogRef.close(config);
  }
}

import { Component, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RoundsStepComponent } from './rounds-step/roundsStep.component';
import { PlayersStepComponent } from './players-step/playersStep.component';
import { PointsStepComponent } from './points-step/pointsStep.component';

export interface GameConfig {
  rounds: number;
  points?: number;
  usePointLimit: boolean;
  team1Player1: string;
  team1Player2: string;
  team2Player1: string;
  team2Player2: string;
}

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
  private dialogRef = inject(MatDialogRef<NewGameDialogComponent>);

  selectedTab = signal(0);

  // Game configuration data
  rounds = signal(1);
  points = signal(1);
  usePointsLimit = signal(true);
  team1Player1 = signal('');
  team1Player2 = signal('');
  team2Player1 = signal('');
  team2Player2 = signal('');

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
    const config: GameConfig = {
      rounds: this.rounds(),
      points: this.usePointsLimit() ? this.points() : undefined,
      usePointLimit: this.usePointsLimit(),
      team1Player1: this.team1Player1(),
      team1Player2: this.team1Player2(),
      team2Player1: this.team2Player1(),
      team2Player2: this.team2Player2(),
    };

    this.dialogRef.close(config);
  }
}

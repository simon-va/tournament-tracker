import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-players-step',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <mat-accordion>
      <mat-expansion-panel [expanded]="true">
        <mat-expansion-panel-header>
          <mat-panel-title>Team 1</mat-panel-title>
        </mat-expansion-panel-header>
        <div class="team-inputs">
          @for (player of team1Players(); track $index) {
            <mat-form-field class="full-width">
              <mat-label>Spieler {{ $index + 1 }}</mat-label>
              <input
                matInput
                [(ngModel)]="team1Players()[$index]"
                (ngModelChange)="onPlayerChange(1, $index)"
              />
            </mat-form-field>
          }
        </div>
      </mat-expansion-panel>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>Team 2</mat-panel-title>
        </mat-expansion-panel-header>
        <div class="team-inputs">
          @for (player of team2Players(); track $index) {
            <mat-form-field class="full-width">
              <mat-label>Spieler {{ $index + 1 }}</mat-label>
              <input
                matInput
                [(ngModel)]="team2Players()[$index]"
                (ngModelChange)="onPlayerChange(2, $index)"
              />
            </mat-form-field>
          }
        </div>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      :host {
        @include mat.expansion-overrides(
          (
            container-background-color: var(--mat-sys-surface-container),
          )
        );
      }
      .team-inputs {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .full-width {
        width: 100%;
      }
    `,
  ],
})
export class PlayersStepComponent {
  team1Players = model<string[]>(['']);
  team2Players = model<string[]>(['']);

  onPlayerChange(team: number, index: number) {
    const players = team === 1 ? this.team1Players() : this.team2Players();
    const currentValue = players[index].trim();

    // Wenn das letzte Feld beschrieben wird, füge ein neues leeres Feld hinzu
    if (currentValue !== '' && index === players.length - 1) {
      const newPlayers = [...players, ''];
      if (team === 1) {
        this.team1Players.set(newPlayers);
      } else {
        this.team2Players.set(newPlayers);
      }
    }

    // Entferne leere Felder, außer es ist das letzte
    if (
      currentValue === '' &&
      players.length > 1 &&
      index !== players.length - 1
    ) {
      const newPlayers = players.filter((_, i) => i !== index);
      if (team === 1) {
        this.team1Players.set(newPlayers);
      } else {
        this.team2Players.set(newPlayers);
      }
    }
  }
}

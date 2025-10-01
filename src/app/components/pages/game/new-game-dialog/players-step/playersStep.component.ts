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
          <mat-form-field class="full-width">
            <mat-label>Spieler 1</mat-label>
            <input matInput [(ngModel)]="team1Player1" />
          </mat-form-field>
          <mat-form-field class="full-width">
            <mat-label>Spieler 2</mat-label>
            <input matInput [(ngModel)]="team1Player2" />
          </mat-form-field>
        </div>
      </mat-expansion-panel>

      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>Team 2</mat-panel-title>
        </mat-expansion-panel-header>
        <div class="team-inputs">
          <mat-form-field class="full-width">
            <mat-label>Spieler 1</mat-label>
            <input matInput [(ngModel)]="team2Player1" />
          </mat-form-field>
          <mat-form-field class="full-width">
            <mat-label>Spieler 2</mat-label>
            <input matInput [(ngModel)]="team2Player2" />
          </mat-form-field>
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
  team1Player1 = model<string>('');
  team1Player2 = model<string>('');
  team2Player1 = model<string>('');
  team2Player2 = model<string>('');
}

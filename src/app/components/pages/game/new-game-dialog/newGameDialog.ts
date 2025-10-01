import { Component, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ],
})
export class NewGameDialogComponent {
  private dialogRef = inject(MatDialogRef<NewGameDialogComponent>);

  tabs = ['Runden', 'Spieler'];
  selected = signal(0);

  rounds = signal(1);

  protected switchTab(value: number) {
    const newIndex = this.selected() + value;

    if (newIndex < 0) {
      return;
    }

    if (newIndex > this.tabs.length - 1) {
      this.dialogRef.close();

      return;
    }
    this.selected.set(newIndex);
  }

  protected changeRounds(value: number) {
    this.rounds.update((rounds) => rounds + value);
  }
}

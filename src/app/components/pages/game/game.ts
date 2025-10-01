import { Component, inject, signal } from '@angular/core';
import { FloatingButtonComponent } from '../../shared/floating-button/floatingButton';
import { MatDialog } from '@angular/material/dialog';
import {
  GameConfig,
  NewGameDialogComponent,
} from './new-game-dialog/newGameDialog';

@Component({
  selector: 'app-game-page',
  templateUrl: './game.html',
  imports: [FloatingButtonComponent],
})
export class GameComponent {
  readonly dialog = inject(MatDialog);

  protected gameConfig = signal<GameConfig | undefined>(undefined);

  protected openDialog() {
    const dialogRef = this.dialog.open(NewGameDialogComponent);

    dialogRef.afterClosed().subscribe((result: GameConfig) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.gameConfig.set(result);
      }
    });
  }
}

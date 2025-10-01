import { Component, inject } from '@angular/core';
import { FloatingButtonComponent } from '../../shared/floating-button/floatingButton';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from './new-game-dialog/newGameDialog';

@Component({
  selector: 'app-game-page',
  templateUrl: './game.html',
  imports: [FloatingButtonComponent],
})
export class GameComponent {
  readonly dialog = inject(MatDialog);

  protected openDialog() {
    const dialogRef = this.dialog.open(NewGameDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
      }
    });
  }
}

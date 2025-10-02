import { Component, inject } from '@angular/core';
import { FloatingButtonComponent } from '../../shared/floating-button/floatingButton';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from './new-game-dialog/newGameDialog';
import { NewGameConfig } from '../../../services/game.service';
import { GameService } from '../../../services/game.service';
import { RunnningGameComponent } from './running-game/runningGame';

@Component({
  selector: 'app-game-page',
  templateUrl: './game.html',
  imports: [FloatingButtonComponent, RunnningGameComponent],
})
export class GameComponent {
  private readonly dialog = inject(MatDialog);
  protected readonly gameService = inject(GameService);

  protected openDialog() {
    const dialogRef = this.dialog.open(NewGameDialogComponent);

    dialogRef.afterClosed().subscribe((result: NewGameConfig) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.gameService.startNewGame(result);
      }
    });
  }
}

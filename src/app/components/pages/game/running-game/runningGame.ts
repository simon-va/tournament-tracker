import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { CounterComponent } from '../../../shared/counter/counter';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'app-running-game',
  templateUrl: './runningGame.html',
  styleUrl: './runningGame.scss',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CounterComponent,
  ],
})
export class RunnningGameComponent {
  private readonly gameService = inject(GameService);

  protected number1 = signal<number>(0);
  protected number2 = signal<number>(0);
}

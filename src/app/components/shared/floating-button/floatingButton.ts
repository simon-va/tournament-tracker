import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-floating-button',
  template: ` <button matFab class="fab" (click)="onClick()">
    <mat-icon>{{ icon() }}</mat-icon>
  </button>`,
  imports: [MatIconModule, MatButtonModule],
  styles: `
    .fab {
      position: fixed;
      bottom: 80px;
      right: 24px;
      z-index: 100;
    }
  `,
})
export class FloatingButtonComponent {
  public readonly icon = input.required<string>();
  public readonly handleClick = output();

  protected onClick(): void {
    this.handleClick.emit();
  }
}

import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatIconModule, MatButtonModule],
  selector: 'app-counter',
  template: ` <div class="points-input">
    <button
      mat-icon-button
      (click)="decrement()"
      [disabled]="value <= minNumber() || disabled"
    >
      <mat-icon>remove</mat-icon>
    </button>
    <div class="points-display">{{ value }}</div>
    <button
      mat-icon-button
      (click)="increment()"
      [disabled]="value >= maxNumber() || disabled"
    >
      <mat-icon>add</mat-icon>
    </button>
  </div>`,
  styles: `
    .points-input {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      user-select: none;
    }
    .points-display {
      font-size: 2rem;
      min-width: 3rem;
      text-align: center;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true,
    },
  ],
})
export class CounterComponent implements ControlValueAccessor {
  public minNumber = input<number>(1);
  public maxNumber = input<number>(Infinity);

  protected value = 0;
  protected disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: number) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value = value ?? this.minNumber();
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected decrement(): void {
    if (this.value > this.minNumber() && !this.disabled) {
      this.value--;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  protected increment(): void {
    if (this.value < this.maxNumber() && !this.disabled) {
      this.value++;
      this.onChange(this.value);
      this.onTouched();
    }
  }
}

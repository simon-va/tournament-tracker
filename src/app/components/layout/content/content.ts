import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.html',
  styleUrl: './content.scss',
  imports: [RouterOutlet],
})
export class ContentComponent {}

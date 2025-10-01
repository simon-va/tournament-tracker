import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header';
import { ContentComponent } from './layout/content/content';
import { NavigationComponent } from './layout/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ContentComponent, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

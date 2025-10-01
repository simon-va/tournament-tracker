import { Component } from '@angular/core';
import { HeaderComponent } from './components/layout/header/header';
import { ContentComponent } from './components/layout/content/content';
import { NavigationComponent } from './components/layout/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ContentComponent, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

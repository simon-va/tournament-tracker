import { Routes } from '@angular/router';
import { GameComponent } from './pages/game/game';
import { StatisticsComponent } from './pages/statistics/statistics';

export const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: '/game' },
];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoinComponent } from './coin/coin.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'coin/:id', component: CoinComponent },
  {
    path: 'news',
    component: NewsComponent,
  },
];

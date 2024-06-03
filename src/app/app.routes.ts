import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoinComponent } from './coin/coin.component';
import { NewsComponent } from './news/news.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'coin/:id', component: CoinComponent },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path:'auth',
    component:AuthComponent
  },
  {
    path:"search",
    component:SearchComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"watchlist",
    component:WatchlistComponent
  }
];

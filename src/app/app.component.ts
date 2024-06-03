import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { coinDataService } from './shared/coindata.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/auth.service';
import { DataBaseServie } from './shared/database.service';
import { DashBoardDataService } from './shared/dashboardata.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[coinDataService,AuthService,DataBaseServie,DashBoardDataService]
})
export class AppComponent {
  title = 'crypto_sakha';
}

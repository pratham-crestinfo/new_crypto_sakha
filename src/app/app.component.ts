import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { coinDataService } from './shared/coindata.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[coinDataService]
})
export class AppComponent {
  title = 'crypto_sakha';
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { coinDataService } from '../shared/coindata.service';

@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css',
})
export class CoinComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    private coinDataService: coinDataService
  ) {}
  id: string = '';
  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.coinDataService.getCoinData(this.id).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}

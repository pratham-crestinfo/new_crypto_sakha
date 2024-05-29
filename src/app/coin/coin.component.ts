import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { coinDataService } from '../shared/coindata.service';
import { ChartComponent } from './chart/chart.component';
import { CommonModule } from '@angular/common';
import { Chart2Component } from './chart2/chart2.component';

@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [ChartComponent,CommonModule,Chart2Component],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css',
})
export class CoinComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    private coinDataService: coinDataService
  ) {}
  isDataLoaded = false;
  id: string = '';
  volume_24h:string="";
  alltimehigh_price:string="";
  alltimehigh_time:string="";
  marketCap:string="";
  maxSupply:string="";
  circulatingSupply:string="";
  supplytime:string="";
  change:number=0;
  price:string="";
  priceTime:string="";
  iconUrl:string="";
  color:string="";
  name:string="";
  chart_types:string[]=["prices","ohlc"];
  ngOnInit() 
  {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.coinDataService.getCoinData(this.id).subscribe({
      next: (mydata:any) => {
        console.log(mydata)
          this.assigndata(mydata);      
      },
      complete:()=>{
        this.isDataLoaded = true;
      }
    });
  }


  assigndata(mydata:any)
  {
    this.volume_24h=mydata.data.coin['24hVolume'];
    this.alltimehigh_price=this.coinDataService.getValues(Number(parseFloat(mydata.data.coin.allTimeHigh.price).toFixed(2)));
    this.alltimehigh_time=this.coinDataService.getDateTime(mydata.data.coin.allTimeHigh.timestamp);
    this.marketCap=this.coinDataService.getValues(Number(mydata.data.coin.marketCap));
    this.maxSupply=this.coinDataService.getValues(Number(mydata.data.coin.supply.max));
    this.circulatingSupply=this.coinDataService.getValues(Number(mydata.data.coin.supply.circulating));
    this.supplytime=this.coinDataService.getDateTime(mydata.data.coin.supply.supplyAt);
    this.change=mydata.data.coin.change;
    this.price=this.coinDataService.getValues(Number(parseFloat(mydata.data.coin.price).toFixed(2)));
    this.priceTime=this.coinDataService.getDateTime(mydata.data.coin.allTimeHigh.timestamp);
    this.iconUrl=mydata.data.coin.iconUrl;
    this.color=mydata.data.coin.color;
    this.name=mydata.data.coin.name;
  }
}

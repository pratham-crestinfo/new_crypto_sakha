import { Component } from '@angular/core';
import { DashBoardDataService } from '../shared/dashboardata.service';
import { HttpClient } from '@angular/common/http';
import { coinDataService } from '../shared/coindata.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { of } from 'rxjs';


interface coinDataType{
  name:string,
  iconUrl:string,
  change:string,
  symbol:string, 
  price:string,
  uuid:string
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent 
{
  constructor(private http:HttpClient,private coindataservice:coinDataService,private dashboardservice:DashBoardDataService,private activeroute:ActivatedRoute,private router:Router){}
  referenceCurrencyRate:number=0;
  totalCoins:number=0;
  totalMarkets:number=0;
  totalExchanges:number=0;
  totalMarketCap:string="";
  total24hVolume:string="";
  btcDominance:string="";
  bestcoins:any[]=[];
  newestCoins:any[]=[];
  stats:Array<{ [key: string]: any }>=[];
  coinData:coinDataType[]=[];
  offset:number=0;
  prevpossible:boolean=false;
  ngOnInit()
  {
    this.dashboardservice.getglobalstats().subscribe({
      next:(res:any)=>{
           this.stats.push({referenceCurrencyRate: res.data.referenceCurrencyRate})
           this.stats.push({totalCoins: res.data.totalCoins})
           this.stats.push({totalMarkets: res.data.totalMarkets})
           this.stats.push({totalExchanges: res.data.totalExchanges})
           this.stats.push({totalMarketCap: this.coindataservice.getValues(res.data.totalMarketCap)})
           this.stats.push({total24hVolume: this.coindataservice.getValues(res.data.totalMarketCap)})
           this.stats.push({btcDominance: this.coindataservice.getValues(res.data.btcDominance)})
           this.bestcoins=res.data.bestCoins;
           this.newestCoins=res.data.newestCoins;
      },
      error:(error:Error)=>{
        console.log(error);
      } })
      this.dashboardservice.getCoinsData('0').subscribe({
        next:(res:any)=>{
          for(let i=0;i<res.data.coins.length;i++)
            {
                 this.coinData.push({
                  name:res.data.coins[i].name,
                  iconUrl:res.data.coins[i].iconUrl,
                  change:res.data.coins[i].change,
                  symbol:res.data.coins[i].symbol, 
                  price:res.data.coins[i].price,
                  uuid:res.data.coins[i].uuid
                 })
            }
        },
        error:(err:Error)=>{
          console.log(err);
        }
      })
  }
  getObjectKey(obj: { [key: string]: any }): string {
    return Object.keys(obj)[0];
  }

  // Method to get the value of the object
  getObjectValue(obj: { [key: string]: any }): any {
    const key = this.getObjectKey(obj);
    return obj[key];
  }
  getCoinDetails(id:string)
  {
    this.router.navigate(['/coin',id],{relativeTo:this.activeroute})
  }
  forward(){
    this.offset=this.offset+50;
    this.prevpossible=true;
      this.dashboardservice.getCoinsData(String(this.offset)).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.coinData=[];
          for(let i=0;i<res.data.coins.length;i++)
            {
                 this.coinData.push({
                  name:res.data.coins[i].name,
                  iconUrl:res.data.coins[i].iconUrl,
                  change:res.data.coins[i].change,
                  symbol:res.data.coins[i].symbol, 
                  price:res.data.coins[i].price,
                  uuid:res.data.coins[i].uuid
                 })
            }
        } ,
        error:(err:Error)=>{
          console.log(err);
        }
      })
  }
  prev(){
    this.offset=this.offset-50;
    if(this.offset<=0)
      {
        this.offset=0;
        this.prevpossible=false;
      }
    this.dashboardservice.getCoinsData(String(this.offset)).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.coinData=[];
        for(let i=0;i<res.data.coins.length;i++)
          {
               this.coinData.push({
                name:res.data.coins[i].name,
                iconUrl:res.data.coins[i].iconUrl,
                change:res.data.coins[i].change,
                symbol:res.data.coins[i].symbol, 
                price:res.data.coins[i].price,
                uuid:res.data.coins[i].uuid
               })
          }
      } ,
      error:(err:Error)=>{
        console.log(err);
      }
    })
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseServie } from '../shared/database.service';
import { coinDataService } from '../shared/coindata.service';

interface coinDataType{
  name:string,
  iconUrl:string,
  change:string,
  symbol:string, 
  price:string,
  uuid:string
}


@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent {
  constructor(private authservice: AuthService,private router:Router,private activeRoute:ActivatedRoute,private dbs:DataBaseServie,private coindataservice:coinDataService){}
  isAuthenticated: boolean = false;
  user: User;
  coinId:string[]=[];
  coinData:coinDataType[]=[];
  ngOnInit() {
    this.authservice.isAuthenticated.subscribe({
      next: (res) => {
        console.log(res);
        this.isAuthenticated = res;
      },
    });
    this.authservice.user.subscribe({
      next: (res) => {
        console.log(res);
        this.user = res;
      },
    });
   if( this.user==null || this.isAuthenticated == false && new Date() > this.user._tokenExpirationDate)
    {
      this.router.navigate(['/home'],{relativeTo:this.activeRoute})
    }
    else{
      this.fetchCoinData(this.user.id).then(data => {
        if(data==null)
          {
            console.log("NO DATA FOUND")
          }
          else
          {
            this.coinId = data;
            console.log(this.coinId);
            for(let i=0;i<this.coinId.length;i++)
              {
                this.coindataservice.getCoinData(this.coinId[i]).subscribe({
                  next:(res:any)=>{
                    this.coinData.push({
                      name:res.data.coin.name,
                      iconUrl:res.data.coin.iconUrl,
                      change:res.data.coin.change,
                      symbol:res.data.coin.symbol,
                      price:res.data.coin.price,
                      uuid:res.data.coin.uuid,
                    })
                  }
                })
              }
          }
        
      })
      .catch(error => {
        console.error("Error fetching coin data:", error);
      });;



  }
}
fetchCoinData(uid: string): Promise<any> {
  return this.dbs.getcoind(uid);
}
getCoinDetails(id:string){
  this.router.navigate(['/coin',id],{relativeTo:this.activeRoute})
}
}
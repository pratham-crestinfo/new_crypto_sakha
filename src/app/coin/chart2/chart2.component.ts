import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { coinDataService } from '../../shared/coindata.service';
import { Params } from '@angular/router';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-chart2',
  standalone: true,
  imports: [],
  templateUrl: './chart2.component.html',
  styleUrl: './chart2.component.css'
})
export class Chart2Component {
  id:string="";
  OHLCdata:{
    open:number[];
    close:number[];
    high:number[];
    low:number[];
    dates:string[]
  }={
    open:[],
    close:[],high:[],low:[],dates:[]
  }
  constructor(private activeroute: ActivatedRoute,private coinDataService:coinDataService) {}
  ngOnInit()
  {
    this.activeroute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });   
    this.getOHLCPriceData();
  }
  public chart: any;
  getOHLCPriceData()
{
    this.coinDataService.getOhlcChart(this.id).subscribe({
      next:(res:any)=>{
      for(let i=0;i<res.data.ohlc.length;i++)
          {
              this.OHLCdata.open.push(Number(parseFloat(res.data.ohlc[i].open).toFixed(2)));
              this.OHLCdata.close.push(Number(parseFloat(res.data.ohlc[i].close).toFixed(2)));
              this.OHLCdata.low.push(Number(parseFloat(res.data.ohlc[i].low).toFixed(2)));
              this.OHLCdata.high.push(Number(parseFloat(res.data.ohlc[i].high).toFixed(2)));
              this.OHLCdata.dates.push(this.coinDataService.getDate(res.data.ohlc[i].startingAt));
          }
          console.log("done")
      },
      error:(err:Error)=>
      {
        console.log(err);
      },
      complete:()=>{
        this.createOHLCchart();
        console.log("done2")
      }
    })
}
createOHLCchart()
{
  this.chart = new Chart('ui', {
    type: 'line',
    data: {
      labels: this.OHLCdata.dates,       // values on X-Axis
      datasets: [
        {
          label: 'open',
          data: this.OHLCdata.open,
          backgroundColor:"blue",
        },
        {
          label: 'close',
          data: this.OHLCdata.close,
          backgroundColor:"yellow",
        },
        {
          label: 'low',
          data: this.OHLCdata.low,
          backgroundColor:"red",
        },
        {
          label: 'high',
          data: this.OHLCdata.high,
          backgroundColor:"green",
        },
      ],
    },
    options: {aspectRatio: 2.5 },
  });
}
}

import { ActivatedRoute } from '@angular/router';
import { coinDataService } from '../../shared/coindata.service';
import { Params } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';


@Component({
  selector: 'app-sparkline',
  standalone: true,
  imports: [],
  templateUrl: './sparkline.component.html',
  styleUrl: './sparkline.component.css'
})
export class SparklineComponent {
  public chart: any;
  @Input() data:number[];
  
  ngOnInit()
  {
    // console.log(this.data)
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.data.length)
    if (changes['data'] && this.data.length) {
      this.createsparkline();
    }
  }
  createsparkline()
  {
    console.log(this.data.length)
    this.chart = new Chart('sparkline', {
      type: 'line',
      data: {
        labels: this.data.map((_, index) => index.toString()), // values on X-Axis
        datasets: [
          {
            label: 'Coin Prices',
            data: this.data,
          },
        ],
      },
       options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false, // Hide x-axis
          },
          y: {
            display: false, // Hide y-axis
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        elements: {
          line: {
            tension: 0.4, // Smooth the line
          },
        },
        animation: {
          duration: 0, // Disable animation for a more immediate effect
        },
    }});
  }
}

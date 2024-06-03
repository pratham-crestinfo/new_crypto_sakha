import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { coinDataService } from '../../shared/coindata.service';
import { Params } from '@angular/router';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-sparkline',
  standalone: true,
  imports: [],
  templateUrl: './sparkline.component.html',
  styleUrl: './sparkline.component.css'
})
export class SparklineComponent {
  public chart: any;
  ngOnInit()
  {
    
  }
}

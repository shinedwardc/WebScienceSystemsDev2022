import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ScatterComponent } from './scatter/scatter.component';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

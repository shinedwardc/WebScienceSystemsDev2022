import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ScatterComponent } from './scatter/scatter.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-visualizations',
  templateUrl: './visualizations.component.html',
  styleUrls: ['./visualizations.component.css']
})
export class VisualizationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  private data : any = [];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  show : boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.data = [];
    this.http.GetRequest('mongo','').subscribe((data) => {
      this.data = data;
      this.createSvg();
      this.drawBars(this.data); 
    })
  }

  ShowVisual(){
    if (!this.show){
      this.show = true;
    }
    else{
      this.show = false;
    }
  }  
  /*private PowerOf10s(int : number): number{
    let power : number = 0;
    while (int / 10 >= 1){
      power++;
    }
    return power;
  }*/

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Title))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(40,0)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 600000000])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y))
    //.selectAll("text")
    //.attr("transform", "rotate(-45)")

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.imdbVotes))
    .attr("y", (d: any) => y(d.BoxOffice))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.BoxOffice))
    .attr("fill", "#d04a35");
}

}

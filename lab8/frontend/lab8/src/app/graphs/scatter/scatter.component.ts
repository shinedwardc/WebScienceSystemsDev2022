import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {
  private data : any = [];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.data = [];
    this.http.GetRequest('csv','').subscribe((data) => {
      this.data = data;
      let index = 0;
      while (index != 995){
        this.data.pop();
        index++;
      }     
      this.createSvg();
      this.drawPlot(); 
    })
    console.log(this.data);
  }
  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawPlot(): void {
      // Add X axis
      const x = d3.scaleLinear()
      .domain([1950,2020])
      .range([ 0, this.width ]);
      this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      // Add Y axis
      const y = d3.scaleLinear()
      .domain([0, 2500000])
      .range([ this.height, 0]);
      this.svg.append("g")
      .call(d3.axisLeft(y));

      // Add dots
      const dots = this.svg.append('g');
      dots.selectAll("dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("cx", (d: any) => x(d.Released_Year))
      .attr("cy", (d: any) => y(d.No_of_Votes))
      .attr("r", 7)
      .style("opacity", .5)
      .style("fill", "#69b3a2");

      // Add labels
      dots.selectAll("text")
      .data(this.data)
      .enter()
      .append("text")
      .text((d: any) => d.Series_Title)
      .attr("x", (d: any) => x(d.Released_Year))
      .attr("y", (d: any) => y(d.No_of_Votes))
  }
}

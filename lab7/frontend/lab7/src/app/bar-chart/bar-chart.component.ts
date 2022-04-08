import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as d3 from 'd3';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  private data : any = [];
  private haha = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.data = [];
    this.http.GetRequest('csv','').subscribe((data) => {
      /*for (var i = 0; i){
        this.data.push(i);
      }*/
      /*let index : number = 0;
      let temp = [];
      temp.push(data);
      console.log(temp[0]);
      for (let i of temp[0]){
        if (index == 5){
          break;
        }
        this.data.push(i);
        index++;
      }*/
      //console.log(data);
      this.data = data;
      let index = 0;
      while (index != 995){
        this.data.pop();
        index++;
      }
      //console.log(this.haha[0]);
      //console.log(this.data[0][0]);
      //this.data.push(data);
      //console.log(data);
      //console.log(this.data);
      this.createSvg();
      this.drawBars(this.data); 
    })
    //console.log(this.data);
    //console.log(this.haha);
    
  }

  private PowerOf10s(int : number): number{
    let power : number = 0;
    while (int / 10 >= 1){
      power++;
    }
    return power;
  }

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
    .domain(data.map(d => d.Series_Title))
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
    .domain([0, 2500000])
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
    .attr("x", (d: any) => x(d.Series_Title))
    .attr("y", (d: any) => y(d.No_of_Votes))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.No_of_Votes))
    .attr("fill", "#d04a35");
}

}

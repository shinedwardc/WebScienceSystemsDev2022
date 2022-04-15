import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  title : string = "";
  url : string = "";
  data : any = [];
  isDisplayed: boolean = false;
  noMovie: boolean = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  /*getTitle(newTitle : string){
    this.title = "";
    if (newTitle){
      this.title += newTitle;
      console.log(this.title);
    } 
  }*/

  /*getData(){
    this.url += this.title;
    this.http.get(this.url).subscribe((res)=>{
      this.data = res;
      console.log(this.data);
    })
  }*/
  onSubmit(data: NgForm){
    this.title = "";
    //console.log(data.value.title);
    this.title += data.value.title;
    //console.log(this.title);
    this.url = "search";
    //this.url += this.title;
    console.log(this.url);
    this.http.GetRequest(this.url,this.title).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      if (this.data.length === 0){
        this.noMovie = ! this.noMovie;
        return;
      }
      else if (this.isDisplayed === false){
        this.isDisplayed = ! this.isDisplayed;
      }
    })
  }




}

//import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';

/*interface Movie {
  title: string,
  year: number,
  rated: string,
  released: string,
  runtime: string,
  genre: string,
  director: string,
  writer: string,
  actors: string,
  plot: string,
  metascore: number,
  imdbrating: number,
  poster: any
}*/

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {

  //data : Movie[] = [];
  title : string = "";
  queue : number = 0;
  Got : boolean = false;
  //form: FormGroup
  constructor(private http: HttpService) { 
  }

  ngOnInit(): void {
  }

  submitNumber(f: NgForm){
    this.queue = 0;
    //console.log(f.value);
    //console.log(f.value.number);
    this.queue = f.value.number;
    console.log(this.queue);
  }

  submitTitle(f: NgForm){
    this.title = "";
    this.title = f.value.title;
    console.log(this.title);
  }

  /*
  sendData() {
    console.log(this.title);
    //console.log(JSON.stringify(this.data));
    console.log(this.data);
    console.log(this.data[0].title);
    this.http.PostRequest('db',{
      title : this.data[0].title,
      year : this.data[0].year,
      rated : this.data[0].rated,
      released: this.data[0].released,
      runtime: this.data[0].runtime,
      genre: this.data[0].genre,
      director: this.data[0].director,
      writer: this.data[0].writer,
      actors: this.data[0].actors,
      plot: this.data[0].plot,
      metascore: this.data[0].metascore,
      imdbrating: this.data[0].imdbrating,
      poster: this.data[0].poster 
    }).subscribe((data) => {
      console.log(data);
    });

  submitData(){
    var formData: any = new FormData();
    formData.append()
  }

  }*/
  /*
  FetchData(f: NgForm){
    this.data = [];
    this.title = f.form.value.title;
    this.http.GetMovieData(this.title).subscribe((data:any) => {
        for (const i in data){
          this.data.push(i);
        }
        const movie : Movie = {
          title : data.Title,
          year : data.Year,
          rated : data.Rated,
          released: data.Released,
          runtime: data.Runtime,
          genre: data.Genre,
          director: data.Director,
          writer: data.Writer,
          actors: data.Actors,
          plot: data.Plot,
          metascore: data.Metascore,
          imdbrating: data.imdbRating,
          poster: data.Poster          
        }
        //console.log(movie.title);
        //console.log(movie);
        this.data.push(movie);
        //console.log(this.data[0]);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    this.http.PostRequest('db', {
      title : this.data[0].title,
      year : this.data[0].year,
      rated : this.data[0].rated,
      released: this.data[0].released,
      runtime: this.data[0].runtime,
      genre: this.data[0].genre,
      director: this.data[0].director,
      writer: this.data[0].writer,
      actors: this.data[0].actors,
      plot: this.data[0].plot,
      metascore: this.data[0].metascore,
      imdbrating: this.data[0].imdbrating,
      poster: this.data[0].poster 
    }).subscribe((data) => {
      console.log(data);
    })
    )
    )
    //this.sendData()
  }*/
  Get(){
    this.Got = false;
    console.log(this.queue);
    if (this.queue === 0){
      this.http.GetRequest('db','').subscribe((data) => {
        console.log(data);
      })
      this.Got = !this.Got;
    }
    else{
      this.http.GetRequest('db',this.queue.toString()).subscribe((data) => {
        console.log(data);
      })
      this.Got = !this.Got;
    }
  }
  Post(){
    this.Got = false;
    if (this.queue !== 0){
      alert("Reset number, number cannot be inputted");
    }
    else if (this.title !== ""){
      this.http.PostRequest('db',{title: this.title}).subscribe((data) => {
        
      })
    }
    else{
      alert("Must have title inputted!");
    }
  }
  Put(){
    this.Got = false;
    if (this.queue === 0){
      this.http.PutRequest('db',{title: this.title}).subscribe((data) => {
        console.log(data);
      })
    }
    else{
      //console.log("Not 0");
      this.http.PutRequestWithParam('db',this.queue,{title: this.title}).subscribe((data) => {
        console.log(data);
      })
    }
  }
  Delete(){
    //console.log("Deleting: " + this.queue);
    this.Got = false;
    if (this.queue !== 0){
      console.log("Not 0!");
      this.http.DeleteRequestWithParam('db',this.queue).subscribe((data) =>{
        console.log(data);
      })
    }
    else{
      this.http.DeleteRequest('db').subscribe((data) => {

      })
    }
  }
  Reset(){
    this.queue = 0;
    this.title = "";
    this.Got = false;
  }
  /*delete(){
    this.http.DeleteRequest('db').subscribe((data) => {
      
    })
  }*/
  /*
  deleteReq(f: NgForm){
    console.log(f.value.number);
    //console.log(f.value.number === undefined)
    //console.log(f.value.number.length);
    if ((f.value.number.length) !== 0){
      this.queue = f.value.number;
      console.log(this.queue)
      this.http.DeleteRequestWithParam('db',this.queue).subscribe((data) => {

      })
    }
    else{
      this.http.DeleteRequest('db').subscribe((data) => {

      })
    }

  }

  get(f: NgForm){
    this.http.GetRequest('db','').subscribe((data) =>{
      console.log(data);
    })
  }


  post(f: NgForm){
    this.title = f.form.value.title;
    console.log(this.title);
    //console.log(JSON.stringify(this.data));
    //console.log(this.data[0].title);
    this.http.PostRequest('db',{title: this.title}).subscribe((data) => {
      console.log(data);
    });

  }*/
}
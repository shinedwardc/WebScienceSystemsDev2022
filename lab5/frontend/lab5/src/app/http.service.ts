import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteConfigLoadEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = "http://localhost:3000/"
  //private key = 'b7577ca';
  constructor(private httpClient: HttpClient) { }
  public GetMovieData(title: string){
    return this.httpClient.get('http://www.omdbapi.com/?apikey=b7577ca&t=' + title + '&plot=full')
  }
  public GetRequest(endpoint: string, number: string) {
    if (number === ""){
      return this.httpClient.get(this.url + endpoint);
    }
    return this.httpClient.get(this.url + endpoint + '/' + number)
  }
  public PostRequest(endpoint: string, body: Object){
    //console.log(endpoint);
    //console.log(data);
    return this.httpClient.post(this.url + endpoint, body);
  }
  public PutRequest(endpoint: string, body: Object){
    return this.httpClient.put(this.url + endpoint,body);
  }
  public PutRequestWithParam(endpoint: string, N: number, body: Object){
    return this.httpClient.put(this.url + endpoint + '/' + N, body);
  }
  public DeleteRequest(endpoint: string){
    return this.httpClient.delete(this.url + endpoint);
  }
  public DeleteRequestWithParam(endpoint: string, N: number){
    return this.httpClient.delete(this.url + endpoint + '/' + N);
  }
}

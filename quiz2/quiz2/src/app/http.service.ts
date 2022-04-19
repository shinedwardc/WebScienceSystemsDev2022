import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = "http://localhost:3000/"
  //private key = 'b7577ca';
  constructor(private httpClient: HttpClient) { }
  /*public GetMovieData(endpoint: string, title: string){
    return this.httpClient.get(this.url + endpoint + '/' + title);
  }*/
  public GetRequest(endpoint: string, query: string) 
  {
    if (query === ""){
      return this.httpClient.get(this.url + endpoint);
    }
    return this.httpClient.get(this.url + endpoint + '/' + query)
  }

  public PostRequest(endpoint: string, body: Object)
  {
    return this.httpClient.post(this.url + endpoint, body);
  }

  public PutRequest(endpoint: string, query: string, body: Object)
  {
    if (query === ""){
      return this.httpClient.put(this.url + endpoint,body);
    }
    return this.httpClient.put(this.url + endpoint + '/' + query, body);
  }

  public DeleteRequest(endpoint: string, query: string)
  {
    if (query === ""){
      return this.httpClient.delete(this.url + endpoint)
    }
    return this.httpClient.delete(this.url + endpoint + '/' + query);
  }
}

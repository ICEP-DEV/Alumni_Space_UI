import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'config';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {



  private apiURL = `${baseUrl}/queries`; // Replace with your API endpoint
  private Query: any[]=[]
  constructor(private http: HttpClient) {}

  
  getQueries(): Observable<any[]> {
    const getQueriesURL = `${this.apiURL}/get_queries`;
    return this.http.get<any[]>(getQueriesURL);
  }

  /*sendQuery(query: any): Observable<any> {
    return this.http.post<any>(this.apiURL, query);
  }*/
}

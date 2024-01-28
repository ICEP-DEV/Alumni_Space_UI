import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'config';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  constructor(private http: HttpClient) { }

  //private apiUrl = 'http://localhost:3000/api/count_alumni';
  

 

  getAlumniCount(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/count_alumni`);
  }
}

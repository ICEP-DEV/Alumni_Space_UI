import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'config';
import { filesUrl } from 'config';



@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  constructor(private _http: HttpClient) { }

  //api = "http://localhost:3000/"

  getAllAlumni() {
    return this._http.get(`${filesUrl}/get_all_users`);
  }

  getAlumniDetails(alumni_id: Number) {
    return this._http.get(`${filesUrl}/get_user_details/` + alumni_id);
  }
  getAlumniCount(): Observable<any> {
    return this._http.get<any>(`${baseUrl}/count_alumni`);
  }

  add_employment(body: any) {
    return this._http.post(`${filesUrl}/add_employment`, body, {
      observe: 'body'
    });
  }

  update_employment(id : Number,data: any) {
    return this._http.put(`${filesUrl}/update_employment/`+id, data);
  }
  
}

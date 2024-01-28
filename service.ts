import { HttpClient ,  HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  // Generate a URL for the uploaded image


 

  constructor(private http:HttpClient){}

  private events: any[] = [];


  addEvent(event: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.events.push(event);
   
  }


  getEvents() {
    return this.events;
  }
 
}

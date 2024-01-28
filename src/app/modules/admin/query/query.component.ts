import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'config';

import { QueriesService } from 'src/app/services/queries/queries.service';
import { NotificationsService } from 'src/app/services/notification/notifications.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent {

  private apiUrl = `${baseUrl}/queries`


  data = [
    { user: 'Kuhle Mbatha', query: 'Hello, I have a question.', status: 'Unanswered', response: '' },
    { user: 'Malthus Lidavhu', query: 'Need assistance with an order.', status: 'Unanswered', response: '' }
  ];
  queries: any[] = [];
  responseForms: boolean[] = new Array(this.data.length).fill(false);

  constructor(private http: HttpClient, private queriesService: QueriesService, private notificationService: NotificationsService) { }

  toggleResponseForm(index: number) {
    this.responseForms[index] = !this.responseForms[index];
  }

  submitResponse(index: number) {
    this.data[index].status = 'Answered';
    this.responseForms[index] = false;
  }

  submitResponse1(index: number, query : any) {
    //this.queries[index].status = 'Answered';
    //this.responseForms[index] = false;

    //localStorage.setItem('queries', JSON.stringify(this.queries));

    //respond
    this.respondToQuery(query);
    this.responseForms[index] = false;
  }

  ngOnInit() {
    //get queries
    this.fetchQueries();
  }

  fetchQueries(): void {
    this.queriesService.getQueries().subscribe(
      (response: any) => {
        this.queries = response.queries;
      },
      (error) => {
        console.error('Error fetching queries:', error);
        // Handle error as needed
      }
    );
  }

  respondToQuery(query: any) {

    const requestBody = {
      query_id: query.query_id,
      query_response: query.response
    };
    console.log(requestBody);

    this.http.post<any>(`${this.apiUrl}/respond_query`, requestBody).subscribe(response => {
    console.log('Query sent to server:', response);
  });

    //send notifications
    const notification = {
      sender_id: 1,
      receiver_id: query.account_id,
      message : query.response,
      date: new Date().toISOString()
    }

    //this.sendNotification();
    this.notificationService.sendNotification(notification).subscribe((response:any) => {
      //response
    });
  }

  
  }
  

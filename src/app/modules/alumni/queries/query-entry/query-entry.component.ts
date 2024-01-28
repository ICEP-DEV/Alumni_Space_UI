import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueriesService } from 'src/app/services/queries/queries.service';
import { baseUrl } from 'config';

@Component({
  selector: 'app-query-entry',
  templateUrl: './query-entry.component.html',
  styleUrls: ['./query-entry.component.css']
})
export class QueryEntryComponent {

  private apiUrl = `${baseUrl}/queries`

  newQuestion: string='';
  queryText:string=''; 
  queries: any[] = [];
 
 constructor(private dialog: MatDialog, private queryService: QueriesService,private http:HttpClient){}

public openSuccessDialog(): void {

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.dialog.open(SuccessDialogComponent, {
    data: { message: 'Your message was sent successfully!' },
    closeOnNavigation: true,
  });


  const userQuestionInput = document.getElementById('user-question-input') as HTMLInputElement;
  this.queryText = userQuestionInput.value;

  //save on local storage
  console.log(this.queryText);
  const query = {
    alumni: localStorage.getItem('name'),
    query: this.queryText,
    status: 'Unanswered',
    timestamp: new Date().toDateString,
  };
  /*this.queries.push(query);
  localStorage.setItem('queries', JSON.stringify(this.queries));*/
  
  this.sendQuery(query);
}

sendQuery(query: any): void{
  const accountId = localStorage.getItem('account_id');
  const status = 'Unanswered';

  const requestBody = {
    account_id: accountId,
    query_text: query.query,
    status,
    date: new Date().toISOString()
  };

  this.http.post<any>(`${this.apiUrl}/send_query`, requestBody).subscribe(response => {
    console.log('Query sent to server:', response);
  });
}

}

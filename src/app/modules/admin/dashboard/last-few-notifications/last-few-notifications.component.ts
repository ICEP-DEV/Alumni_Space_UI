import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-last-few-notifications',
  templateUrl: './last-few-notifications.component.html',
  styleUrls: ['./last-few-notifications.component.css']
})
export class LastFewNotificationsComponent {
  
  // MatDialog: DialogRef;
  totalAlumnRegistered: number=10;
  Total_jobs_posted: number=2;
  Total_events_posted: number=3;
  reportdate = new Date();
 formattedDate = this.reportdate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit'
});

  constructor( private router: Router,private http: HttpClient,){}

  ngOnInit(){
    this.getData();
  }

  StatsSummary = [
    {
      // id:1,
      subject: "Alumni registered:",
      message: this.totalAlumnRegistered +" registered recently",
      date: this.formattedDate,
    },
    {
      // id:2,
      subject: "Events posted:",
      message: this.Total_events_posted + " posted this month",
      date: this.formattedDate,
    },
    {
      // id:2,
      subject: "Jobs Posted:",
      message: this.Total_jobs_posted + " posted this month",
      date: this.formattedDate,
    }
    
  ];
  showNotification(){
    
    // alert('Notification viewed!');
    //pop-up dialog to open
 
  }
  returnHome(){
    this.router.navigate(['/adminHome']);
  }

  getData(){
      this.http.get('http://localhost:3000/api/count_alumni').subscribe((response: any) => {
      console.log('Data sent to server:', response);
      // Clear the form fields after successful submission
      
      console.log(response.result);
      this.totalAlumnRegistered = response.result;
      //alumni_count: alumniCount

    });
    
  }
}
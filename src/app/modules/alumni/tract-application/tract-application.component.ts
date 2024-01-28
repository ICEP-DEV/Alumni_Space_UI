import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JobAppService } from 'src/app/services/jobApp/job-app.service';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'config';
interface Alumni{
  job_title: string;
  application_status: string;
  application_date: string; 
  timeStamp?: Date;
}
@Component({
  selector: 'app-tract-application',
  templateUrl: './tract-application.component.html',
  styleUrls: ['./tract-application.component.css']
})
export class TractApplicationComponent {
  appData: Alumni[] = [];
  jobs: any[] = [];
  num: number = 0;
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private jobAppService: JobAppService,
    private router: Router
  ) {}

  //private apiUrl = `${baseUrl}/trackApp`;
  ngOnInit() {
 //   const account_id = localStorage.getItem('account_id');
    this.fetchDataFromApi(localStorage.getItem('account_id'));
    //this.getAllJobs();
    
  }

  fetchDataFromApi(account_id: any) {
    this.jobAppService.getApplications(account_id).subscribe(
      (data: any) => {
        this.appData = data.applications;
        console.log(this.appData);
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching alumni data:', error);
      }
    );
  }

  trackByFn(index: number, item: Alumni) {
    return item.job_title;
  }

  toggleResponseForm(row: Alumni) {
    const index = this.appData.indexOf(row);
    if (index !== -1) {
      this.appData.splice(index, 1);
    }
  }

  returnHome() {
    this.router.navigate(['/alumni/home']);
  }

  // getAllJobs(){
  //   this.http.get(this.apiUrl).subscribe((response: any) => {
  //     console.log('Data sent to server:', response);
  //     // Fetch jobs using the service
  //     this.jobs = response.jobs;
  //     this.num = this.jobs.length;
      
  // })
// }
}

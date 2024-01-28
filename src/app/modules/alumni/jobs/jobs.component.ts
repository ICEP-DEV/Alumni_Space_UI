import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { baseUrl } from 'config';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css', 'assets/css/bootstrap.min.css',
    'assets/css/owl.carousel.min.css',
    'assets/css/price_rangs.css',
    'assets/css/flaticon.css',
    'assets/css/slicknav.css',
    'assets/css/animate.min.css',
    'assets/css/magnific-popup.css',
    'assets/css/fontawesome-all.min.css',
    'assets/css/themify-icons.css',
    'assets/css/slick.css',
    'assets/css/nice-select.css',
    'assets/css/style.css']
})
export class JobsComponent {

  currDate: Date = new Date();
  time: string = '';
  name: string = '';
  num: number = 0;
  jobs: any[] = [];
  currentDate: string = '';
  currentDate2: Date = new Date();

  constructor(private http: HttpClient, private router: Router, private jobsService: JobsService) { }

  //constructor(private jobService: Job) {}

  private apiUrl = `${baseUrl}/jobs`;

  ngOnInit() {
    //get all
    this.getAllJobs();
    
      this.updateTime();
      this.updateCurrentDate();

      setInterval(() => {
        this.updateTime();
        this.updateCurrentDate();
      }, 1000);
  }


  updateTime() {
    let now = new Date();
    this.time = this.getCurrentTimeWithAMPM(now);
  }

  getCurrentTimeWithAMPM(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const AMPM = isPM ? 'PM' : 'AM';

    // Convert to 12-hour format
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${AMPM}`;
  }

  updateCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const date = now.getDate().toString().padStart(2, '0');

    this.currentDate = `${year}-${month}-${date}`;
    this.autoDelete();
  }

  getTimeDifference(datePosted: Date): string {
    const timeDiff = this.currentDate2.getTime() - new Date(datePosted).getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return ` ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return ` ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return ` ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return ` a few seconds ago`;
    }
  }

  //
  searchJobs() {
    var job_type = 'Full-time';
    var location = 'Emalahleni';
    var date_posted = '2023-11-27';

    const formData = { job_type, location, date_posted };

    this.jobsService.searchJobs(formData).subscribe((response: any) => {
      console.log("Button clicked");
      //console.log('Data sent to server:', response);
      // Fetch jobs using the service
      this.jobs = response.result;
      this.num = this.jobs.length;
    });

  }

  getAllJobs(){
    this.http.get(this.apiUrl).subscribe((response: any) => {
      console.log('Data sent to server:', response);
      // Fetch jobs using the service
      this.jobs = response.jobs;
      this.num = this.jobs.length;
    });
  }

  autoDelete() {
    this.http.delete(`${this.apiUrl}/deletejobs`).subscribe((response: any) => {
      console.log('Data sent to server:', response);
    });

    //refresh
    this.getAllJobs();
  }

  returnHome(){
    this.router.navigate(['/alumni/home']);
  }

  viewJob(job_id: any ){
    //store id
    localStorage.setItem('job_id',job_id);
    this.router.navigate(['/alumni/job']);
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { baseUrl } from 'config';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css', 'assets/css/bootstrap.min.css',
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
export class JobDescriptionComponent {


  id = '';
  job_title: string = ' ';
  Organisation: string = '';
  workplace_type: string = '';
  location: string = '';
  job_type: string = '';
  job_description: string = '';
  date_posted: string = '';
  deadline: string = '';
  required_Skills: string ='';
  experience: string ='';
  salary  ='';


  constructor(private http: HttpClient) {
  
  }


  ngOnInit() {
    const id = localStorage.getItem('job_id');

    //const url = 'http://localhost:3000/api/job/' + id;
    const url = `${baseUrl}/jobcareer/` + id;

    this.http.get(url).subscribe((response: any) => {
      console.log('Data sent to server:', response);
      // Fetch jobs using the service
      this.job_title = response.data.job_title;
      this.Organisation = response.data.Organisation;
      this.workplace_type = response.data.workplace_type;
      this.location = response.data.location;
      this.job_type = response.data.job_type;
      this.job_description = response.data.job_description;
      this.required_Skills = response.data.required_Skills;
      this.experience = response.data.experience;
      this.salary = response.data.salary;
      this.date_posted = response.data.date_posted;
      this.deadline = response.data.deadline;

      //
      localStorage.setItem('job_title', this.job_title);
    localStorage.setItem('job_description', this.job_description);
    });
    
  }
}

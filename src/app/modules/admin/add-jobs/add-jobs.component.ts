import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { baseUrl } from 'config';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  num: number = 0;

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


  /* stname: string ="";
   course: string ="";
   fee: string ="";
   currentStudentID = "";*/

   jobForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private jobsService: JobsService) {
    this.getAllStudent();
    this.setupJobDeletionTimer();


    this.jobForm = this.formBuilder.group({
      job_title: ['', Validators.required],
      Organisation: ['', Validators.required],
      workplace_type: ['', Validators.required],
      location: ['', Validators.required],
      job_type: ['', Validators.required],
      job_description: ['', Validators.required],
      date_posted: [''],
      deadline: [''],
      required_Skills: ['', Validators.required],
      experience: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  private apiUrl = `${baseUrl}/jobs`


  ngOnInit() {
    this.http.get(this.apiUrl).subscribe((response: any) => {
      console.log('Data sent to server:', response);
      // Fetch jobs using the service
      this.StudentArray = response.jobs;
      this.num = this.StudentArray.length;
    });
  }

  getAllStudent() {
    this.http.get(`${this.apiUrl}/newjob`)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
        console.log(this.StudentArray);
      });
  }

  register() {
    if (this.jobForm.valid) {
      let bodyData = this.jobForm.value;
      console.log(bodyData);
      this.jobsService.createJob(bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Job Added Successfully");
        //this.getAllStudent();
        this.jobForm.reset();
      });
    }
  }

  setUpdate(data: any) {

    this.job_title = data.job_title;
    this.Organisation = data.Organisation;
    this.workplace_type = data.workplace_type;
    this.location = data.location;
    this.job_type = data.job_type;
    this.job_description = data.job_description;
    this.date_posted = data.date_posted;
    this.deadline = data.deadline;
    this.experience = data.experience;
    this.required_Skills = data.required_Skills;
    this.salary = data.salary;

  }

  UpdateRecords() {
    let bodyData =
    {
      /*"stname" : this.stname,
      "course" : this.course,
      "fee" : this.fee*/

      "job_title": this.job_title,
      "Organisation": this.Organisation,
      "workplace_type": this.workplace_type,
      "location": this.location,
      "job_type": this.job_type,
      "job_description": this.job_description,
      "date_posted": this.date_posted,
      "deadline": this.deadline,
      "experience": this.experience,
      "required_Skills": this.required_Skills,
      "salary": this.salary,
    };

    this.jobsService.updateJob(this.id, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Job Updated");
      this.getAllStudent();
    });
  }

  save() {
    if (this.id == '') {
      this.register();
    }
    else {
      this.UpdateRecords();
    }

  }


  setDelete(data: any) {
    const jobId = data.job_id;
    console.log(jobId);
  
    this.jobsService.deleteJob(jobId).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Job Deleted");
      this.getAllStudent();
    });
  }

  setupJobDeletionTimer() {
    setInterval(() => {
      this.removeExpiredJobs();
    }, 60000);
  }



  removeExpiredJobs() {
    const currentTime = new Date();

    this.http.get(this.apiUrl).subscribe((response: any) => {
      const jobs = response.jobs;
      const jobsToDelete = jobs.filter((job: Job) => {
        const jobDeadline = new Date(job.deadline);
        return jobDeadline <= currentTime;
      });

      if (jobsToDelete.length > 0) {
        // Send a request to delete the expired jobs from the server.
        this.http.post(`${this.apiUrl}/deletejobs`, { jobs: jobsToDelete }).subscribe(() => {
          console.log('Expired jobs deleted');
        });
      }
    });
  }

}

interface Job {
  job_id: number;
  job_title: string;
  Organisation: string;
  workplace_type: string;
  location: string;
  job_type: string;
  job_description: string;
  date_posted: string;
  deadline: string;
 experience: string;
  required_Skills: string;
  salary:  number;
}
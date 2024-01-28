import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'config';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl  =`${baseUrl}/jobs`;

  constructor(private http: HttpClient) { }

  //CRUD for Jobs

  //--Create
  createJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/newjob`, jobData);
  }

  //--READ
  searchJobs(jobsData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/search`,jobsData);
  }

  //--UPDATE
  updateJob(jobId: any, jobData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${jobId}`, jobData);
  }

  //--DELETE
  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${jobId}`);
  }



  getJobCount(): Observable<{ job_count: number }> {
    return this.http.get<{ job_count: number }>(`${this.apiUrl}/count_job`);
  }


  //Apply
  submitApplication(applicationData: any): Observable<any> {
    console.log(applicationData);

    const formData = new FormData();

    formData.append('id_document', applicationData.id_document);
    formData.append('additional_document', applicationData.additional_document);
    formData.append("job_title", applicationData.job_title);
    formData.append("job_description", applicationData.job_description);
    formData.append("alumni_id", applicationData.alumni_id);


    return this.http.post(`${this.apiUrl}/applyjob`, formData);
  }

  //Get Applications
  getApplications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/applications`);
  }
  
}

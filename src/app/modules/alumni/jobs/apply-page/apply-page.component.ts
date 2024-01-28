import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { baseUrl } from 'config';


@Component({
  selector: 'app-apply-page',
  templateUrl: './apply-page.component.html',
  styleUrls: ['./apply-page.component.css']
})
export class ApplyPageComponent implements OnInit {
  name: string = '';
  surname: string = '';
  email: string = '';

  idDocument: File | null = null;
  additionalDocuments: File | null = null;

  applicant = {
    name: '',
    email: ''
  };

  constructor(private dataService: JobsService, private snackbar: MatSnackBar, private router: Router, private http: HttpClient) { }

  ngOnInit() {

    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    const email = localStorage.getItem('email');
    if (name && surname) {
      this.name = name + ' ' + surname;
    }

    if (email) {
      this.email = email;
    }

    //get job data
    this.getJobInfo();


  }

  handleFileInput(event: any) {
    // Handle file input changes
    console.log('File selected:', event.target.files);
    // Add logic to handle file uploads
    if (event.target.files && event.target.files.length > 0) {
  
      //select file
       this.idDocument = event.target.files[0];
     }
  }
  handleFileInput2(event: any) {
    // Handle file input changes
    console.log('File selected:', event.target.files);
    // Add logic to handle file uploads
    if (event.target.files && event.target.files.length > 0) {
  
      //select file
       this.additionalDocuments = event.target.files[0];
     }
  }



  submitForm(form: NgForm) {

    if (this.email.length == 0 || this.name.length == 0) {
      this.showSnackbar('Please fill in the missing field(s)');
    } else {
      this.showSnackbar('Application submitted successfully!');
      //this.router.navigate(['/alumni/profile/view-profile']);
    }


    if (form.valid) {
      const applicationData = {
        alumni_id: localStorage.getItem('account_id'),
        job_title: localStorage.getItem('job_title'),
        job_description: localStorage.getItem('job_description'),
        id_document: this.idDocument,
        additional_document: this.additionalDocuments
      };

      console.log(applicationData.id_document);

      this.dataService.submitApplication(applicationData).subscribe(
        (response: any) => {
          console.log('Application submitted successfully:', response);

          if (response.message === 'Application successful!') {

            //navigate
            this.router.navigate(['/alumni/job']);
          } else {
            //clear localStorage
            localStorage.removeItem('job_title');
            localStorage.removeItem('job_description');
            localStorage.removeItem('job_id');

            this.router.navigate(['/alumni/home']);
          }
        });
    } else {
      this.router.navigate(['/alumni/apply-page']);
    }

  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 2000, // Duration the snackbar is shown in milliseconds
      verticalPosition: 'top', // Set the vertical position to 'top'
      horizontalPosition: 'center', // Set the horizontal position to 'center'
      panelClass: ['snackbar'], // Add your custom class for styling
    });

    this.router.navigate(['/alumni/home']);
  }

  getJobInfo() {
    const id = localStorage.getItem('job_id');

    //const url = 'http://localhost:3000/api/job/' + id;
    /*const url = `${baseUrl}/jobcareer/` + id;

    this.http.get(url).subscribe((response: any) => {
      console.log('Data sent to server:', response);
      // Fetch jobs using the service
      this.job_title = response.data.job_title;
      this.job_description = response.data.job_description;
    });*/

    
  }


}
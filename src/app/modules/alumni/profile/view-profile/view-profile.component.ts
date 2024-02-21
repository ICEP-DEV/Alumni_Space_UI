import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { baseUrl } from 'config';
import { filesUrl } from 'config';
//import { UserProfileService } from '../user-profile.service';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {

  private apiUrl = `${baseUrl}/profile`;


  alumni = {
    Name: "name placeholder",
    Surname: 'surname',
  }
  //snackbar
  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration the snackbar is shown in milliseconds
      verticalPosition: 'top', // Set the vertical position to 'top'
      horizontalPosition: 'center', // Set the horizontal position to 'center'
      panelClass: ['snackbar'], // Add your custom class for styling
    });
  }
  certificates: any[] = [];
  Email: any
  icounter = 0;
  Alumni_profile: any


  constructor(private http: HttpClient, private router: Router, private ProfileService: ProfileService, private sanitizer: DomSanitizer, private snackBar: MatSnackBar) {
    //this.academicTranscripts = this.ProfileService.getDocuments();
    //this.certificates = this.ProfileService.getCertificatess();
    //this.images = this.ProfileService.getImages();
  }

  ngOnInit() {
    const storedName = localStorage.getItem('name');
    const storedSurname = localStorage.getItem('surname');
    const user_id = localStorage.getItem('account_id');
    this.Email = localStorage.getItem('email');
    console.log('User_id:' + user_id);

    //get profile details from server
    this.http.put(`${this.apiUrl}/get_profile`, { user_id }).subscribe((response: any) => {
      console.log('Data sent to server:', response);
      this.Alumni_profile = response.result[0]
      //this.alumni.Skills = response.userprofile.skills;
      console.log(response.result[0]);


    });

    this.ProfileService.getMyCerts(user_id).subscribe((response: any) => {
      //certs
      this.certificates = response.myCerts;
    });



    if (storedName && storedSurname) {
      // Update the 'name' property if 'name' is found in localStorage
      this.alumni.Name = storedName;
      this.alumni.Surname = storedSurname;
    }
  }

  editProfile(){
    this.router.navigate([''])
  }
  deleteCertificate(index: number, certificateId: any) {
    // this.certificateNames[i].delete()
    if (index !== -1) {
      this.certificates.splice(index, 1); // Remove the certificate at the specified index
      //this.certificateNames.splice(index, 1); // Remove the corresponding name at the same index
      this.ProfileService.deleteMyCert(certificateId).subscribe((response: any) => {
        //deleted
      });
      //this.fileTypeError.splice(index, 1); // Remove the error message at the same index
      this.showSnackbar('Certificate deleted successfully!');
    }
  }

  getDocuments(docFile: String) {
    return `${filesUrl}/uploads/docs/certs/${docFile}`;
  }


  returnHome() {
    this.router.navigate(['/alumni/home']);
  }
}

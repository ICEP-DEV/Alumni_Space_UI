import { Component, OnInit} from '@angular/core';
import { LastFewNotificationsComponent } from '../last-few-notifications/last-few-notifications.component';
import { ThisReceiver } from '@angular/compiler';
import { FormBuilder, FormGroup} from '@angular/forms';
import { counter } from '@fortawesome/fontawesome-svg-core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { baseUrl } from 'config';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private apiUrl = `${baseUrl}/profile`
  searchForm: FormGroup;
  adminFname: string ='Sihle';
 adminLname: string ='Mhlongo';
 adminFnLletter: string = this.adminFname.substring(0,1) + this.adminLname.substring(0,1);
 contact_No: string = '0867867879';
 address: string ='245 burger str, Pretoria';
 email: string ='admin@tutalumni.com';

newName: string ='';
newcontact_No: string='';
newAddress: string='';
newEmail: string ='';
searchText: string ='';
searchResults: any;
isSearch: boolean = false;
 alumniName: string='Sihle';
 alumni_Pic: string='';
 isAdminProf: boolean = false;
 isEditAdminProf: boolean = false;
 resultsFound: boolean = false;
 notificatinId: number=0;

  //alumniList: any[] = [];
  constructor(private http: HttpClient, private router: Router,private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.searchForm = this.formBuilder.group({
      searchText: ['']
    });
  }

  ngOnInit() {}

 
  searchAlumni() {
    const searchText = this.searchForm.get('SearchText')?.value;
    if (this.searchText && this.searchText.length !== 0) {
      this.isSearch = true;
   
    } else {
      this.showSnackbar('Type alumni name to search something!');
    }
  }
  onInputChange(event: any) {
    this.searchText = event.target.value;
  }
  
 ShowAdminProfile(){
            
    this.isAdminProf = !this.isAdminProf;
   
  }
  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration the snackbar is shown in milliseconds
      verticalPosition: 'top', // Set the vertical position to 'top'
      horizontalPosition: 'center', // Set the horizontal position to 'center'
      panelClass: ['snackbar'], // Add your custom class for styling
    });
  }

  editAdminProfile(){
    this.isEditAdminProf = !this.isEditAdminProf;
    this.isAdminProf = this.isAdminProf;
    //this.isAdminProf = !this.isEditAdminProf;
  }
   
SaveAdminProfile(){
  const nameSize = this.newName.length;
  if(this.newName.length != 0 && this.newcontact_No.length != 0 && this.newEmail.length != 0 && this.newAddress.length != 0){
     this.adminFname = this.newName.substring(0, this.newName.indexOf(' '));
     this.adminLname = this.newName.substring(this.newName.indexOf(' '), nameSize);
     this.contact_No = this.newcontact_No;
     this.email = this.newEmail;
    this.address = this.newAddress;
    this.adminFnLletter = this.adminFname.substring(0, 1) + this.adminLname.substring(1, 2);

    const admni_id = localStorage.getItem('account_id');

    const formData = { admni_id, name: this.newName, newcontact_No: this.newcontact_No, address: this.newAddress, email: this.newEmail };
    
    //pass data into the server
    this.http.put(`${this.apiUrl}/update/:admni_id`, formData).subscribe((response: any) => {
      console.log('Data sent to server:', response);
    });
    console.log(formData);
    console.log(admni_id);
    
  this.showSnackbar('Admin Profile updated successfully!');
  this.isEditAdminProf = !this.isEditAdminProf;
  }else
  {
     this.showSnackbar('please fill the missing fields!');
  }
  
  
}



}

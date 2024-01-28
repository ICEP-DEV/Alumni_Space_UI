import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { io } from "socket.io-client";

import { ProfileService } from 'src/app/modules/alumni/profile/profile.service';

//URLs
import { baseUrl } from 'config';
import { chatUrl } from 'config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Alumni_Space_UI';

  email = '';
  password = '';
  fullname = '';
  surname = '';
  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar, private ProfileService: ProfileService) { }

  private socket = io(`${chatUrl}`);
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private isAuthenticated = false;

  onLogin() {

    //data to pass to back-end
    const formData = { email: this.email, password: this.password };
    //
    if (this.email.length == 0 || this.password.length == 0) {
      this.showSnackbar('Please fill in the missing field(s)');
    } else {
      this.showSnackbar('login successfully!');
      //this.router.navigate(['/alumni/profile/view-profile']);
    }
    if (formData.email !== 'admin@email.com') {
      this.http.post(`${baseUrl}/login`, formData).subscribe((response: any) => {
        console.log('Data sent to server:', response);
        // Clear the form fields after successful submission
        this.email = '';
        this.password = '';


        if (response.message === 'Login successful!') {
          // alert('Login Successfully!');
          console.log(response.result[0].name);
          console.log(response.account_id);
          //store user details to localStorage
          localStorage.setItem('name', response.result[0].name.toString());
          localStorage.setItem('surname', response.result[0].surname.toString());
          localStorage.setItem('email', formData.email);
          localStorage.setItem('account_id', response.account_id);

          // this.router.navigate(['/alumni/home']);
          this.page();

        } else {
          //alert("Invalid Details")
          this.router.navigate(['/auth/forgot-password']);
        }
      });
    } else {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onLogin2() {
    //socket
    this.socket.emit('Login', { email: this.email, password: this.password });
    var isFound = false;
    this.socket.on('loginResults', (found) => {
      isFound = found;


      console.log(isFound);
      if (isFound) {
        this.isAuthenticated = true;
        this.socket.on('userDetails', (userData) => {
          /*if (userData.role === 'admin') {


            this.router.navigate(['/admin']);


          }
          else {
            //this.router.navigate(['/alumni']);
            //this.page();
            this.router.navigate(['/alumni/chat']);
          }*/

          this.router.navigate(['/alumni/chat']);
        });
        //return of({ name: userName, email: userEmail });
      } else {
        this.isAuthenticated = false;
      }
    });

  }

  onLogin3() {

    //data to pass to back-end
    const formData = { email: this.email, password: this.password };
    //
    if (this.email.length == 0 || this.password.length == 0) {
      this.showSnackbar('Please fill in the missing field(s)');
    } else {
      if (formData.email !== 'admin@email.com') {
        this.http.post(`${baseUrl}/login`, formData).subscribe((response: any) => {
          console.log('Data sent to server:', response);
          // Clear the form fields after successful submission
          this.email = '';
          this.password = '';
  
  
          if (response.message === 'Login successful!') {
            // alert('Login Successfully!');
            console.log(response.result[0].name);
            console.log(response.account_id);
            //store user details to localStorage
            localStorage.setItem('name', response.result[0].name.toString());
            localStorage.setItem('surname', response.result[0].surname.toString());
            localStorage.setItem('email', formData.email);
            localStorage.setItem('account_id', response.account_id);
  
            this.router.navigate(['/alumni/home']);
            //this.page();
  
            //socket
            this.socket.emit('Login', { email: formData.email, password: formData.password });
            var isFound = false;
            this.socket.on('loginResults', (found) => {
              isFound = found;
  
  
              console.log(isFound);
              if (isFound) {
                this.isAuthenticated = true;
                this.socket.on('userDetails', (userData) => {
                  //this.page()
  
  
                });
              } else {
                this.isAuthenticated = false;
              }
  
            });
            
            this.getMyImage();
            this.page()
  
          } else {
            //this.showSnackbar('login successfully!');
            alert("Invalid Details")
            this.router.navigate(['/auth/forgot-password']);
          }
        });
      } else {
        this.router.navigate(['/admin/dashboard']);
      }



      //this.showSnackbar('login successfully!');
      //this.router.navigate(['/alumni/profile/view-profile']);
    }
    
  }

  onSubmit() {
    const formData = { fullname: this.fullname, surname: this.surname, email: this.email, password: this.password };
    this.http.post(`${baseUrl}/register`, formData).subscribe((response: any) => {
      console.log('Data sent to server:', response);
      // Clear the form fields after successful submission
      this.email = '';
      this.password = '';
      this.fullname = '';
      this.surname = '';

      this.router.navigate(['/success']);


      /*if(response.status === 200){
        this.router.navigate(['/success']);
      }*/
    });
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 2000, // Duration the snackbar is shown in milliseconds
      verticalPosition: 'top', // Set the vertical position to 'top'
      horizontalPosition: 'center', // Set the horizontal position to 'center'
      panelClass: ['snackbar'], // Add your custom class for styling
    });
  }

  page() {
    const apiUrl = `${baseUrl}/profile/get_profile`

    //get profile details from server
    const user_id = localStorage.getItem('account_id');
    this.http.put(apiUrl, { user_id }).subscribe((response: any) => {
      console.log('Data sent to server:', response);

      //this.alumni.Skills = response.userprofile.skills;
      console.log(response.result[0].location);


      //check if values are null
      if (response.result[0].skills === '' || response.result[0].experience === '' || response.result[0].interest === '' || response.result[0].bio === '' || response.result[0].location === '' ||
        response.result[0].qualification === '' || response.result[0].employment_status === '') {


        this.router.navigate(['/alumni/profile/view-profile']);
      } else {
        this.showSnackbar('login successfully!');
        //this.showSnackbar('Profile Incomplete, Please update profile');
        this.router.navigate(['/alumni/home']);
      }
    });
  }

  getMyImage(){
    this.ProfileService.getMyPic(localStorage.getItem('account_id')).subscribe((response:any) => {
      console.log('Image :' + response.myPic);
      localStorage.setItem('pic',response.myPic )
    });
  }
}




import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

//URLs
import { baseUrl } from 'config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = 'Alumni_Space_UI';

  images: string[] = [
    'assets/alumni.jpg',
    'assets/alumni2.jpg',
    'assets/alumni3.png',
    'assets/alumni4.png',
    
  ];

  currentIndex = 0;

  ngOnInit(): void {
    this.showSlides();
  }

  showSlides() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // Change slide every 3 seconds (adjust as needed)
  }

  email = '';
  password = '';
  fullname = '';
  surname = '';
  // agreeToTerms: boolean = false;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}


  onSubmit() {
    // alert('Fill in the missing fields!');
    const formData = { fullname: this.fullname, surname: this.surname, email: this.email, password: this.password };
    
      if(this.fullname.length ==0 || this.surname.length ==0 || this.email.length ==0 || this.password.length ==0){
       
         this.showSnackbar('Fill in the missing fields!');

    }
    else{
      // alert('Registered Successfully!');
      this.showSnackbar('Registered Successfully!');
      this.router.navigate(['/success']);
      this.router.navigate(['/login']);
      this.email = '';
      this.password = '';
      this.fullname = '';
      this.surname = '';
    }
         this.http.post(`${baseUrl}/register`, formData).subscribe((response: any) => {
         
         console.log('Data sent to server:', response);
      //Clear the form fields after successful submission
      // this.email = '';
      // this.password = '';
      // this.fullname = '';
      // this.surname = '';

      // this.router.navigate(['/success']);

      
      // if(response.status === 200){
      //   this.router.navigate(['/success']);
      // }
    });
    

    
  
}

showSnackbar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 2000, // Duration the snackbar is shown in milliseconds
    verticalPosition: 'top', // Set the vertical position to 'top'
    horizontalPosition: 'center', // Set the horizontal position to 'center'
    panelClass: ['snackbar'], // Add your custom class for styling
  });
}
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Alumni_Space_UI';

  email = '';
  password = '';
  fullname = '';
  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    const formData = { email: this.email, password: this.password };
    this.http.post('/api/login', formData).subscribe((response: any) => {
      if (response.message === 'Login successful') {
        // Redirect to the home page upon successful login
        this.router.navigate(['/home']);
      } else {
        // Handle failed login (show an error message, etc.)
        console.error('Login failed. Please check your credentials.');
      }
    });
  }

  onSubmit() {
    const formData = { fullname: this.fullname, email: this.email, password: this.password };
    this.http.post('http://localhost:3000/api/register', formData).subscribe((response) => {
      console.log('Data sent to server:', response);
      // Clear the form fields after successful submission
      this.email = '';
      this.password = '';
      this.fullname = '';
    });
  }
}


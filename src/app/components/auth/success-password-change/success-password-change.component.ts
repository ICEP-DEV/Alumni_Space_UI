import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-password-change',
  templateUrl: './success-password-change.component.html',
  styleUrls: ['./success-password-change.component.css']
})
export class SuccessPasswordChangeComponent {
  
  constructor(private router: Router) {}

  redirectToLogin() {
    // You can use Angular's router to navigate to the login page
    this.router.navigate(['/']); // Replace '/login' with the actual route to your login page
  }
}

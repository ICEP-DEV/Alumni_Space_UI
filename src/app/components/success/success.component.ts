import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  constructor(private router: Router) {}

  redirectToLogin() {
    // You can use Angular's router to navigate to the login page
    this.router.navigate(['/']); // Replace '/login' with the actual route to your login page
  }
}

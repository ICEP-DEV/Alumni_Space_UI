import { Component } from '@angular/core';

@Component({
  selector: 'app-user-storys',
  templateUrl: './user-storys.component.html',
  styleUrls: ['./user-storys.component.css']
})
export class UserStorysComponent {
  onPostUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0]; // Get the selected photo file

    if (file) {
      // Handle the photo file upload here
      // You might want to handle the file upload using a service or any other logic specific to your application
      // For example:
      // this.yourService.uploadPhoto(file);
      // where file is the image file
      // Make sure to replace 'yourService' with your actual service
    }
  }
}

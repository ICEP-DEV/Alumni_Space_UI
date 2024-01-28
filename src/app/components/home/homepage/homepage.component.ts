import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  images: string[] = [
    'assets/alumni.jpg',
    'assets/alumni2.jpg',
    'assets/alumni3.png',
    'assets/alumni4.png',
    
  ];

  title = 'Alumni_Space_UI';

  email = '';
  password = '';
  fullname = '';
  surname = '';
  currentIndex = 0;

  ngOnInit(): void {
    this.showSlides();
  }

  showSlides() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // Change slide every 3 seconds (adjust as needed)
  }
}

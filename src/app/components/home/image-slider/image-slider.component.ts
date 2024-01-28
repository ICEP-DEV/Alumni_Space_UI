import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  images: string[] = [
    'assets/alumni.jpg',
    'assets/alumni2.jpg',
    'assets/alumni3.png',
    'assets/alumni4.png',
    
  ];

  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.showSlides();
  }

  showSlides() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // Change slide every 3 seconds (adjust as needed)
  }

}
import { Component } from '@angular/core';
import { EventService } from 'src/app/services/events/event.service';
import { Router } from '@angular/router';
import { filesUrl } from 'config';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events: any[] = [];
  pictures: { filePath: string }[] = [];
  imageUrl = `${filesUrl}/uploads/pics/events`
  currentDate: Date = new Date();

  constructor(private eventService: EventService,private router: Router,) {
    //this.eventService.getAllEvents();
    //this.events = this.eventService.getEvents();
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadEventPictures();
  }

  loadEvents() {
    this.eventService.getEventsAll().subscribe((data) => {
      this.events = data.events;
    });
  }

  loadEventPictures() {
    this.eventService.getEventsAll().subscribe((data) => {
      this.pictures = data.pictures.map((item) => ({ filePath: `${this.imageUrl}/${item.filePath}` }));
    });
  }

  getEventPictureUrl(fileName: string): string {
    return `${this.imageUrl}/${fileName}`;
  }


  // Custom function to calculate time difference and return the "posted ... ago" message
  getTimeDifference(datePosted: Date): string {
    const timeDiff = this.currentDate.getTime() - new Date(datePosted).getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return ` ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return ` ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return ` ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return ` a few seconds ago`;
    }
  }
  
  returnHome(){
    this.router.navigate(['/alumni/home']);
  }
}

import { Component } from '@angular/core';
import { EventService } from '../../../services/events/event.service';
import { ProfileService } from '../../alumni/profile/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filesUrl } from 'config';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css']
})
export class AddPostsComponent {
  eventForm: FormGroup;
  imageFile: File | null = null;
  showModal = false;
  isResultLoaded = false;

  selectedFile: File | null = null;

  constructor(private eventService: EventService, private fb: FormBuilder, private http: HttpClient, private profileService: ProfileService) {
    this.eventForm = this.fb.group({
      eventTitle: [''],
      eventDescription: [''],
      eventDate: Date,
      datePosted: Date
     
    });
    //this.eventService.getAllEvents()
    this.events = this.eventService.getEvents();
    this.callEvent();
  }



  
  postEvent() {
    const event = {
      title: this.eventForm.get('eventTitle')?.value,
      description: this.eventForm.get('eventDescription')?.value,
      eventDate: this.eventForm.get('eventDate')?.value,
      datePosted :  new Date(),
      image: this.selectedFile,
    };

    /*if (this.selectedFile) {
      this.profileService.uploadEvent(this.selectedFile).subscribe((response) => {
        // Handle the response from the server
      });
    }*/
    
    this.eventService.addEvent(event);
    this.eventForm.reset();
    this.imageFile = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false; // Close the modal
  }

   

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageFile = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    
    
  }

  onProfilePicChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
  
     //select file
      this.selectedFile = event.target.files[0];
    }

    //read the image
    this.onImageChange(event);
  }

  events: any[] = [];
  currentDate: Date = new Date();


  editEvent(index: number) {
    // Implement code to handle the "Edit" action for the selected event
    const selectedEvent = this.events[index];
    this.events.splice(index, 1);

    // You can open a modal or a form for editing the event details
    // For example, you can use a form to update event details
    this.eventForm.setValue({
      eventTitle: selectedEvent.title,
      eventDescription: selectedEvent.description,
    });
    this.imageFile = selectedEvent.image;

    // You may also set a flag or variable to indicate that you are in edit mode
    // For example: this.isEditMode = true;
  }

  deleteEvent(index: number) {
    // Implement code to handle the "Delete" action for the selected event
    //this.events.splice(index, 1);
    //localStorage.setItem('events', JSON.stringify(this.events));
    this.eventService.deleteEvent(index);
  }


  pictures: { filePath: string }[] = [];
  imageUrl = `${filesUrl}/uploads/pics/events`
  

  callEvent(){
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
  getTimeDifference(datePosted: any): string {
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
  

}

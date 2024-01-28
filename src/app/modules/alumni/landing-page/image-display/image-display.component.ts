import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from 'src/app/services/events/event.service'; 
import { filesUrl } from 'config';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent {

  posts=[];
  newPost:any ={name:'', imageUrl:'',postData:'',dateTime:''};
  
  eventForm!: FormGroup;
  imageFile: File | null = null;
  showModal = false;
  events: any[] = []; 
  currentDate: Date = new Date();
  

  constructor(private service: EventService, private fb: FormBuilder,private http:HttpClient) {
    this.eventForm = this.fb.group({
      eventTitle: [''],
      eventDescription: [''],
     
    });
    this.events = this.service.getEvents();
  }

  
  onPost() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const event:any = {
      name: "" + localStorage.getItem('name')+' '+localStorage.getItem('surname'),
      description: this.eventForm.get('eventDescription')?.value,
      image: this.imageFile,
      date: this.currentDate

    };
    this.http.post<any>(`${filesUrl}/posts`,event,{headers}).subscribe(response =>{
    this.service.getEvents();
    this.service.addEvent(event);
    this.eventForm.reset();
    this.imageFile = null;
    this.showModal = true;
    })
    window.location.reload();
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

  getPosts() {
    this.http.get<any>(`${filesUrl}/posts`).subscribe(response => {
      this.posts = response;
    });
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
    this.events.splice(index, 1);
  }

 
}
 

/* 
 onPost() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const formData = new FormData();
    formData.append('name', 'Logaxis');
    formData.append('description', this.eventForm.get('eventDescription')?.value);
    formData.append('image', this.imageFile);

    this.http.post<any>('http://localhost:3000/posts', formData, { headers }).subscribe(response => {
      this.service.getEvents();
      this.service.addEvent(response); // Assuming the server returns the saved event
      this.eventForm.reset();
      this.showModal = true;
    });
    window.location.reload();
  }
  */

  //this is to be on the server side to handle the images

  /*(first) npm install multer

  (than)
  // server.js (or your server file)

const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to save the images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/posts', upload.single('image'), (req, res) => {
  const { name, description, date } = req.body;
  const imageUrl = req.file.path; // Get the file path where the image is saved

  // Assuming you save this information to a database or handle it as needed
  const newEvent = { name, description, imageUrl, date };

  // Send back the saved event or the appropriate response
  res.json(newEvent);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

*/
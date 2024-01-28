import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('photo', file);

    // Replace the URL below with your API endpoint for photo upload
    return this.http.post<any>('http://your-api-url/upload/photo', formData);
  }

  uploadVideo(file: File) {
    const formData = new FormData();
    formData.append('video', file);

    // Replace the URL below with your API endpoint for video upload
    return this.http.post<any>('http://your-api-url/upload/video', formData);
  }
}


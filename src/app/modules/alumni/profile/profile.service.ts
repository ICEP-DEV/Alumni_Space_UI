import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'config';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private documents: File[] = [];
  //private apiUrl = 'http://192.168.27.19:3000/api/upload';
  private profileUrl = `${baseUrl}/profile`

  uploadDocument(document: File): Observable<any> {
    this.documents.push(document);

    const formData = new FormData();
    formData.append('file_name', document);
    formData.append('fileType', 'academic');

    console.log(formData);
    
    return this.http.post(`${baseUrl}/upload`, formData);
  }

  uploadDoc(file: File): Observable<any> { // Specify the return type as Observable
    const formData = new FormData();
    formData.append('file_name', file);
    formData.append('fileType', 'academic');

    return this.http.post(`${baseUrl}/upload`, formData);
  }
  

  getDocuments() {
    return [...this.documents];
  }

  private certificates: File[] = [];

  uploadCertificates(document: File) {
    this.certificates.push(document);
  }
  
  uploadCert(file: File,account_id: any): Observable<any> { // Specify the return type as Observable
    const formData = new FormData();
    formData.append('file_name', file);
    formData.append('fileType', 'certificate');
    formData.append('account_id', account_id);

    return this.http.post(`${baseUrl}/upload`, formData);
  }
  uploadCert2(formData: any,account_id: any): Observable<any> { // Specify the return type as Observable
    formData.append('fileType', 'certificate');
    formData.append('account_id', account_id);

    return this.http.post(`${baseUrl}/upload`, formData);
  }

  getCertificatess() {
    return [...this.certificates];
  }

  getMyCerts(account_id: any): Observable<any>{
    return this.http.get<any>(`${this.profileUrl}/get_my_certs/${account_id}`);
  }
  getMyPic(account_id: any): Observable<any>{
    return this.http.get<any>(`${this.profileUrl}/get_my_pic/${account_id}`);
  }

  deleteMyCert(certificateId: any): Observable<any>{
    return this.http.delete(`${this.profileUrl}/delete_my_cert/${certificateId}`);
  }

  private images: File[] = [];

  uploadImage(image: File) {
    this.images.push(image);
  }
  uploadPicture(file: File, account_id: any): Observable<any> { // Specify the return type as Observable
    const formData = new FormData();

    //
    formData.append('file_name', file);
    formData.append('fileType', 'profile');
    formData.append('account_id', account_id);

    return this.http.post(`${baseUrl}/upload`, formData);
  }


  getImages() {
    return this.images;
  }

  getUploadedPictures(): Observable<{ filePath: string }[]> {
    const account_id = localStorage.getItem('account_id');
    const url = `${baseUrl}/getDocument` + '/profile' +'/' + account_id;
    return this.http.get<{ filePath: string }[]>(url);
  }
  getUploadedPictures2(): Observable<{ filePath: string }[]> {
    const account_id = localStorage.getItem('account_id');
    const url = `${baseUrl}/getDocument` + '/profile' +'/' + account_id;
    return this.http.get<any>(url);
  }




  getProfiles(): Observable<any> {
    const apiUrl = `${this.profileUrl}/profiles`; // Replace with the actual endpoint of your profiles API
    return this.http.get(apiUrl);
  }
}

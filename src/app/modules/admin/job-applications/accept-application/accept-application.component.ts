import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Define the interface for the Alumni object
interface Alumni {
  fullNames: string;
  lastName: string;
  skills: string[];
  email: string;
  experience: string;
  qualification: string;
  certificateNames: string[];
  certificates: string[];
  Bio: string;
  address: string;
   interests: string[];
   alumnipic: string;
   jobAppliedFor: string;
   applicationStatus?: string;
  shortlisted?: boolean;
  interviewDate?: string;
  interviewTime?: string;
}

@Component({
  selector: 'app-accept-application',
  templateUrl: './accept-application.component.html',
  styleUrls: ['./accept-application.component.css']
})
export class AcceptApplicationComponent {
  @Output() interviewConfirmed: EventEmitter<any> = new EventEmitter();

  interviewDate!: Date;
  interviewTime!: Date;
  // interviewAddress!: string;
  buildingNumber!: string;
 
  rejectionReason: string = '';
  // notifyApplicant: boolean = false;
  dialogType: boolean; // Add this line to declare the property
  isAcceptDialog: boolean = false;
  isRejectDialog: boolean = false;
  interviewType: string='';
  meetingLink: string ='';
  // notifyApplicant!: string;
  // constructor(){}
  constructor(public dialogRef: MatDialogRef<AcceptApplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar
  ) {
    this.dialogType = data.dialogType;
    
    // if(this.onLineMeeting){
    //     this.isShowMoreFields = true;
    // }

  }
 ngOnInit(): void{
  // Access job title and other attributes from data
  console.log(this.data.jobTitle);
  console.log(this.data.firstname);
  console.log(this.data.surname);
  

 }
 showSnackbar(message: string) {
  this.snackbar.open(message, 'Close', {
    duration: 2000, // Duration the snackbar is shown in milliseconds
    verticalPosition: 'top', // Set the vertical position to 'top'
    horizontalPosition: 'center', // Set the horizontal position to 'center'
    panelClass: ['snackbar'], // Add your custom class for styling
  });
}

  onCancelClick(){
    this.dialogRef.close();
    this.showSnackbar('Cancelled!')
  }
  onConfirmClick(){
    const interviewDetails = {
      interviewDate: this.interviewDate,
      interviewTime: this.interviewTime,
      buildingNumber: this.buildingNumber,
      interviewType: this.interviewType,
      interviewLink: this.meetingLink,
      // notifyApplicant: this.notifyApplicant,
      // interviewLink: this.meetingLink,
    };
    // if(this.interviewDate.toString.length !== 0 || this.interviewTime.toString.length !== 0 || this.buildingNumber.length !== 0){
    this.interviewConfirmed.emit(interviewDetails);
    this.dialogRef.close(interviewDetails);
     // Do something with notifyApplicant, e.g., save it or use it
    //  console.log('Selected Option:', this.notifyApplicant);
     this.showSnackbar('Applicant have been shortlisted, waiting for interview');
    }
    
  // }

  // New method for handling rejection
  handleRejection(): void {
    // Your rejection logic here...

    // Close the dialog after handling rejection
    this.dialogRef.close();
  }
}

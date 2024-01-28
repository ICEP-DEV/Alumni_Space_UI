import { Component, Inject } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reject-application',
  templateUrl: './reject-application.component.html',
  styleUrls: ['./reject-application.component.css']
})
export class RejectApplicationComponent {
  @Output() RejectionConfirmed: EventEmitter<any> = new EventEmitter();
  
  rejectionReason: string='';
  notifyApplicant: boolean=false;
  comments: string ='';

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  //   // You can access the application data like data.application, data.jobTitle, etc.
  // }
  constructor(public dialogRef: MatDialogRef<RejectApplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar
  ) {
    // this.dialogType = data.dialogType;

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
    const jobRejectionDetails ={
       rejectionReason: this.rejectionReason,
       comments: this.comments
    }

    this.RejectionConfirmed.emit(jobRejectionDetails);
    this.dialogRef.close();
    // Do something with notifyApplicant, e.g., save it or use it
    console.log('Rejection Reason: ' + ', ' + this.comments + this.rejectionReason);
    this.showSnackbar('Applicant have been rejected');
  }
}

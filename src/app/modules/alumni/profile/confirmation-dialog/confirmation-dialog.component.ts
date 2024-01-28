import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

   ngOnInit(): void {
    
  }
 
  //closing the confirmation dialog after a button is clicked
  onClose(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
  onConfirmClick(): void {
    this.dialogRef.close(false);
  }

  onCancelClick(): void {
    this.dialogRef.close(true);
  } 
}

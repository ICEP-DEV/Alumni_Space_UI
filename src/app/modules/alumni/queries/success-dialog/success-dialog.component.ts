import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/*@Component({
  selector: 'app-success-dialog',
  template: `
  <h2>{{ data.message }}</h2>
  <button mat-button (click)="closeDialog()">Close</button>
`,
})*/
@Component({
  selector: 'app-success-modal',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css'],
})


export class SuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<SuccessDialogComponent>
    ) {}

    closeModal(): void {
      this.dialogRef.close();
    }

}

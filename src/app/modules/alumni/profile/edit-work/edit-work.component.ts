import { Component } from '@angular/core';
import { AlumniService } from '../../../../services/alumni/alumni.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.css']
})
export class EditWorkComponent {
  constructor(private _router: Router, private alumniService: AlumniService, private dialog: MatDialog) { }

  /*work = {
    company: '',
    position: '',
    start_date: "2014-12-02",
    end_date: null,
    account_id: 0
  }*/

  work: any

  ngOnInit(): void {
    this.work = JSON.parse(localStorage.getItem('work_experince')!)
    console.log(this.work)
  }

  edit_work() {
    console.log(this.work)
    this.alumniService.update_employment(this.work.alumni_rec_id, this.work).subscribe((respond) => {
      console.log(respond)
      //this.dialog.open(EditWorkComponent);

    }, err => {
      console.log(err)
    })
  }
}

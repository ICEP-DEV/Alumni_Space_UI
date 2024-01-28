import { Component } from '@angular/core';
import { AlumniService } from '../../../../services/alumni/alumni.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditWorkComponent } from '../edit-work/edit-work.component';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent {
  constructor(private _router: Router, private alumniService: AlumniService, private dialog: MatDialog) { }

  work = {
    company: '',
    position: '',
    start_date: '',
    end_date: null,
    account_id: 0
  }

  add_work() {
    var alumni_id = Number(localStorage.getItem('account_id'));
    this.work.account_id = alumni_id
    console.log(this.work)
    this.alumniService.add_employment(this.work).subscribe((respond)=>{
      this._router.navigate(['/alumni/profile/view-profile'])
    },err=>{
      console.log(err)
    })
  }

  edit_work(): void{
    this.dialog.open(EditWorkComponent);
  }
}

import { Component } from '@angular/core';
import { AlumniService } from '../../../../services/alumni/alumni.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditWorkComponent } from '../edit-work/edit-work.component';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent {

  constructor(private _router: Router, private alumniService: AlumniService, private dialog: MatDialog) { }

  alumni_details: any
  alumni_details_Temp: any
  message = ""
  years_of_experience = 0

 
  ngOnInit(): void {
    this.message = ""

    var alumni_id = Number(localStorage.getItem('account_id'));
    var total_months = 0
    this.alumniService.getAlumniDetails(alumni_id).subscribe((respond) => {
      this.alumni_details_Temp = respond
      console.log(respond)
      if (this.alumni_details_Temp.success) {
        for (var k = 0; k < this.alumni_details_Temp.result.length; k++) {

          total_months += this.alumni_details_Temp.result[k].months
        }
        /*if (this.alumni.employment_status.toLocaleLowerCase() != "unemployed") {
          console.log(this.alumni.current_months)
          total_months += this.alumni.current_months
        }*/
        this.years_of_experience = Math.floor(total_months/12)
        this.alumni_details = this.alumni_details_Temp.result
      }
      else {
        this.message = this.alumni_details_Temp.message
      }
    }, err => {
      console.log(err)
    })
  }

  add_work(){

  }

  edit_work(work_experince:any): void{
    localStorage.setItem("work_experince", JSON.stringify(work_experince))
    this.dialog.open(EditWorkComponent);
  }
}

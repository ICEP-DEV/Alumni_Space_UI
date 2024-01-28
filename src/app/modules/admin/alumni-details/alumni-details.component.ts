import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumniService } from '../../../services/alumni/alumni.service'

@Component({
  selector: 'app-alumni-details',
  templateUrl: './alumni-details.component.html',
  styleUrls: ['./alumni-details.component.css']
})
export class AlumniDetailsComponent {
  constructor(private _router: Router, private alumniService: AlumniService) { }
  alumni: any
  alumni_details: any
  alumni_details_Temp: any
  message = ""
  years_of_experience = 0
  ngOnInit(): void {
    this.message = ""
    this.alumni = JSON.parse(localStorage.getItem('alumni_info')!)
    var alumni_id = this.alumni.account_id
    var total_months = 0
    this.alumniService.getAlumniDetails(alumni_id).subscribe((respond) => {
      this.alumni_details_Temp = respond

      if (this.alumni_details_Temp.success) {
        for (var k = 0; k < this.alumni_details_Temp.result.length; k++) {

          total_months += this.alumni_details_Temp.result[k].months
        }
        if (this.alumni.employment_status.toLocaleLowerCase() != "unemployed") {
          console.log(this.alumni.current_months)
          total_months += this.alumni.current_months
        }
        this.years_of_experience = Math.floor(total_months/12)
        this.alumni_details = this.alumni_details_Temp.result
      }
      else {
        this.message = this.alumni_details_Temp.message
      }
    }, err => {
      console.log(err)
    })
    /*this.alumni_details = this.alumni.privious
    console.log(this.alumni)
    console.log(this.alumni_details)*/
  }

}


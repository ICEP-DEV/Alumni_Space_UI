import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumniService } from '../../../services/alumni/alumni.service'
import { profilesUrl } from 'config';

@Component({
  selector: 'app-all-alumnus',
  templateUrl: './all-alumnus.component.html',
  styleUrls: ['./all-alumnus.component.css']
})
export class AllAlumnusComponent {

  constructor(private _router: Router, private alumniService: AlumniService) { }

  Alumnus: any 
  message = ""
  Alumni_Temp: any
  profileUrl = `${profilesUrl}`
  ngOnInit() {
    this.message = ""
    this.alumniService.getAllAlumni().subscribe((respond) => {
      this.Alumni_Temp = respond
      if (this.Alumni_Temp.success) {
        console.log(this.Alumni_Temp.result)
        this.Alumnus = this.Alumni_Temp.result
      }
      else {
        this.message = this.Alumni_Temp.message
      }
    }, err => {
      console.log(err)
    })
  }


  getAlumniInfo(info: any) {
    console.log(info)
    localStorage.setItem('alumni_info', JSON.stringify(info))
    this._router.navigate(['/alumni-details'], { state: { info } })

  }
}

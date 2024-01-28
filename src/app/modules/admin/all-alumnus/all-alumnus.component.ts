import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumniService } from '../../../services/alumni/alumni.service'
@Component({
  selector: 'app-all-alumnus',
  templateUrl: './all-alumnus.component.html',
  styleUrls: ['./all-alumnus.component.css']
})
export class AllAlumnusComponent {

  constructor(private _router: Router, private alumniService: AlumniService) { }

  Alumnus: any /*[{
    name: "Manasoe DJ", company: "ICEP", role: "Developer", image: "../../assets/profilejpg.jpg", privious: [{
      company: "TUT", role: "Lecturer",
      startDate: "2017-Mar", endDate: "2017-Dec"
    }, {
      company: "MLAB", role: "Web and Developer",
      startDate: "2018-Jan", endDate: "2019-Dec"
    }, {
      company: "Sasol", role: "Patrol Attendance",
      startDate: "2019-Feb", endDate: "2021-Nov"
    }]
  },

  {
    name: "Maluleke T", company: "ICEP", role: "BA", image: "../../assets/profile2png.png", privious: [{
      company: "TUT", role: "Lecturer",
      startDate: "2017-Mar", endDate: "2017-Dec"
    }, {
      company: "MLAB", role: "Web and Developer",
      startDate: "2018-Jan", endDate: "2019-Dec"
    }, {
      company: "Sasol", role: "Patrol Attendance",
      startDate: "2019-Feb", endDate: "2021-Nov"
    }]
  },

  {
    name: "Makena LB", company: "Spar", role: "Cashier", image: "../../assets/profile3png.png", privious: [{
      company: "TUT", role: "Lecturer",
      startDate: "2017-Mar", endDate: "2017-Dec"
    }, {
      company: "MLAB", role: "Web and Developer",
      startDate: "2018-Jan", endDate: "2019-Dec"
    }, {
      company: "Sasol", role: "Patrol Attendance",
      startDate: "2019-Feb", endDate: "2021-Nov"
    }]
  },

  {
    name: "Malebane TK", company: "ICEP", role: "Tester", image: "../../assets/profilejpg.jpg", privious: [{
      company: "TUT", role: "Lecturer",
      startDate: "2017-Mar", endDate: "2017-Dec"
    }, {
      company: "MLAB", role: "Web and Developer",
      startDate: "2018-Jan", endDate: "2019-Dec"
    }, {
      company: "Sasol", role: "Patrol Attendance",
      startDate: "2019-Feb", endDate: "2021-Nov"
    }]
  }]*/
  message = ""
  Alumni_Temp: any
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

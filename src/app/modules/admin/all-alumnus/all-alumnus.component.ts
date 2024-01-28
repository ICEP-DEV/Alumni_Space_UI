import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-alumnus',
  templateUrl: './all-alumnus.component.html',
  styleUrls: ['./all-alumnus.component.css']
})
export class AllAlumnusComponent {

  constructor(private _router: Router) { }

  Alumnus = [{
    name: "Manasoe DJ", company: "ICEP", role: "Developer", image: "../../../../assets/dipono/dipono.jpeg", privious: [{
      company: "ICEP", role: "Intern Software Developer",
      startDate: "2020-Dec", endDate: "2021-Nov"
    }, {
      company: "MLAB", role: "Web and Developer",
      startDate: "2022-May", endDate: "2022-Nov"
    }, {
      company: "ICEP", role: "Developer and Lead Team",
      startDate: "2023-Mar", endDate: "2024-Jan"
    }]
  },

  {
    name: "Mathonsi X", company: "ICEP", role: "BA", image: "../../../../assets/dipono/Xolly.jpg", privious: [{
      company: "TUT", role: "Tutor",
      startDate: "2017-Mar", endDate: "2017-Dec"
    }, {
      company: "TUT", role: "SGLD Peer Facilitator",
      startDate: "2018-Jan", endDate: "2019-Dec"
    }, {
      company: "ICEP", role: "Business Analyst",
      startDate: "2019-Feb", endDate: "2021-Nov"
    }]
  },

  {
    name: "Makena LB", company: "AWS", role: "Tester", image: "../../../../assets/dipono/profilepng.png", privious: [{
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
    name: "Malobane P", company: "ICEP", role: "Developer", image: "../../../../assets/dipono/Patience.jpg", privious: [{
      company: "TUT", role: "Student",
      startDate: "2020-Mar", endDate: "2023-Dec"
    }, {
      company: "ICEP", role: "Web and Developer",
      startDate: "2023-AUG", endDate: "2024-Jan"
    },]
  }
  ]




  getAlumniInfo(info: any) {
    console.log(info)
    localStorage.setItem('alumni_info', JSON.stringify(info))
    this._router.navigate(['/admin/alumni-details'], { state: { info } })

  }
}

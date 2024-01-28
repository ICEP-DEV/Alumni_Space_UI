import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumni-details',
  templateUrl: './alumni-details.component.html',
  styleUrls: ['./alumni-details.component.css']
})
export class AlumniDetailsComponent {
  constructor(private _router: Router) { }
  alumni:any
  alumni_details:any


  ngOnInit(): void {
    this.alumni = JSON.parse(localStorage.getItem('alumni_info')!)
    this.alumni_details = this.alumni.privious
    console.log(this.alumni)
    console.log(this.alumni_details)
    }

}

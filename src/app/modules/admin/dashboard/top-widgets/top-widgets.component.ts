import { Component } from '@angular/core';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { EventService } from 'src/app/services/events/event.service';
import { AlumniService } from 'src/app/services/alumni/alumni.service';
import {
  faPerson,
  faSuitcase,
  faClock,
  faCalendarWeek
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent {
 faPerson = faPerson;
  faSuitcase = faSuitcase;
  faClock = faClock;
  faCalendarWeek = faCalendarWeek;

  totalAlumni: number = 14;
  noAlumnActive: number = 8;
  totalJobs: number= 4;
  totalEvents: number = 3;
  jobCount: number = 0;
  eventCount: number = 0;
  alumniCount: number = 0;
  //number of active users/alumni
  totalSessions: number = 10;
  
constructor(private jobsService : JobsService, private eventService : EventService, private alumniService : AlumniService){}
 ngOnInit(){
  this.start();
  this.getJobCount();
  this.getEventCount();
  this.getAlumniCount();
 }

  //calculations required
  //totalSessions must include % e.g  ((noAlumnActive / totalAlumnReg) * 100)
    start(){
       this.calculateTotSessions(this.noAlumnActive, this.totalAlumni);
    }
   calculateTotSessions(noAlumnActive: number, totalAlumni: number){
        noAlumnActive = this.noAlumnActive;
        totalAlumni = this.totalAlumni;
        this.totalSessions = Math.floor( (noAlumnActive / totalAlumni) * 100);
        return this.totalSessions;
   }

   getJobCount(): void {
   this.jobsService.getJobCount().subscribe(
      data => {
        this.jobCount = data.job_count;
      },
      error => {
        console.error('Error retrieving job count:', error);
        // Handle error as needed
      }
    );
  }


  getEventCount(): void {
    this.eventService.getEventCount().subscribe(
       data => {
         this.eventCount = data.event_count;
       },
       error => {
         console.error('Error retrieving event count:', error);
         // Handle error as needed
       }
     );
   }


   getAlumniCount(): void {
    this.alumniService.getAlumniCount().subscribe(
       data => {
         this.alumniCount = data.alumni_count;
       },
       error => {
         console.error('Error retrieving alumni count:', error);
         // Handle error as needed
       }
     );
   }

}
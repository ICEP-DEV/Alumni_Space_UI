import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as pdfMake from "pdfmake/build/pdfmake";
 import * as pdfFonts from 'pdfmake/build/vfs_fonts';
type ReportData = Array<Array<string | number>>;
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent {
  
// Date_registered: string= Date();
Total_alumni_registered: number = 0;
Total_jobs_posted: number = 0;
Total_jobs_expired: number = 0;
Total_events_posted: number = 0;
Total_events_cancelled: number = 0;
Total_alumni_employed: number = 0;
Total_alumni_not_employed: number = 0;
time: string ='';
reportdate = new Date();
 formattedDate = this.reportdate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit'
});
// this.Date_registered = this.formattedDate;
   reportData: ReportData =[
      [ this.Total_alumni_registered=13, this.Total_jobs_posted, this.Total_jobs_expired, this.Total_events_posted, this.Total_events_cancelled, this.Total_alumni_employed=5, this.Total_alumni_not_employed=8],
      // [this.Date_registered= '25/10/2023', this.Total_alumni_registered= 7, this.Total_jobs_posted=7, this.Total_jobs_expired, this.Total_events_posted, this.Total_events_cancelled, this.Total_alumni_employed=5, this.Total_alumni_not_employed=2],
      // [this.Date_registered= '26/10/2023', this.Total_alumni_registered=8, this.Total_jobs_posted=13, this.Total_jobs_expired, this.Total_events_posted, this.Total_events_cancelled, this.Total_alumni_employed=0, this.Total_alumni_not_employed=8],
      // [this.Date_registered= '27/10/2023', this.Total_alumni_registered=7, this.Total_jobs_posted=9, this.Total_jobs_expired, this.Total_events_posted, this.Total_events_cancelled, this.Total_alumni_employed=3, this.Total_alumni_not_employed=4]
  ];
  month: string;
  dataSource = new MatTableDataSource<any>(this.reportData);
  // this.reportData = this.sampleReportData[];
  constructor() {
    const currentDate = new Date();
    this.month = this.getMonthAsString(currentDate.getMonth());
  }
 
  ngOnInit() {
    // this.setWelcomeMessage();
    this.updateTime();

    setInterval(() => {
      this.updateTime();
    }, 1000)

    
  }
  

  updateTime() {
    let now = new Date();
    this.time = this.getCurrentTimeWithAMPM(now);
    // .toTimeString().split(' ')[0];
  }

  getCurrentTimeWithAMPM(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const AMPM = isPM ? 'PM' : 'AM';

    // Convert to 12-hour format
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${AMPM}`;
  }


  displayedColumns: string[] = ['Total_alumni_registered', 'Total_jobs_posted', 'Total_jobs_expired', 'Total_events_posted', 'Total_events_cancelled', 'Total_alumni_employed', 'Total_alumni_not_employed'];
    

  getMonthAsString(monthIndex: number): string {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthIndex];
  }
 
   //generating pdf report
   generatePDF(){
    let docDefinition = {
       content: [
        'TUT alumni_space Report for month: ' + this.month,
        '\n',
        'Report Date: ' +  this.formattedDate,
        '\n',
        'Time stamp: ' + this.time,
        '\n',
        'Total alumni registered this month: ' + this.Total_alumni_registered,
        '\n',
        'Total jobs posted this month: ' + this.Total_jobs_posted,
        '\n',
        'Total jobs expired already: ' + this.Total_jobs_expired,
        '\n',
        'Total events posted this month: ' + this.Total_events_posted,
        '\n',
        'Total events cancelled: ' + this.Total_events_cancelled,
        '\n',
        'Total alumni employed: ' + this.Total_alumni_employed,
        '\n',
        'Total alumni not employed: ' + this.Total_alumni_not_employed,
        '\n',
       {
        // style: 'tableStyle',
        table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
                [ 'Total_alumni_registered', 'Total_jobs_posted', 'Total_jobs_expired', 'Total_events_posted', 'Total_events_cancelled', 'Total_alumni_employed', 'Total _alumni_unemployed'],
                // 'Date registered'
                [
                  // this.Date_registered,
                  this.Total_alumni_registered.toString(),
                  this.Total_jobs_posted.toString(),
                  this.Total_jobs_expired.toString(),
                  this.Total_events_posted.toString(),
                  this.Total_events_cancelled.toString(),
                  this.Total_alumni_employed.toString(),
                  this.Total_alumni_not_employed.toString()
                ],
            ]
        }
    }
       
    ],
    // styles: {
    //   header: {
    //       fontSize: 16,
    //       bold: true,
    //       alignment: 'center',
    //       margin: [0, 10, 0, 10]
    //   },
    //   tableStyle: {
    //       margin: [0, 5, 0, 15]
    //   },
    //   tableHeader: {
    //       bold: true,
    //       fontSize: 13,
    //       color: 'black'
    //   }
    //   }
     };
     
     pdfMake.createPdf(docDefinition).open();
   }
  
  //new
  


}
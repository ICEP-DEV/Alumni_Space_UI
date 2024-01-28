import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-alumni-stats',
  templateUrl: './alumni-stats.component.html',
  styleUrls: ['./alumni-stats.component.css']
})
export class AlumniStatsComponent {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  backgroundColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',//5
    'rgba(176, 83, 25, 1)',
    'rgba(94, 190, 250, 1)',
    'rgba(225, 27, 80, 1)',
    'rgba(22, 1, 192, 1)',
    'rgba(159, 122, 234. 1)',//10
    'rgba(70, 200, 72, 1)',
    'rgba(252, 3, 7, 1)',//12



  ];
  //data = [12, 19, 3, 5, 2, 4, 8, 34, 36, 26, 45, 8];
  data = [0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 5, 0];

  chart = new Chart({
    chart: {
      type: 'column',
      height: 250,
      width: 350,
      
    },
    title: {
      text: 'Alumni stats'
    },
    xAxis: {
     
      categories: this.months,
      title: {
        text: 'Months'
      }
    },
    yAxis: {
       title: {
        text: 'Number of Alumnis'
      }
    },
    series: [
      {
        name: "Alumni(s)",
        type: "column",
        showInLegend: false,
        data: [
          {
            color: this.backgroundColor[6],
            y: this.data[0],
          },
          {
            color: this.backgroundColor[8],
            y: this.data[1]
          },
          {
            color: this.backgroundColor[6],
            y: this.data[2]
          },
          {
            color: this.backgroundColor[8],
            y: this.data[3]
          },
          {
            color: this.backgroundColor[6],
            y: this.data[4],
          },
          {
            color: this.backgroundColor[8],
            y: this.data[5]
          },
          {
            color: this.backgroundColor[6],
            y: this.data[6]
          },
          {
            color: this.backgroundColor[8],
            y: this.data[7]
          },
          {
            color: this.backgroundColor[6],
            y: this.data[8],
          },
          {
            color: this.backgroundColor[8],
            y: this.data[9]
          },
          {
            color: this.backgroundColor[6],
            y: this.data[10]
          },
          {
            color: this.backgroundColor[8],
            y: this.data[11]
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    }
  })
}
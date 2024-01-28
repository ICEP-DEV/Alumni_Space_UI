
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

type EventData = {
  [key: string]: number[];
};

@Component({
  selector: 'app-events-stats',
  templateUrl: './events-stats.component.html',
  styleUrls: ['./events-stats.component.css']
})
export class EventsStatsComponent {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  data: EventData = {
    'successful': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    'failed': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };
  chart: Chart;

  constructor() {
    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 250,
        width: 350,
      },
      title: {
        text: 'Event stats'
      },
      xAxis: {
        categories: this.getMonths('2023')
      },
      yAxis: {
        title: {
          text: 'Number of events'
        }
      },
      series: [
        {
          name: 'Successful',
          type: 'line',
          color: '#ffc107',
          data: this.validateEvents('successful'),
        },
        {
          name: 'Failed',
          type: 'line',
          color: '#dc3545',
          data: this.validateEvents('failed'),
        },
      ],
      credits: {
        enabled: false,
      }
    });
  }

  validateEvents(year: string): number[] {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date().getMonth();
    const isCurrentYear = currentYear === year;
    const data = this.data[year] || [];

    if (isCurrentYear) {
      return data.slice(0, currentMonth + 1);
    } else {
      return data;
    }
  }

  getMonths(year: string): string[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => month + ' ' + year);
  }
}
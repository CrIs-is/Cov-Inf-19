import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() labels: any;
  @Input() data: any;

  @ViewChild('canvasPie',{static: true}) canvas;
  private bars;
  constructor() { }

  ngOnInit() {
    this.createPieChart() 
  }

  //data
  //[this.colombia.today_confirmed,this.colombia.today_recovered,this.colombia.today_deaths],
  createPieChart() {
    console.log("creando pieChart")
    let ctx = this.canvas.nativeElement;
    ctx.height = 350;
    this.bars = new Chart(ctx, {
      type: 'pie',
      defaultFontSize	: 45,
      data: {
        labels: ['Casos','Recuperados','Muertes'],
        datasets: [{
          label:  'Covid-19 en colombia',
          data: [45,35,85],
          backgroundColor: ['#4285F4','#00C851','#ff4444'],
          borderColor: ['#4285F4','#00C851','#ff4444'],
          borderWidth: 1,
        }]
      },
      options: {
        legend: {
          labels: {
              // This more specific font property overrides the global property
              fontColor: 'white',
              defaultFontSize: '45px',
          },
      },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}

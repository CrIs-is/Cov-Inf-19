import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent implements OnInit {

  private dona;
  @ViewChild('canvas', {static: true}) canvas;
  @Input() labels:Array<string>;
  @Input() data:Array<string>;
  public barss;
  constructor() { 
    
  }

//chartType = "doughnut"
  ngOnInit() {
    //let ctx = this.canvas1.nativeElement;
    //ctx.height = 350;
    this.getDought();
  }

  getDought(){
    let ctd = this.canvas.nativeElement;
    ctd.height = 350;
    this.barss = new Chart(ctd, {
      type: 'doughnut',
      defaultFontSize	: 45,
      data: {
        labels: ['M','F'],
        datasets: [{
          label:  'Covid-19 en colombia',
          data: [5,4],
          backgroundColor: ['#0275d8', '#d83966'],
          borderColor: ['#0275d8', '#d83966'],
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
    console.log(this.canvas)
  }

   // Por sexo
  
   
}

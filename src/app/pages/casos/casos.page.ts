import { Component, OnInit, ViewChild } from '@angular/core';
import { Pais } from '../../models/pais.interface';
import { Chart } from 'chart.js';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.page.html',
  styleUrls: ['./casos.page.scss'],
})
export class CasosPage implements OnInit {

  private colombia:Pais;
  @ViewChild('canvas1', {static: true}) canvas1;
  public fechaActual = new Date;
  bars: any;
  colorArray:any;
  departamentos:any=[];
  nombreDepartamentos;
  constructor(public service: DataService) { }

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    //autoHeight: true
  };

  ngOnInit() {
    this.createBarChart()
  }
  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createBarChart() {
    Chart.defaults.global.defaultFontColor = 'white';
    let ctx = this.canvas1.nativeElement;
    ctx.height = 350;
    this.bars = new Chart(ctx, {
      type: 'bar',
      defaultFontSize	: 45,
      data: {
        labels: ['r','a','s'],
        datasets: [{
          label:  'Covid-19 en colombia',
          data: [45,52,58],
          backgroundColor: ['#4285F4','#ff4444','#00C851'],
          borderColor: ['#4285F4','#ff4444','#00C851'],
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

  getData(fecha: string){
    this.service.getColombia(fecha).subscribe(console.log)
  }



}

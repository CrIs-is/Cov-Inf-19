import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  @Input() label:Array<string>
  @Input() data:Array<number>
  @ViewChild('canvas', {static: true}) canvas;

  colorArray:any;
  bars: any;
  constructor() { }

  ngOnInit() {
    this.generateColorArray(33) ;
    let suscription = this.getData().subscribe((data)=>{
     // console.log(data)
      this.createBarChart();
      suscription.unsubscribe()
    },error => console.log("Ha ocurriod un error"),
    ()=>{
      
    })
    
  }

  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createBarChart() {
    // Chart.defaults.global.defaultFontColor = 'white';
     let ctx = this.canvas.nativeElement;
     ctx.height = 400;
     this.bars = new Chart(ctx, {
       type: 'bar',
       defaultFontSize	: 45,
       data: {
         labels: this.label,
         datasets: [{
           label:  'Casos',
           data: this.data,
           backgroundColor: this.colorArray,
           borderColor: this.colorArray,
           borderWidth: 1,
         }]
       },
       options: {
         legend: {
           labels: {
               // This more specific font property overrides the global property
               fontColor: 'white',
               //defaultFontSize: '4px',
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

  getData(){
    return new Observable(subs=>{
      let intervalo = setInterval(()=>{
        if(this.data.length == 0){
          console.log("Los datos no se han completado recibiendo")
        }
        else{
          subs.next(this.data)
          //console.log(15)
        }
      },1000);

      return ()=>{
        console.log("Desuscripto bar chart");
        clearInterval(intervalo);
      }
    })
  }
}

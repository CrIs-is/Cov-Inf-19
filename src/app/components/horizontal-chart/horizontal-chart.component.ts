import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss'],
})
export class HorizontalChartComponent implements OnInit {

  @ViewChild('canvas',{static:true}) canvas;
  @Input() data:Array<number> = [];
  @Input() data2:Array<number> = [];
  @Input() leyenda:string;
  private bars;

  constructor() { }
  
  ngOnInit() {
    let suscription = this.getData().subscribe((data)=>{
      console.log(data)
      this.createBarHorizontal();
      suscription.unsubscribe()
    },error => console.log("Ha ocurriod un error"),
    ()=>{
      
    })
  }

  createBarHorizontal() {
    let ctx = this.canvas.nativeElement;
    ctx.height = 400;
    // this.generateColorArray(23);
    this.bars  = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '>= 90'],
        datasets: [{
          label: 'Hombres',
          data: this.data,
          backgroundColor: '#0275d8', // array should have same number of elements as number of dataset
          borderColor: '#0275d8', // array should have same number of elements as number of dataset
          borderWidth: 1
        },
        {
          label: 'Mujeres',
          data: this.data2,
          backgroundColor: '#d83966', // array should have same number of elements as number of dataset
          borderColor: '#d83966', // array should have same number of elements as number of dataset
          borderWidth: 1
        }],
      },
        options: {
          scales: {
            xAxes: [{
              barPercentage: 0.9,
              gridLines: {
                offsetGridLines: true
              },
              stacked: true
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              stacked: true
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
        }
      },1000);

      return ()=>{
        console.log("Desuscripto");
        clearInterval(intervalo);
      }
    })
  }

}

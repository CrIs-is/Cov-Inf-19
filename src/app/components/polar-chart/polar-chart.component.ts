import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.scss'],
})
export class PolarChartComponent implements OnInit {

  @Input() labels:Array<string> = []
  @Input() data:Array<string> = []
  @ViewChild('canvas',{static: true}) canvas
  constructor() { }
  bars;
  colorArray;

  ngOnInit() {
    this.generateColorArray(33);
    let suscription = this.getData().subscribe((data)=>{
      console.log(data)
      this.createChart();
      suscription.unsubscribe()
    },error => console.log("Ha ocurriod un error"),
    ()=>{
      
    })
    this.createChart();
   
  }
  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }


  createChart(){
    let ctx = this.canvas.nativeElement
    this.bars = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.labels,
        datasets: [{
          label:  'Covid-19 en colombia',
          data: this.data,
          backgroundColor:  this.colorArray  ,
          borderColor: this.colorArray ,
          borderWidth: 1,
        }]
      },
      //options: options
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
          console.log(15)
        }
      },1000);

      return ()=>{
        console.log("Desuscripto");
        clearInterval(intervalo);
      }
    })
  }

}

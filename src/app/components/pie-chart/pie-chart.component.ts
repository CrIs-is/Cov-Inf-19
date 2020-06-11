import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() labels: any;
  @Input() data: any;
  @Input() colores: any;

  @ViewChild('canvasPie',{static: true}) canvas;
  private bars;
  constructor() { 
    this.colores = ['#4285F4','#00C851','#ff4444'];
  }

  ngOnInit() {
    let suscription = this.getData().subscribe((data)=>{
      console.log(data)
      this.createPieChart();
      suscription.unsubscribe()
    },error => console.log("Ha ocurriod un error"),
    ()=>{
      
    })

  }

  createPieChart() {
    console.log("creando pieChart")
    let ctx = this.canvas.nativeElement;
    ctx.height = 350;
    this.bars = new Chart(ctx, {
      type: 'pie',
      //defaultFontSize	: 45,
      data: {
        labels: this.labels,
        datasets: [{
          label:  'Covid-19 en colombia',
          data: this.data,
          backgroundColor: this.colores,
          borderColor: this.colores,
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

import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent implements OnInit {

  @ViewChild('canvas', {static: true}) canvas;
  @Input() labels:Array<string> = null;
  @Input() data:Array<string>= null;
  @Input() colores:Array<string>= null;
  @Input() leyenda:string;
  public barss;
  
  constructor() { 
    this.colores =['#0275d8', '#d83966']
  }

  
//chartType = "doughnut"
  ngOnInit() {
    let suscription = this.getData().subscribe((data)=>{
      //console.log(data)
      this.getDought();
      suscription.unsubscribe()
    },error => console.log("Ha ocurriod un error"),
    ()=>{
      
    })

  }

  getDought(){
    //let ctd = this.canvas.nativeElement;
    //ctd.height = 350;
    this.barss = new Chart(this.canvas.nativeElement, {
      type: 'doughnut',
      defaultFontSize	: 45,
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
          subs.next(this.labels)
          subs.next(this.data)
          //console.log(15)
        }
      },1000);

      return ()=>{
        console.log("Desuscripto");
        clearInterval(intervalo);
      }
    })
  }

}

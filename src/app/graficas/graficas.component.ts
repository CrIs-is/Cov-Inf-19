import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent implements OnInit {

  @ViewChild('canvas', {static: true}) canvas;
  @Input() labels:Array<string> = null;
  @Input() data:Array<string>= null;
  public barss;
  constructor() { 
    
  }

  
//chartType = "doughnut"
  ngOnInit() {
    //let ctx = this.canvas1.nativeElement;
    //ctx.height = 350;
    this.getData().subscribe((data)=>{
      console.log(data)
      this.getDought()
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
  
  }

  getData(){
    return new Observable((subs)=>{
      let intervalo = setInterval(()=>{
        if(this.labels.length == 0 && this.data.length ==0){
          console.log("Los datos no se estan recibiendo")
        }
        else{
          subs.next(this.labels)
          subs.next(this.data)
          clearInterval(intervalo)
        }
      },1000)
    })
  }
 

}

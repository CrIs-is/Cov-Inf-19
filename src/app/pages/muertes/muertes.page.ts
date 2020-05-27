import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { IonSlides } from '@ionic/angular';
import * as moment from 'moment';
import { Pais } from 'src/app/models/pais.interface';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-muertes',
  templateUrl: './muertes.page.html',
  styleUrls: ['./muertes.page.scss'],
})
export class MuertesPage implements OnInit {

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    autoHeight: true
  };

  private colombia:Pais;

  @ViewChild('slides', {static: true}) slides:IonSlides;
 
  public fechaActual =  moment().format();


  @ViewChild('muertesBar',{static: true}) muertesBar;
  bars: any;
  colorArray: any[];
  departamentosL:Array<any> =[];
  departamentosD:Array<any> =[];
  departamentos:Array<any> =[];
  constructor(private service: DataService) { }

  ngOnInit() {
    this.generateColorArray(33);
    this.fechaActual = this.fechaActual.substr(0,10);
    this.getData(this.fechaActual);
  }

  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createBarChart() {
    
    // Chart.defaults.global.defaultFontColor = 'white';
     let ctx = this.muertesBar.nativeElement;
     ctx.height = 400;
     this.bars = new Chart(ctx, {
       type: 'bar',
       defaultFontSize	: 45,
       data: {
         labels: this.departamentosL,
         datasets: [{
           label:  'Muertes',
           data: this.departamentosD,
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

   getData(fecha: string){
    this.service.getColombia(fecha).subscribe(
      (data)=>{
        const res = JSON.parse(data.data)
        this.departamentos = res.dates[fecha].countries.Colombia.regions
        console.log("datos",this.departamentos)
        for(var item of this.departamentos){
          this.departamentosL.push(item.name)
          this.departamentosD.push(item.today_deaths)
        }
        },
        (error)=>{
          console.log(error)
        },
        ()=>{
          this.createBarChart()
          console.log("Complete")
          //this.spinner.dismiss();
        }
    )
  }

  slideNext(){
    this.slides.slideNext(2000);
  }

  slidePrevius(){
    this.slides.slidePrev(2000);
  }

  slidesEvent(event){
    //console.log(event)
  }

}

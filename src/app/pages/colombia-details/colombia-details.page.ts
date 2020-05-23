import { Component, OnInit, ViewChild } from '@angular/core';
import { Pais } from 'src/app/models/pais.interface';
import { DataService } from '../../servicios/data.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import {  IonSlides, IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-colombia-details',
  templateUrl: './colombia-details.page.html',
  styleUrls: ['./colombia-details.page.scss'],
})
export class ColombiaDetailsPage implements OnInit {

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    autoHeight: true
  };

  private colombia:Pais;
  @ViewChild('canvasBar', {static: true}) canvas1;
  @ViewChild('slides', {static: true}) slides:IonSlides;
  //@ViewChild('segment', {static: true}) segment:IonSegment;
  public fechaActual =  moment().format();

  bars: any;
  colorArray:any;
  segmento:any;

 public sexo;
 public sexoL:Array<any> = [];
 public sexoD:Array<any> = [];;
 
  constructor( private service: DataService) {
      this.getSexo()
   }

  ngOnInit() {
    this.fechaActual = this.fechaActual.substr(0,10)
    this.getData(this.fechaActual)
    
    //this.createBarChart()
  }
  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createBarChart() {
    
    let ctx = this.canvas1.nativeElement;
    ctx.height = 350;
    this.bars = new Chart(ctx, {
      type: 'bar',
      defaultFontSize	: 45,
      data: {
        labels: ['Casos','Recuperados','Muertes'],
        datasets: [{
          label:  'Covid-19 en colombia',
          data: [this.colombia.today_confirmed,this.colombia.today_recovered,this.colombia.today_deaths],
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

  getData(fecha: string){
    this.service.getColombia(fecha).subscribe(
    (data)=>{
      const resp = JSON.parse(data.data)
      this.colombia = resp['dates'][fecha]['countries']['Colombia']
      //console.log(this.colombia.today_confirmed)
      console.log(this.colombia)
      this.createBarChart()
    })
  }

  getSexo(){
    this.service.getSexo().subscribe(
      (data)=>{
        let res = JSON.parse(data.data)        
        this.sexo = res['meta']['view']['columns'][15]['cachedContents']['top']
        //console.log(this.sexo)
       for(let label of this.sexo){
         this.sexoL.push(label.item)
         this.sexoD.push(label.count)
       }
       //console.log(this.sexoL)
       //console.log(this.sexoD)
      }
    )
  }

  slidesEvent(event){
    console.log(event)
  }

  slideSiguiente(){
    this.slides.slideNext(2000)
  }

  slideAnterior(){
    this.slides.slidePrev(2000)
  }

  segmentChanged(evento){
    this.segmento = evento.detail.value
    console.log(this.segmento)
    if (this.segmento == "standart") {
      console.log("kdoadk")
    }
  }
}

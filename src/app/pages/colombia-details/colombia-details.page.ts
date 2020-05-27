import { Component, OnInit, ViewChild } from '@angular/core';
import { Pais } from 'src/app/models/pais.interface';
import { DataService } from '../../servicios/data.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import {  IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-colombia-details',
  templateUrl: './colombia-details.page.html',
  styleUrls: ['./colombia-details.page.scss'],
})
export class ColombiaDetailsPage implements OnInit {

  //Option Slides
  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    autoHeight: true
  };

  private colombia:Pais;

  //Charts References
  @ViewChild('canvasBar', {static: true}) canvas1;
  @ViewChild('lineChart', {static: true}) lineChart;
  @ViewChild('lineChart2', {static: true}) lineChart2;
  @ViewChild('slides', {static: true}) slides:IonSlides;
 
  public fechaActual =  moment().format();

  //Charts
  bars: any;
  line: any
  colorArray:any;
  segmento:string='standart';

 
  public mesesDConfirmed:Array<any> = [];
  public mesesDRecovered:Array<any> = [];
  public mesesDDeaths:Array<any> = [];
  private spinner;

  constructor( private service: DataService, private loadingController: LoadingController,public toastController: ToastController) {
    this.presentLoading();
      this.colombia = {
        today_confirmed:0,
        id:'',
        name:'',
        regions:[],
        today_deaths:0,
        today_new_confirmed:0,
        today_new_recovered:0,
        today_new_deaths:0,
        today_recovered:0,
        yesterday_confirmed:0,
        yesterday_deaths:0,
        yesterday_recovered:0,
      }
  }

  ngOnInit() {
    
    this.fechaActual = this.fechaActual.substr(0,10);
    this.getData(this.fechaActual);
    this.getDates()
    
    //this.createBarChart()
  }

  //Charts
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

  createLineChart() {
    let ctx = this.lineChart.nativeElement
    ctx.height = 350
    this.line = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mayo','Abril','Marzo'],
        datasets: [
          {
            label: 'Muertes',
            data: this.mesesDDeaths,
            backgroundColor: '#ff4444',
            borderColor: '#ff4444',
            borderWidth: 1
          },
          {
            label: 'Recuperados',
            data: this.mesesDRecovered,
            backgroundColor: 'rgb(38, 194, 129)',
            borderColor: 'rgb(38, 194, 129)',
            borderWidth: 1
          },
          {
          label: 'Casos',
          data: this.mesesDConfirmed,
          backgroundColor: '#4285F4',
          borderColor: '#4285F4',
          borderWidth: 1
        }
       ]
      },
      options: {
        scales: {
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

  chartDon(){
    let ctx = this.lineChart2.nativeElement
    ctx.height = 350
    this.line = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [{
            data: [20, 10, 4, 2]
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            stacked: true
          }]
        }
      }})
  }

  updateChart(){
    this.bars.update();
    this.presentToast()
  }

  //Data
  getData(fecha: string){
    this.service.getColombia(fecha).subscribe(
    (data)=>{
      const resp = JSON.parse(data.data)
      this.colombia = resp['dates'][fecha]['countries']['Colombia']
      //console.log(this.colombia.today_confirmed)
      //console.log(this.colombia)
    },
    (error)=>{
      console.log(error)
    },
    ()=>{
      this.chartDon()
      this.createBarChart()
     // this.createLineChart() 
      this.spinner.dismiss();
      
    })
  }

  getDates(){
   forkJoin(
     this.service.getMayo(),this.service.getAbril(),this.service.getMarzo()
   ).subscribe(
     (data)=>{
       let mayo = JSON.parse(data[0].data)
       let abril = JSON.parse(data[1].data)
       let marzo = JSON.parse(data[2].data)

       this.mesesDConfirmed.push(mayo.dates[this.fechaActual].countries.Colombia.today_confirmed)
       this.mesesDConfirmed.push(abril.dates['2020-04-30'].countries.Colombia.today_confirmed)
       this.mesesDConfirmed.push(marzo.dates['2020-03-31'].countries.Colombia.today_confirmed)

       this.mesesDRecovered.push(mayo.dates[this.fechaActual].countries.Colombia.today_recovered)
       this.mesesDRecovered.push(abril.dates['2020-04-30'].countries.Colombia.today_recovered)
       this.mesesDRecovered.push(marzo.dates['2020-03-31'].countries.Colombia.today_recovered)

       this.mesesDDeaths.push(mayo.dates[this.fechaActual].countries.Colombia.today_deaths)
       this.mesesDDeaths.push(abril.dates['2020-04-30'].countries.Colombia.today_deaths)
       this.mesesDDeaths.push(marzo.dates['2020-03-31'].countries.Colombia.today_deaths)
     },error => console.log,
     () => this.createLineChart()
   )
  }

  //Slide interaction
  slidesEvent(event){
    //console.log(event)
  }

  slideSiguiente(){
    this.slides.slideNext(2000)
  }

  slideAnterior(){
    this.slides.slidePrev(2000)
  }

  segmentChanged(evento){
    this.segmento = evento.detail.value
    
  }

  //Components 
  async presentLoading() {
    this.spinner = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Actualizando información',
      duration: 3000
    });
     this.spinner.present();

    //const { role, data } = await this.spinner.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Grafica Actualizada.',
      duration: 3000
    });
    toast.present();
  }

  
  
}

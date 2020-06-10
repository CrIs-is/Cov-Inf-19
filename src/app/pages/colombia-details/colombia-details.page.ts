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

  //References
  @ViewChild('lineChart', {static: true}) lineChart;
  @ViewChild('lineChart2', {static: true}) lineChart2;
  @ViewChild('slides', {static: true}) slides:IonSlides;
 
  public fechaActual =  moment().format();

  //Charts
  bars: any;
  line: any
  colorArray:any;
  segmento:string='standart';

 
  public mesesDConfirmed:Array<any> = [0,0];
  public mesesDRecovered:Array<any> = [0,0];
  public mesesDDeaths:Array<any> = [0,0];
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
  }

  //Charts
  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createLineChart() {
    let ctx = this.lineChart.nativeElement
    ctx.height = 350
    this.line = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio'],
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
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo'],
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
      this.colombia = data
    },
    (error)=>{
      console.log(error)
    },
    ()=>{
      //this.chartDon() 
      this.spinner.dismiss();
    })
  }

  getDates(){
   forkJoin(
     this.service.getMes('2020-03-31'),this.service.getMes('2020-04-30'),this.service.getMes('2020-05-31')
     ,this.service.getMes(this.fechaActual)
   ).subscribe(
     (data)=>{
       console.log(data)
        const marzo = data[0]
        const abril = data[1]
        const mayo = data[2]
        const junio = data[3]

       this.mesesDDeaths.push(marzo.today_deaths)
       this.mesesDDeaths.push(abril.today_deaths)
       this.mesesDDeaths.push(mayo.today_deaths)
       this.mesesDDeaths.push(junio.today_deaths)

       this.mesesDRecovered.push(marzo.today_recovered)
       this.mesesDRecovered.push(abril.today_recovered)
       this.mesesDRecovered.push(mayo.today_recovered)
       this.mesesDRecovered.push(junio.today_recovered)

       this.mesesDConfirmed.push(marzo.today_confirmed)
       this.mesesDConfirmed.push(abril.today_confirmed)
       this.mesesDConfirmed.push(mayo.today_confirmed)
       this.mesesDConfirmed.push(junio.today_confirmed)
      
     },error => console.log,
     () =>{
          this.createLineChart();
    }
   )
  }

  //Slide interaction
  slidesEvent(event){
    //console.log(event)
  }

  slideSiguiente(){
    this.slides.slideNext(1000)
  }

  slideAnterior(){
    this.slides.slidePrev(1000)
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

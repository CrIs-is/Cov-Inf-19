import { Component, OnInit, ViewChild } from '@angular/core';
import { Pais } from '../../models/pais.interface';
import { Chart } from 'chart.js';
import { DataService } from '../../servicios/data.service';
import * as moment from 'moment';
import { Departamento } from 'src/app/models/departamento.interface';
import { LoadingController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.page.html',
  styleUrls: ['./casos.page.scss'],
})
export class CasosPage implements OnInit {

  
  @ViewChild('canvas2', {static: true}) canvas2;
  @ViewChild('slide', {static: true}) slide: IonSlides;
  public fechaActual =  moment().format();
  bars: any;
  colorArray:any;
  departamentos:Array<Departamento>;
  departamentosL:Array<string>=[];
  departamentosD:Array<number>=[];

  public sexo;
  public sexoL:Array<any> = [];
  public sexoD:Array<any> = [];

  private spinner;
  
  constructor(public service: DataService,private loadingController:LoadingController) {
    this.presentLoading();
   }

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    //autoHeight: true
  };

  ngOnInit() {
    this.generateColorArray(33) ;
    this.fechaActual = this.fechaActual.substr(0,10);
    this.getData(this.fechaActual);
    this.getSexo();
  }
  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createBarChart() {
    
   // Chart.defaults.global.defaultFontColor = 'white';
    let ctx = this.canvas2.nativeElement;
    ctx.height = 400;
    this.bars = new Chart(ctx, {
      type: 'bar',
      defaultFontSize	: 45,
      data: {
        labels: this.departamentosL,
        datasets: [{
          label:  'Casos',
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
        //const res = JSON.parse(data.data)
        this.departamentos = data.regions
        console.log("datos",this.departamentos)
        for(var item of this.departamentos){
          this.departamentosL.push(item.name)
          this.departamentosD.push(item.today_confirmed)
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

  getSexo(){
    this.service.getSexo().subscribe((data)=>{
      data.forEach(element => {
        this.sexoL.push(element.item)
        this.sexoD.push(element.count)
      });
      console.log(this.sexoL);
      console.log(this.sexoD);
    })
  }

  
  async presentLoading() {
    this.spinner = await  this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Actualizando información',
      duration: 3000
    });
    await this.spinner.present();

    const { role, data } = await this.spinner.onDidDismiss();
    console.log('Loading dismissed!');
  }

  slideNext(){
    this.slide.slideNext(1000);
  }
  slidePrevius(){
    this.slide.slidePrev(1000);
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { MuertesService } from '../../servicios/muertes.service';
import { Departamento } from '../../models/departamento.interface';

@Component({
  selector: 'app-muertes',
  templateUrl: './muertes.page.html',
  styleUrls: ['./muertes.page.scss'],
})
export class MuertesPage implements OnInit {

  @ViewChild('slides', {static: true}) slides:IonSlides;

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    autoHeight: true
  };

  public fechaActual =  moment().format();

  public muertes:any = [];
  departamentosL:Array<any> =[];
  departamentosD:Array<any> =[];

  public deaths:any = [];
  public edades = [];

  public deathsMaleByAge = [];
  public deathsFemaleByAge = [];

  public deathsD  = [];

  colorArray:Array<any> = [];
  labelEdades:Array<string> = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '>= 90']

  constructor(private service: MuertesService,private loadingController: LoadingController) {
    this.presentLoading();
   }

  ngOnInit() {
    this.generateColorArray(33);
    this.fechaActual = this.fechaActual.substr(0,10);
    this.deathsBySex();
    this.getDeathAll(this.fechaActual);
  }

   getDeathAll(fecha: string){
    this.service.getAllRegions(fecha).subscribe(
      (data)=>{
              
        console.log("datos",data);
        data.forEach((item:Departamento)=>{
          this.departamentosD.push(item.today_deaths)
          this.departamentosL.push(item.name)
        })
        console.log(this.departamentosL)
        },
        (error)=>{
          console.log(error)
        },
        ()=>{
          console.log("Complete")
         
        }
    )
  }

  deathsBySex(){
    this.service.getDeathsBySex().subscribe((data)=>{
      this.muertes = data.filter((n:string)=> n[13].toUpperCase() == 'FALLECIDO');
      
    },error=> console.log(error),
    ()=>{
      this.deathsFemale();
      this.deathsMale();
      this.deathsByAge();
      this.deathsFByAgeAndSex();
    }
    )
    
  }

  deathsFemale(){
    this.deaths.push(this.muertes.filter((n:string)=> n[15].toUpperCase() == 'F'))
    this.deathsD.push(this.deaths[0].length);
   // console.log(this.deaths[0])
  };
  deathsMale(){
    this.deaths.push(this.muertes.filter((n:string)=> n[15].toUpperCase() == 'M'))
    //console.log(this.deaths[1].length)
    this.deathsD.push(this.deaths[1].length);
    this.deathsMByAgeAndSex();
  };

  deathsByAge(){
    this.edades.push(this.muertes.filter((n:number)=> n[14] <= 9).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
    this.edades.push(this.muertes.filter((n:number)=> n[14] >= 90).length)
  
}

  deathsMByAgeAndSex(){

    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] <= 9).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
    this.deathsMaleByAge.push(this.deaths[1].filter((n:number)=> n[14] >= 90).length)

    //console.log("Cont edades",this.deathsMaleByAge[9])
  }


  deathsFByAgeAndSex(){

    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] <= 9).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
    this.deathsFemaleByAge.push(this.deaths[0].filter((n:number)=> n[14] >= 90).length)

    //console.log("Cont edades",this.deathsMaleByAge[9])
  }

  slideNext(){
    this.slides.slideNext(1000);
  }

  slidePrevius(){
    this.slides.slidePrev(1000);
  }

  slidesEvent(event){
    //console.log(event)
  }

  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Actualizando informacion..',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed!');
  }

}

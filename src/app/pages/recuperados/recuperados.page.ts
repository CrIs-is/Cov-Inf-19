import { Component, OnInit, ViewChild } from '@angular/core';
import { Departamento } from '../../models/departamento.interface';
import { MuertesService } from '../../servicios/muertes.service';
import * as moment from 'moment';
import { IonSlides, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-recuperados',
  templateUrl: './recuperados.page.html',
  styleUrls: ['./recuperados.page.scss'],
})
export class RecuperadosPage implements OnInit {

  public fechaActual =  moment().format();
  @ViewChild('slides', {static: true}) slides:IonSlides;

  public departamentosD:Array<number> = [];
  public departamentosL:Array<string> = [];

  public recovered:any = [];
  public recuperados:any = [];

  public colorArray = [];

  public labelEdades:Array<string> = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '>= 90']
  public recoveredFemaleByAge:any = [];
  public recoveredMaleByAge:any = [];

  public recoveredD:any= [];
  public edades:any = [];

  constructor(private service: MuertesService,private loadingController: LoadingController) { 
    this.fechaActual = this.fechaActual.substr(0,10);
    this.presentLoading() ;
  }

  ngOnInit() {
    this.generateColorArray(33);
    this.getRecoveredAll(this.fechaActual);
    this.recoveredBySex();
  }


  getRecoveredAll(fecha: string){
    this.service.getAllRegions(fecha).subscribe(
      (data)=>{
              
        console.log("datos",data);
        data.forEach((item:Departamento)=>{
          this.departamentosD.push(item.today_recovered)
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

  recoveredBySex(){
    this.service.getDeathsBySex().subscribe((data)=>{
      this.recovered = data.filter((n:string)=> n[13].toUpperCase() == 'RECUPERADO');
      console.log("Estos recuperados",this.recovered.length)
    },error=> console.log(error),
    ()=>{
      this.recoveredFemale();
      this.recoveredmale();
      this.recoveredByAge();
      this.deathsMByAgeAndSex();
      this.deathsFByAgeAndSex()
    }
    )
    
  }

  recoveredFemale(){
    this.recuperados.push(this.recovered.filter((n:string)=> n[15].toUpperCase() == 'F'))
    this.recoveredD.push(this.recuperados[0].length);
  };
  recoveredmale(){
    this.recuperados.push(this.recovered.filter((n:string)=> n[15].toUpperCase() == 'M'))
    this.recoveredD.push(this.recuperados[1].length);
  };

  recoveredByAge(){
    this.edades.push(this.recovered.filter((n:number)=> n[14] <= 9).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
    this.edades.push(this.recovered.filter((n:number)=> n[14] >= 90).length)
  
}


deathsMByAgeAndSex(){

  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] <= 9).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
  this.recoveredMaleByAge.push(this.recuperados[1].filter((n:number)=> n[14] >= 90).length)

  //console.log("Cont edades",this.deathsMaleByAge[9])
}


deathsFByAgeAndSex(){

  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] <= 9).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
  this.recoveredFemaleByAge.push(this.recuperados[0].filter((n:number)=> n[14] >= 90).length)

  //console.log("Cont edades",this.deathsMaleByAge[9])
}




  slidePrevius(){
    this.slides.slidePrev(1000);
  }

  slideNext(){
    this.slides.slideNext(1000);
  }

  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  //Components 
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Actualizando información...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}

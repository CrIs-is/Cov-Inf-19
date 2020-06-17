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

  
  @ViewChild('slide', {static: true}) slide: IonSlides;
  public fechaActual =  moment().format();

  colorArray:Array<any> = [];
  labelEdades:Array<string> = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '>= 90']

  //Edades
  public hombres:Array<any> = [];
  public mujeres:Array<any> = [];
  public edades: Array<any> = [];
  
  //Departamentos
  departamentos:Array<Departamento>;
  departamentosL:Array<string>=[];
  departamentosD:Array<number>=[];

  public sexo;
  public sexoL:Array<any> = [];
  public sexoD:Array<any> = [];

  private arreglo:Array<any> = []

  private spinner;
  
  constructor(public service: DataService,private loadingController:LoadingController) {
    this.presentLoading();
    this.generateColorArray(33)
   }

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    //autoHeight: true
  };

  ngOnInit() {
    this.fechaActual = this.fechaActual.substr(0,10);
    this.getData(this.fechaActual);
    this.getSex();
    this.getAge();
  }

  getData(fecha: string){
    this.service.getColombia(fecha).subscribe(
      (data)=>{
        //const res = JSON.parse(data.data)
        this.departamentos = data.regions
        //console.log("datos",this.departamentos)
        for(var item of this.departamentos){
          this.departamentosL.push(item.name)
          this.departamentosD.push(item.today_confirmed)
        }
        },
        (error)=>{
          console.log(error)
        },
        ()=>{ 
          console.log("Complete")
        }
    )
  }

  getSex(){
    this.service.getSexo().subscribe((data)=>{
      data.forEach(element => {
        this.sexoL.push(element.item)
        this.sexoD.push(element.count)
      });
      console.log(this.sexoL);
      console.log(this.sexoD);
    })
  }

  getAge(){
    this.service.getAge().subscribe((data)=>{
      console.log("Data",data.length)
      this.arreglo = data;
      this.confirmedByAge(); 
      this.confirmedMByAgeAndSex();
      this.confirmedFByAgeAndSex();

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

  generateColorArray(num: number) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  confirmedByAge(){
      this.edades.push(this.arreglo.filter((n:number)=> n[14] <= 9).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
      this.edades.push(this.arreglo.filter((n:number)=> n[14] >= 90).length)

     
  }

  confirmedMByAgeAndSex(){
      const MASCULINO = this.arreglo.filter((n:string)=> n[15].toUpperCase()  == 'M')
      
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] <= 9).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
      this.hombres.push(MASCULINO.filter((n:number)=> n[14] >= 90).length)

      let cont = 0
      for (let index = 0; index < this.edades.length; index++) {
        const element = this.edades[index];
        cont+=this.hombres[index]
      }
      console.log("Cont edades",cont)
  }

  confirmedFByAgeAndSex(){
    const FEMENINO = this.arreglo.filter((n:string)=> n[15].toUpperCase() == 'F')
    
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] <= 9).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 10 && n[14] <= 19).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 20 && n[14] <= 29).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 30 && n[14] <= 39).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 40 && n[14] <= 49).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 50 && n[14] <= 59).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 60 && n[14] <= 69).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 70 && n[14] <= 79).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 80 && n[14] <= 89).length)
    this.mujeres.push(FEMENINO.filter((n:number)=> n[14] >= 90).length)
    
}

}

import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { DataService } from '../servicios/data.service';
import * as moment from 'moment';
import { HTTP } from '@ionic-native/http/ngx';
import { Pais } from '../models/pais.interface';
import { Router } from '@angular/router';
import { Global } from '../models/global.interface';
import { ModalPage } from '../components/modal/modal.page';
import { banderas } from '../servicios/banderas';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public fechaActual =  moment().format();

  public colombia:Pais;
  public global:Global;
  
  constructor(public platform: Platform , 
    public dataSer: DataService, 
    public native_Http: HTTP, 
    private router: Router,
    public modal: ModalController) {
      this.colombia = {
        today_confirmed:null,
        id:'',
        name:'',
        regions:[],
        today_deaths:0,
        today_new_confirmed: null,
        today_new_recovered:0,
        today_new_deaths:0,
        today_recovered:0,
        yesterday_confirmed:0,
        yesterday_deaths:0,
        yesterday_recovered:0,
      }

    this.global =  {
      
      today_confirmed: null,
      today_new_confirmed: null,
      
    };
  }
  
  ngOnInit(): void {
    this.fechaActual = this.fechaActual.substr(0,10)
    console.log(this.fechaActual)
    if(this.platform.is('cordova')) {
      this.getPais()
      this.getDNativeColombia(this.fechaActual);
      this.getDNativeGlobal(this.fechaActual)
    }
    
  }

  getDNativeGlobal(fecha : string){
    this.dataSer.getGlobal(fecha).subscribe(
      (data) => {
        const res = JSON.parse(data.data)
        this.global = res['total']
        console.log("COnfirm",this.global.today_confirmed)
      }
    )
  }

  getDNativeColombia(fecha: string){
    this.dataSer.getColombia(fecha).subscribe(
      (data)=>{
        const resp = JSON.parse(data.data)
        this.colombia = resp['dates'][fecha]['countries']['Colombia']
        console.log(this.colombia)
      },
      (error)=>{
        console.log(error)
      },()=>{
        console.log("GetDataColombia finalizado")
      }
    )
  }

  goToColombia(){
    this.router.navigate([`/colombia/detalles`])
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: ModalPage,
      swipeToClose: true,
      componentProps:{
        "parametro":banderas
      }
    });
    return await modal.present();
  }

  private data;
  getPais(){
    this.dataSer.getPaisesNews().subscribe(
      (data)=>{
       console.log(data)
      }
    )}


}
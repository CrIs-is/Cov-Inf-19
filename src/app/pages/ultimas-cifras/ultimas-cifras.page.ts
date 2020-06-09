import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.interface';
import { Global } from 'src/app/models/global.interface';
import * as moment from 'moment';
import { Platform } from '@ionic/angular';
import { DataService } from 'src/app/servicios/data.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ultimas-cifras',
  templateUrl: './ultimas-cifras.page.html',
  styleUrls: ['./ultimas-cifras.page.scss'],
})
export class UltimasCifrasPage implements OnInit {

  public fechaActual =  moment().format();

  public colombia:Pais;
  public global:Global;
  
  constructor(public platform: Platform , 
    public dataSer: DataService, 
    public native_Http: HTTP, 
    private router: Router
    ) {

      this.colombia = {
        today_confirmed:null,
        id:'',
        name:'',
        regions:[],
        today_deaths:null,
        today_new_confirmed: null,
        today_new_recovered:null,
        today_new_deaths:null,
        today_recovered:null,
        yesterday_confirmed:null,
        yesterday_deaths:null,
        yesterday_recovered:null,
      }
      this.global =  {
        
        today_confirmed: null,
        today_new_confirmed: null,
        
      };
  }
  
  ngOnInit(): void {
    this.fechaActual = this.fechaActual.substr(0,10)
    console.log(this.fechaActual)
    //if(this.platform.is('cordova')) {
      this.getDNativeColombia(this.fechaActual);
      this.getDNativeGlobal(this.fechaActual)
    //}
  }

  getDNativeGlobal(fecha : string){
    this.dataSer.getGlobal(fecha).subscribe(
      (data) => {
        this.global = data
        //console.log(this.global)
      }
    )
  }

  getDNativeColombia(fecha: string){
    this.dataSer.getColombia(fecha).subscribe(
      (data)=>{
        this.colombia = data
        //const resp = JSON.parse(data.data)
       // this.colombia = resp['dates'][fecha]['countries']['Colombia']
        console.log(this.colombia)
      },
      (error)=>{
        console.log(error)
      },()=>{
        //console.log("GetDataColombia finalizado")
      }
    )
  }

  goToDetails(){
    this.router.navigate(['colombia-details'])
  }
  
}

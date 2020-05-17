import { Component, OnInit } from '@angular/core';
import { ModalPage } from '../../components/modal/modal.page';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../servicios/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pais } from '../../models/pais.interface';
import * as moment from 'moment';


@Component({
  selector: 'app-colombia',
  templateUrl: './colombia.page.html',
  styleUrls: ['./colombia.page.scss'],
})
export class ColombiaPage implements OnInit {

  public fechaActual =  moment().format();

  public colombia:Pais;
  
  constructor(private router: Router,public modalController: ModalController,private service : DataService,private rutasAc: ActivatedRoute) {
    this.fechaActual = this.fechaActual.substr(0,10)
    this.colombia =  {
      id: "",
      name: "",
      today_confirmed: null,
      today_new_confirmed: null,
      regions: null,
      today_deaths: null,
      today_recovered: null
    };
   }

  ngOnInit() {
    this.getDNativeColombia(this.fechaActual)
  }

  getDNativeColombia(fecha: string){
    this.service.getColombia(fecha).subscribe(
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      swipeToClose: true,
      componentProps:{
        "departamentos":this.colombia.regions
      }
    });
    return await modal.present();
  }

  


}

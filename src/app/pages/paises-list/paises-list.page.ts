import { Component, OnInit, OnDestroy } from '@angular/core';
import { MuertesService } from '../../servicios/muertes.service';
import * as moment from 'moment';
import { Pais } from '../../models/pais.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-paises-list',
  templateUrl: './paises-list.page.html',
  styleUrls: ['./paises-list.page.scss'],
})
export class PaisesListPage implements OnInit,OnDestroy {

  public data: Pais[] = [];
  filtrar: string = '';
  subs:Subscription;

  public fechaActual =  moment().format();
  constructor(private service: MuertesService, private router: Router,private loadingController:LoadingController) { 
    this.fechaActual = this.fechaActual.substr(0,10)
  }

  ngOnInit() {
    this.presentLoading()
    this.getListCountries(this.fechaActual);
    console.log(this.fechaActual);
  }

  getListCountries(fecha: string){
    this.subs = this.service.getAllPaises(fecha).subscribe((res)=>{
      console.log("Paises",res)
      for(var i in res){
        this.data.push(res[i])
      }
      console.log(this.data);
      
      //this.data = res;
      
    },
    (error)=>{
      console.log(error);
      
    })
  }

  onSearchChange(event){
    this.filtrar = event.detail.value;
  }

  goToDetail(pais: string){
    this.router.navigate([`pais-detail/${pais}`])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
   this.subs.unsubscribe();
   
   console.log("cerrando");
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      //message: '',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}

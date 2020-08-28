import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MuertesService } from '../../servicios/muertes.service';
import * as moment from 'moment';
import { Pais } from '../../models/pais.interface';

@Component({
  selector: 'app-pais-detail',
  templateUrl: './pais-detail.page.html',
  styleUrls: ['./pais-detail.page.scss'],
})
export class PaisDetailPage implements OnInit, OnDestroy {

  public id: string = '';
  public pais:Pais = { 
    date:'',
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
  public fechaActual =  moment().format();
  public subs;
  constructor(private getParams: ActivatedRoute, private services: MuertesService) {
    this.fechaActual = this.fechaActual.substr(0,10);
   }

  ngOnInit() {
    this.id = this.getParams.snapshot.params['pais'];
    console.log(this.id);
     this.getCurrentCountry();
  }

  getCurrentCountry(){
    return this.services.getCountry(this.fechaActual,this.id).subscribe((res)=>{
      this.pais = res;
      console.log(this.pais);
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class
    
    this.getCurrentCountry().unsubscribe();
    console.log("cerrando");
    
  }

}

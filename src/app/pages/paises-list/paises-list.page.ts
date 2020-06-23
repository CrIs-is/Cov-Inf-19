import { Component, OnInit } from '@angular/core';
import { MuertesService } from '../../servicios/muertes.service';
import * as moment from 'moment';
import { Pais } from '../../models/pais.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paises-list',
  templateUrl: './paises-list.page.html',
  styleUrls: ['./paises-list.page.scss'],
})
export class PaisesListPage implements OnInit {

  public data: Pais[] = [];
  filtrar: string = '';

  public fechaActual =  moment().format();
  constructor(private service: MuertesService, private router: Router) { 
    this.fechaActual = this.fechaActual.substr(0,10)
  }

  ngOnInit() {
    this.getListCountries(this.fechaActual);
    console.log(this.fechaActual);
    
  }

  getListCountries(fecha: string){
    this.service.getAllPaises(fecha).subscribe((res)=>{
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

}

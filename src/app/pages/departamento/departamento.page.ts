import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { MuertesService } from '../../servicios/muertes.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.page.html',
  styleUrls: ['./departamento.page.scss'],
})
export class DepartamentoPage implements OnInit {

  municipios: any[] =[]
  data:any[]=[];

  public galapa: any ={}
  public puertoColombia:any ={}
  public soledad: any ={}
  public barranquilla: any ={}
  public santoTomas:any ={}
  public ponedera: any ={}
  public baranoa: any ={}
  public malambo: any ={}
  public Sabanagrande: any ={}
  public polonuevo: any ={}

  constructor(private service: MuertesService,private loadingController:LoadingController) { }

  ngOnInit() {
    this.getInformacion();
    this.presentLoading();
    
  }

  getInformacion(){
    
    this.service.getDeathsBySex().subscribe((data)=>{
      this.data = data;
      
    },error => console.log(error),
    ()=>{
      this.getGalapa();
      this.getPuertoColombia();
      this.getSoledad();
      this.getBarranquilla();
      this.getSantoTomas();
      this.getPonedera();
      this.getBaranoa();
      this.getMalambo();
      this.getSabanaGrande();
      this.getPolonuevo();
    })
  }

  getGalapa(){
    let casos = this.data.filter((n: string)=> n[11] == 'Galapa');
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido');
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado');
    this.galapa = {
      nombre:'Galapa',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }
    this.municipios.push(this.galapa);
    
  }

  getPuertoColombia(){
    
    let casos = this.data.filter((n: string)=> n[11] == 'Puerto Colombia')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')
    

    this.puertoColombia = {
      nombre:'Puerto colombia',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }

    this.municipios.push(this.puertoColombia);
  }
  
  getSoledad(){
    
    let casos = this.data.filter((n: string)=> n[11] == 'Soledad')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')

    this.soledad = {
      nombre:'Soledad',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }

    this.municipios.push(this.soledad);
  }

  getBarranquilla(){
    let casos = this.data.filter((n: string)=> n[11] == 'Barranquilla')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')

    this.barranquilla = {
      nombre:'Barranquilla',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }

    this.municipios.push(this.barranquilla);
  }

  getSantoTomas(){
    let casos = this.data.filter((n: string)=> n[11] == 'Santo Tomás')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')

    this.santoTomas= {
      nombre:'Santo Tomás',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }

    this.municipios.push(this.santoTomas);
  }

  getPonedera(){
    let casos = this.data.filter((n: string)=> n[11] == 'Ponedera')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')

    this.ponedera= {
      nombre:'Ponedera',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }
    this.municipios.push(this.ponedera);

    
  }

  getBaranoa(){
    let casos = this.data.filter((n: string)=> n[11] == 'Baranoa')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')

    this.baranoa= {
      nombre:'Baranoa',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }

    this.municipios.push(this.baranoa);
  }

  getMalambo(){
    let casos = this.data.filter((n: string)=> n[11] == 'Malambo')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')

    this.malambo= {
      nombre:'Malambo',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }

    this.municipios.push(this.malambo);
  }

  getSabanaGrande(){
    let casos = this.data.filter((n: string)=> n[11] == 'Sabanagrande')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')

    this.Sabanagrande= {
      nombre:'Sabanagrande',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }

    this.municipios.push(this.Sabanagrande);
  }

  
  getPolonuevo(){
    
    let casos = this.data.filter((n: string)=> n[11] == 'Polonuevo')
    let muertes = casos.filter((n: string)=> n[13] == 'Fallecido')
    let recuperados = casos.filter((n: string)=> n[13] == 'Recuperado')
    

    this.polonuevo = {
      nombre:'Polonuevo',
      casos:casos.length,
      muertes:muertes.length,
      recuperados:recuperados.length,
    }

    this.municipios.push(this.polonuevo);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 10000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}

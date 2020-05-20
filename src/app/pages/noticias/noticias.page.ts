import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { Noticia } from '../../models/noticia.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { banderas } from '../../servicios/banderas';
import { ModalPage } from 'src/app/components/modal/modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  private bandera;
  private code;
  private data : Noticia[] =null;
  constructor(private service: DataService, private ruta: Router,public ActRoute: ActivatedRoute, private modal: ModalController) { 
    this.code = this.ActRoute.snapshot.params.code
  }

  ngOnInit() {
    this.getNoticias(this.code)
    const id = this.ActRoute.snapshot.params.id
    this.bandera = banderas[id].flag
  }

 
 getNoticias(code){
    this.service.getNoticesCovidColombia(code).subscribe(
      (data)=> {
        this.data = data['articles']
        console.log(this.data)
      },
      (error)=> {
        console.log(error)
      },
      ()=> {console.log("completado")},
    )
  }

  goToNotice(index: number){
    console.log(index)
    this.ruta.navigate([`noticias/pais/${this.code}/noticia/${index}`])
  }

  trackByFn(index: number,noticia:Noticia){
    return index;
  }

  deleteElement(item){
      var i = this.data.indexOf( item );
      i !== -1 && this.data.splice( i, 1 );
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

 

}

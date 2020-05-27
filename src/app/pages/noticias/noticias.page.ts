import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { Noticia } from '../../models/noticia.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { banderas } from '../../servicios/banderas';
import { ModalPage } from 'src/app/components/modal/modal.page';
import { ModalController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  private data : Noticia[] = null;

  constructor(private routerOutlet: IonRouterOutlet, private service: DataService, private ruta: Router,public ActRoute: ActivatedRoute, private modal: ModalController) { 
  
  }

  ngOnInit() {
    this.getNoticias();
  }

 
 getNoticias(){
    this.service.getNoticesCovidColombia().subscribe(
      (data)=> {
        const parseTo = JSON.parse(data.data)
        this.data = parseTo['articles']
        //console.log()
      },
      (error)=> {
        console.log(error)
      },
      ()=> {console.log("completado")},
    )
  }

  goToNotice(index: number){
    console.log(index)
    
  }

  trackByFn(index: number,noticia:Noticia){
    return index;
  }

  deleteElement(item){
      var i = this.data.indexOf( item );
      i !== -1 && this.data.splice( i, 1 );
  }

  async presentModal(index) {
    const modal = await this.modal.create({
      component: ModalPage,
      cssClass: 'animate__animated animate__fadeInUpBig',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'id': index,
      }
    });
    return await modal.present();
  }
 

}

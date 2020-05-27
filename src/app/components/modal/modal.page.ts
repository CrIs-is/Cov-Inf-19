import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pais } from '../../models/pais.interface';
import { DataService } from '../../servicios/data.service';
import { Router } from '@angular/router';
import { Noticia } from '../../models/noticia.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: number;
  data: any;
  noticia: Noticia;
  
  constructor(private modalCtrl : ModalController, private service: DataService, private router: Router) {
    this.noticia = {
      author:'',
      title:'',
      content:'',
      description:'',
      publishedAt:'',
      urlToImage:'',
      url:'',
      source:''
    }
   }

  ngOnInit() {
    console.log(this.id)
    this.getNoticias()
    //this.service.getBanderas().subscribe(data => console.log("jaja",data))
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
 
  getNoticias(){
    this.service.getNoticesCovidColombia().subscribe(
      (data)=> {
        const parseTo = JSON.parse(data.data)
        this.noticia = parseTo['articles'][this.id]
        console.log(data)
        //[scrollEvents]="true" (ionScroll)="scroll($event)"
      },
      (error)=> {
        console.log(error)
      },
      ()=> {console.log("completado")},
    )
  }

  removeItemFromArr( arr, item ){
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
  };
}

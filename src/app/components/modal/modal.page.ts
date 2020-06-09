import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
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
  public noticia: Noticia=null;
  
  constructor(private modalCtrl : ModalController, private service: DataService, private router: Router,private platform: Platform) {
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
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
 
  getNoticias(){
    this.service.getNoticesCovidColombia().subscribe(
      (data)=> {
        this.noticia = data[this.id]
      },
      (error)=> {
        console.log(error)
      },
      ()=> {console.log("Noticias completado")},
    )
  }

  removeItemFromArr( arr, item ){
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
  };

  butonBack(){
    return this.platform.backButton.subscribe(async () =>{
      this.dismiss()
    })
  }
  
  ngOnDestroy(): void {
    this.butonBack().unsubscribe()
  }
}

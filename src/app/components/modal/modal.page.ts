import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { DataService } from '../../servicios/data.service';
import { Router } from '@angular/router';
import { Noticia } from '../../models/noticia.interface';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: number;
  data: any;
  public noticia: Noticia=null;
  
  constructor(private modalCtrl : ModalController, private service: DataService, private router: Router,
    private platform: Platform, private socialSharing: SocialSharing) {
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

  sharedNotice(item){
    var options = {
      //message: 'Ionic compartir', // not supported on some apps (Facebook, Instagram)
      //subject: 'the subject', // fi. for email
      //files: ['', ''], // an array of filenames either locally or remotely
      url: item.url,
      //chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
      //appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
     // iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };
    console.log("Ejecuntado shared")
    this.socialSharing.shareWithOptions(options);
  }
  
  ngOnDestroy(): void {
    this.butonBack().unsubscribe()
  }
}

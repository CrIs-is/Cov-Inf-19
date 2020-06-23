import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../servicios/data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy{

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  public cifra:boolean = false;
  public noticia:boolean = false;
  public local:boolean = false;
  

  constructor(private geolocation : Geolocation, private platform: Platform,private toast: ToastController,private router:Router,private service: DataService){
  }

  ngOnInit(){
    setTimeout(()=>{
      this.cifra = true;
    },1500)
    this.exitApp();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Presione dos veces para salír.',
      duration: 2000,
      animated:true,
      mode:'ios'
    });
    toast.present();
  }

  exitApp(){
     this.platform.backButton.subscribe(async=>{
       if(this.router.url === '/home'){
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          // this.platform.exitApp(); // Exit from app
          navigator['app'].exitApp(); // work in ionic 4
      } else {
          this.presentToast();
          this.lastTimeBackPress = new Date().getTime();
      }
       }
     
    })
  }
  ngOnDestroy(){
    
  }

  cifras(){
    this.cifra = !this.cifra
  }

  noticias(){
    this.noticia = !this.noticia
  }

  localizacion(){
    this.local = !this.local
  }


  goToCifras(){
    this.router.navigate(['/ultimas-cifras'])
  }

  goToNoticias(){
    this.router.navigate(['/noticias'])
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.goToLocation()
      console.log(resp)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  goToLocation(){
    this.service.getLocationIp().subscribe((resp)=>{
      console.log(resp)
    },err => console.log("Eee errorrr",err))
  }
}
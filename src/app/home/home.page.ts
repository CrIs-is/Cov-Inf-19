import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy{

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(private platform: Platform,private toast: ToastController,private router:Router){
  }

  ngOnInit(){
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

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../servicios/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pais } from '../../models/pais.interface';
import * as moment from 'moment';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';




@Component({
  selector: 'app-colombia',
  templateUrl: './colombia.page.html',
  styleUrls: ['./colombia.page.scss'],
})
export class ColombiaPage implements OnInit {

  public fechaActual =  moment().format();
  @ViewChild('header',{static: true}) header;
  @ViewChild('tabs',{static: true}) tabs;

  public colombia:Pais;
 
 
  
  constructor(private router: Router,
    public modalController: ModalController,
    private screenOrientation: ScreenOrientation) {

    this.fechaActual = this.fechaActual.substr(0,10)
    this.colombia =  {
      id: "",
      name: "",
      today_confirmed: null,
      today_new_confirmed: null,
      regions: null,
      today_deaths: null,
      today_recovered: null
    };
   }

  ngOnInit() {
    //this.getDNativeColombia(this.fechaActual)
    this.pantalla()
  }

  //Detectando rotacion de pantalla
  pantalla() {
    this.screenOrientation.onChange().subscribe(
      () => {
        if (this.screenOrientation.type === "landscape-secondary") {
          console.log("Orientation Changed a hoorizontal");
          this.header.el.style.display = "none"
          this.tabs.el.style.display = "none"
          
          
        }
        else{
          this.header.el.style.display = "block"
          this.tabs.el.style.display = ""
          console.log("Vertical");
          console.log(this.tabs)

          
        }
      });
  }

  


}

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
    private screenOrientation: ScreenOrientation,
    private service: DataService) {

    this.fechaActual = this.fechaActual.substr(0,10)
    this.colombia = {
      today_confirmed:null,
      id:'',
      name:'',
      regions:[],
      today_deaths:0,
      today_new_confirmed:null,
      today_new_recovered:0,
      today_new_deaths:0,
      today_recovered:0,
      yesterday_confirmed:0,
      yesterday_deaths:0,
      yesterday_recovered:0,
    }
   }

  ngOnInit() {
    //this.getDNativeColombia(this.fechaActual)
    this. getData(this.fechaActual);
    this.pantalla();
  }

  getData(fechaActual){
    this.service.getColombia(fechaActual).subscribe((data)=>{
      this.colombia = data;
      console.log("Colombia para los badges",this.colombia)
    })
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

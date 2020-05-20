import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pais } from '../../models/pais.interface';
import { DataService } from '../../servicios/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() parametro: Array<any>;
  
  constructor(private modalCtrl : ModalController, private service: DataService, private router: Router) { }

  ngOnInit() {
    console.log(this.parametro)
    //this.service.getBanderas().subscribe(data => console.log("jaja",data))
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  goToNotices(index: number,code: string){
    this.router.navigate([`noticias/pais/${index}/${code}`])
    this.dismiss()
  }

}

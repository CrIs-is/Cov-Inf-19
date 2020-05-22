import { Component, OnInit, Input, ViewChild, ElementRef,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticia } from '../../models/noticia.interface';
import { DataService } from '../../servicios/data.service';
import { slideOpts } from 'src/assets/slideconf';
import {Observable, fromEvent} from 'rxjs';
import { IonHeader } from '@ionic/angular';
import { banderas } from '../../servicios/banderas';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  private data;
  public banderas= banderas
  public bandera;
  public noticia:Noticia;
  private id;
  private ref;
  public ocultar;

  public backAll ;
  //public header
  
  @ViewChild('parallax', {static: true}) parallax:ElementRef; 
  @ViewChild('header', {static: true}) public header:ElementRef;
  private configSlide = slideOpts

  constructor(public ruta: ActivatedRoute, public service: DataService,public router:Router) { 
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
    this.id = this.ruta.snapshot.paramMap.get('index')
    this.ref = this.ruta.snapshot.paramMap.get('code')
    console.log(this.id)
    console.log(this.ref)
    

  }

  ngOnInit() {
    this.getNoticias(this.ref)
  }

  scroll(e){
    //this.parallax.nativeElement.style.color = 'red'
    this.parallax.nativeElement.style.transform = 'translateY(' + e.detail.scrollTop * +0.4 + 'px)'
    //console.log(this.parallax)
    e.detail.scrollTop <= 300 ? this.ocultar = 'ion-block' : this.ocultar = 'ion-hide'
   // console.log(this.header)
    //e.detail.scrollTop == 0 ? this.header.collapse : null

  }

  getNoticias(ref: string){
    this.service.getNoticesCovidColombia(ref).subscribe(
      (data)=> {
        const parseTo = JSON.parse(data.data)
        
        this.noticia = parseTo['articles'][this.id]
        this.data = parseTo['articles']    
        //this.removeItemFromArr(this.data,this.id)
      },
      (error)=> {
        console.log(error)
      },
      ()=> {console.log("completado")},
    )
  }

  goToNotice(index: number){
    console.log(index)
    this.router.navigate([`noticias/pais/${this.ref}/noticia/${index}`])
  }

   removeItemFromArr( arr, item ){
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
  };

  back(){
    var elemn;
    for (let index = 0; index < this.banderas.length; index++) {
      const element = this.banderas[index];
      if(this.banderas[index].code == this.ref){
        elemn = index
        break
      }
      
    }
    this.router.navigate([`noticias/pais/${elemn}/${this.ref}`])
  }

}

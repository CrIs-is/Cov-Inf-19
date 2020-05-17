import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { Noticia } from '../../models/noticia.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  private data : Noticia[] =null;
  constructor(private service: DataService, private ruta: Router) { }

  ngOnInit() {
    this.getNoticias()
  }

 
 getNoticias(){
    this.service.getNoticesCovidColombia().subscribe(
      (data)=> {
        this.data = data['articles']
        console.log(this.data)
      },
      (error)=> {
        console.log(error)
      },
      ()=> {console.log("completado")},
    )
  }

  goToNotice(index: number){
    console.log(index)
    this.ruta.navigate([`noticia/${index}`])
  }

}

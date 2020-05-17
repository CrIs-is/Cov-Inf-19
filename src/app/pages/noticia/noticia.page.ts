import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../../models/noticia.interface';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  private data;
  public noticia:Noticia;
  private id;

  constructor(private ruta: ActivatedRoute, private service: DataService) { 
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
    this.id = this.ruta.snapshot.paramMap.get('id')
    console.log(this.id)
  }

  ngOnInit() {
    this.getNoticias()
  }

  getNoticias(){
    this.service.getNoticesCovidColombia().subscribe(
      (data)=> {
        this.noticia = data['articles'][this.id]
        this.noticia.source = this.noticia['source']['name']
        console.log(this.noticia.source)
      },
      (error)=> {
        console.log(error)
      },
      ()=> {console.log("completado")},
    )
  }

}

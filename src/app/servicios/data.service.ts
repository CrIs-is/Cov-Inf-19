import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Platform, AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from, fromEvent } from 'rxjs';
import { banderas } from './banderas';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  private banderas$;
  constructor(private http: HttpClient,private nativeHttp: HTTP, public _platform: Platform,public alerte: AlertController ) {
    //this.url = 'https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD';
    
  } 

  getNoticesCovidColombia(code:string){
    let request =  this.nativeHttp.get(`http://newsapi.org/v2/top-headlines?country=${code}&category=health&apiKey=9df0c5caa2914c5ab248ab43b047bb43`,{},{
      'Content-Type':'aplication/json'
     })
     
     return from(request);
  }
  
  //Data de colombia
  getColombia(fecha: string) {
    let nativeCall =  this.nativeHttp.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/colombia`,{},{
    'Content-Type':'aplication/json'
    });
    return from(nativeCall)
    /*return this.http.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/colombia`)*/
  }

  //Data del mundo
  getGlobal(fecha: string) {
    let nativeCall =  this.nativeHttp.get(`https://api.covid19tracking.narrativa.com//api/${fecha}/country/*`,{},{
    'Conten-Type':'aplication/json'
    });
    return from(nativeCall)
  }

  getPaisesNews(){
    return this.http.get(`https://restcountries.eu/rest/v2/all`)
  }

  getScroll(){
    const obs$ = fromEvent<MouseEvent>(document,'click')
    return obs$;
  }

  getSexo(){
  let resp = this.nativeHttp.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`,{},{
      'Content-Type':'aplication/json'
    })
    return from(resp)
     /* return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)*/
  }

  
}

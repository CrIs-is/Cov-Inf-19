import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Platform, AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,private nativeHttp: HTTP, public _platform: Platform,public alerte: AlertController ) {
    //this.url = 'https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD';
    
  } 

  getNoticesCovidColombia(){
    return this.http.get<any>(`http://newsapi.org/v2/top-headlines?country=co&category=health&apiKey=9df0c5caa2914c5ab248ab43b047bb43`);
  }
  
  //Data de colombia
  getColombia(fecha: string) {
    let nativeCall =  this.nativeHttp.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/colombia`,{},{
    'Conten-Type':'aplication/json'
    });
    return from(nativeCall)
  }

  //Data del mundo
  getGlobal(fecha: string) {
    let nativeCall =  this.nativeHttp.get(`https://api.covid19tracking.narrativa.com//api/${fecha}/country/*`,{},{
    'Conten-Type':'aplication/json'
    });
    return from(nativeCall)
  }
  
  
}

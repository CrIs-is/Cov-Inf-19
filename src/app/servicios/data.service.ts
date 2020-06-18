import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Platform, AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { fromEvent, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,private nativeHttp: HTTP, public _platform: Platform,public alerte: AlertController ) {
    //this.url = 'https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD';
    
  } 

  getNoticesCovidColombia(){
    return this.http.get(`http://newsapi.org/v2/top-headlines?country=co&category=health&apiKey=9df0c5caa2914c5ab248ab43b047bb43`)
     .pipe(map((data: any)=>{
      return data.articles
     }))
  }
  
  //Data de colombia
  getColombia(fecha: string) {
    /*let nativeCall =  this.nativeHttp.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/colombia`,{},{
    'Content-Type':'aplication/json'
    });
    return from(nativeCall)*/
    return this.http.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/colombia`)
    .pipe(map((data: any)=>{
      return data['dates'][fecha]['countries']['Colombia']
    }))
  }

  //Data del mundo
  getGlobal(fecha: string) {
    return this.http.get(`https://api.covid19tracking.narrativa.com//api/${fecha}/country/*`)
    .pipe(map((data)=>{
      return data['total']
    }))
  }

  getPaisesNews(){
    return this.http.get(`https://restcountries.eu/rest/v2/all`)
  }

  getScroll(){
    const obs$ = fromEvent<MouseEvent>(document,'click')
    return obs$;
  }

  getSexo(){
  return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)
     /*return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)*/
     .pipe(map((data: any)=>{
       return data.meta.view.columns[15].cachedContents.top
     }))
  }

  getAge(){
    return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)
       /*return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)*/
       .pipe(map((data: any)=>{
         return data.data
       })
       )
  }

  getAgeD(){
    return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)
       /*return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)*/
       .pipe(map((data: any)=>{
         return data.data
       })
       )
  }

  getMes(fecha : string){
   /* const marzo = this.nativeHttp.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/colombia`,{},{
      'Content-Type':'aplication/json'
    });*/
    return this.http.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/colombia`)
    .pipe(
      map((data)=>{
        return data['dates'][fecha]['countries']['Colombia']
      })
    )
  }
  
  getLocationIp(){
    let res = this.nativeHttp.get(`http://ip-api.com/json`,{},{
      'Content-Type':'Aplication/json'
    })
    return from(res);
  }

  getAtencion(){
    return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)
    .pipe(map((data:any)=>{
      return data.meta.view.columns[13].cachedContents.top
    }))
  }

  getEstado(){
    return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)
    .pipe(map((data:any)=>{
      return data.meta.view.columns[17].cachedContents.top
    }))
  }
}

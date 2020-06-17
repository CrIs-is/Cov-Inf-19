import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MuertesService {

  constructor(private http: HttpClient) { }

  getAllRegions(fecha: string) {
    return this.http.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/colombia`)
    .pipe(map((data: any)=>{
      return data['dates'][fecha]['countries']['Colombia'].regions
    }))
  }

  getDeathsBySex(){
    return this.http.get(`https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json?accessType=DOWNLOAD`)
       .pipe(map((data: any)=>{
         return data.data
       }),filter((data)=>{
         return data;
       })
    );
  }
}

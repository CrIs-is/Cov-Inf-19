import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Pais } from '../models/pais.interface';

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

  getAllPaises(fecha: string){
    return this.http.get(`https://api.covid19tracking.narrativa.com/api/${fecha}`).pipe(
      map(response =>{
        return response['dates'][fecha]['countries']
    }))
  }

  getCountry(fecha: string,id: string){
    let nombre = ''
    return this.http.get(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/${id}`).pipe(
      map((res:any): Pais => {
        return res['dates'][fecha]['countries'][id.charAt(0).toUpperCase() + id.slice(1)]
      })
    )
  }
}

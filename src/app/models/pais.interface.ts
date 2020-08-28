import { Departamento } from './departamento.interface';
export interface Pais{
    date:string,
    id: string,
    name: string,
    today_confirmed: number,
    today_deaths: number,
    today_recovered: number,

    today_new_confirmed: number,
    today_new_recovered:number,
    today_new_deaths:number,

    yesterday_confirmed:number,
    yesterday_deaths:number,
    yesterday_recovered:number,
    regions: Departamento[],

    source?:string
   
    
    
}
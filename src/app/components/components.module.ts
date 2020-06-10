import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { GraficasComponent } from './graficas/graficas.component';



@NgModule({
  declarations: [BarChartComponent,LineChartComponent,PieChartComponent, GraficasComponent ],
  imports: [
    CommonModule
  ],
  exports:[
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    GraficasComponent
  ]
})
export class ComponentsModule { }

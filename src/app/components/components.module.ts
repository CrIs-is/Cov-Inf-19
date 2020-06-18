import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { GraficasComponent } from './graficas/graficas.component';
import { HorizontalChartComponent } from './horizontal-chart/horizontal-chart.component';
import { PolarChartComponent } from './polar-chart/polar-chart.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@NgModule({
  declarations: [BarChartComponent,
    LineChartComponent,PieChartComponent,
     GraficasComponent,
     HorizontalChartComponent,
    PolarChartComponent ],
  imports: [
    CommonModule,
    IonicModule,
    //IonicRouteStrategy
  ],
  exports:[
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    GraficasComponent,
    HorizontalChartComponent,
    PolarChartComponent
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//servicios
import { HttpClientModule} from '@angular/common/http';
import { DataService } from './servicios/data.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faCoffee} from  '@fortawesome/free-solid-svg-icons';

import { ModalPage } from './components/modal/modal.page';
import { FindDepPipe } from './pipes/find-dep.pipe';

//plugins
import { HTTP } from '@ionic-native/http/ngx';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { ParallaxHeaderDirective } from './directives/parallax-header.directive';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

library.add(faCoffee)

@NgModule({
  declarations: [AppComponent,ModalPage, FindDepPipe,  ParallaxHeaderDirective],
  entryComponents: [ModalPage],
  imports: [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule, 
     HttpClientModule,
     FontAwesomeModule,
     IonicHeaderParallaxModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    ScreenOrientation,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

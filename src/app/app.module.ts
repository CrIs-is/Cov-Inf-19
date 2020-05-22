import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataService } from './servicios/data.service';
import { PopoverPage } from './components/popover/popover.page';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faCoffee} from  '@fortawesome/free-solid-svg-icons';
import { HTTP } from '@ionic-native/http/ngx';
import { ModalPage } from './components/modal/modal.page';
import { FindDepPipe } from './pipes/find-dep.pipe';


import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { ParallaxHeaderDirective } from './directives/parallax-header.directive';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
library.add(faCoffee)

@NgModule({
  declarations: [AppComponent,PopoverPage,ModalPage, FindDepPipe,  ParallaxHeaderDirective],
  entryComponents: [PopoverPage,ModalPage],
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColombiaPageRoutingModule } from './colombia-routing.module';
import { ColombiaPage } from './colombia.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColombiaPageRoutingModule
  ],
  declarations: [ColombiaPage]
})
export class ColombiaPageModule {}

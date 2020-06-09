import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UltimasCifrasPageRoutingModule } from './ultimas-cifras-routing.module';

import { UltimasCifrasPage } from './ultimas-cifras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UltimasCifrasPageRoutingModule
  ],
  declarations: [UltimasCifrasPage]
})
export class UltimasCifrasPageModule {}

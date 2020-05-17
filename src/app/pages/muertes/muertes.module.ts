import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuertesPageRoutingModule } from './muertes-routing.module';

import { MuertesPage } from './muertes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuertesPageRoutingModule
  ],
  declarations: [MuertesPage]
})
export class MuertesPageModule {}

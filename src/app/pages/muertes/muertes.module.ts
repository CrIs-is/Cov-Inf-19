import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuertesPageRoutingModule } from './muertes-routing.module';

import { MuertesPage } from './muertes.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuertesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MuertesPage]
})
export class MuertesPageModule {}

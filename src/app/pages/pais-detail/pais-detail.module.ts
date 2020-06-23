import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaisDetailPageRoutingModule } from './pais-detail-routing.module';

import { PaisDetailPage } from './pais-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaisDetailPageRoutingModule
  ],
  declarations: [PaisDetailPage]
})
export class PaisDetailPageModule {}

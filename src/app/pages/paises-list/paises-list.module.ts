import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaisesListPageRoutingModule } from './paises-list-routing.module';

import { PaisesListPage } from './paises-list.page';
import { pipeModule } from '../../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaisesListPageRoutingModule,
    pipeModule
  ],
  declarations: [PaisesListPage]
})
export class PaisesListPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperadosPageRoutingModule } from './recuperados-routing.module';

import { RecuperadosPage } from './recuperados.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RecuperadosPage]
})
export class RecuperadosPageModule {}

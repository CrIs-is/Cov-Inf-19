import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CasosPageRoutingModule } from './casos-routing.module';
import { CasosPage } from './casos.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CasosPage]
})
export class CasosPageModule {}

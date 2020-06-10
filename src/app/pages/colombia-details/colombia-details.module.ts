import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ColombiaDetailsPageRoutingModule } from './colombia-details-routing.module';
import { ColombiaDetailsPage } from './colombia-details.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColombiaDetailsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ColombiaDetailsPage]
})
export class ColombiaDetailsPageModule {}

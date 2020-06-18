import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanetaPageRoutingModule } from './planeta-routing.module';

import { PlanetaPage } from './planeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanetaPageRoutingModule
  ],
  declarations: [PlanetaPage]
})
export class PlanetaPageModule {}

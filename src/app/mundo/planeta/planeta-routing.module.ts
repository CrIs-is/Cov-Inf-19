import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetaPage } from './planeta.page';

const routes: Routes = [
  {
    path: '',
    component: PlanetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanetaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UltimasCifrasPage } from './ultimas-cifras.page';

const routes: Routes = [
  {
    path: '',
    component: UltimasCifrasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UltimasCifrasPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaisDetailPage } from './pais-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PaisDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaisDetailPageRoutingModule {}

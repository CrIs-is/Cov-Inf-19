import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuertesPage } from './muertes.page';

const routes: Routes = [
  {
    path: '',
    component: MuertesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuertesPageRoutingModule {}

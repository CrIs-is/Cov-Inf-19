import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasosPage } from './casos.page';

const routes: Routes = [
  {
    path: '',
    component: CasosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasosPageRoutingModule {}

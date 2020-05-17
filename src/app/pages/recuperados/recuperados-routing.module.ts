import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperadosPage } from './recuperados.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperadosPageRoutingModule {}

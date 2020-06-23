import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaisesListPage } from './paises-list.page';

const routes: Routes = [
  {
    path: '',
    component: PaisesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaisesListPageRoutingModule {}

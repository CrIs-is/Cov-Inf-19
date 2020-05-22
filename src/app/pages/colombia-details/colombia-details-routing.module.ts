import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColombiaDetailsPage } from './colombia-details.page';

const routes: Routes = [
  {
    path: '',
    component: ColombiaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColombiaDetailsPageRoutingModule {}

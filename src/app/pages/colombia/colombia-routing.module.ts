import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColombiaPage } from './colombia.page';

const routes: Routes = [
  {
    path: '',
    component: ColombiaPage,
    children: [
      {
        path: 'detalles',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../colombia-details/colombia-details.module').then(m => m.ColombiaDetailsPageModule)
          }
        ]
      },
      {
        path: 'casos',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../casos/casos.module').then(m => m.CasosPageModule)
          }
        ]
      },
      {
        path: 'muertes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../muertes/muertes.module').then(m => m.MuertesPageModule)
          }
        ]
      },
      {
        path: 'recuperados',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../recuperados/recuperados.module').then(m => m.RecuperadosPageModule)
          }
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColombiaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'colombia',
    loadChildren: () => import('./pages/colombia/colombia.module').then( m => m.ColombiaPageModule)
  },
  {
    path: 'casos',
    loadChildren: () => import('./pages/casos/casos.module').then( m => m.CasosPageModule)
  },
  {
    path: 'muertes',
    loadChildren: () => import('./pages/muertes/muertes.module').then( m => m.MuertesPageModule)
  },
  {
    path: 'recuperados',
    loadChildren: () => import('./pages/recuperados/recuperados.module').then( m => m.RecuperadosPageModule)
  },  
  {
    path: 'modal',
    loadChildren: () => import('./components/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'departamento',
    loadChildren: () => import('./pages/departamento/departamento.module').then( m => m.DepartamentoPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  
  {
    path: 'colombia-details',
    loadChildren: () => import('./pages/colombia-details/colombia-details.module').then( m => m.ColombiaDetailsPageModule)
  },
  {
    path: 'ultimas-cifras',
    loadChildren: () => import('./pages/ultimas-cifras/ultimas-cifras.module').then( m => m.UltimasCifrasPageModule)
  },
  {
    path: 'planeta',
    loadChildren: () => import('./mundo/planeta/planeta.module').then( m => m.PlanetaPageModule)
  },
  {
    path: 'ubicacion/:region',
    loadChildren: () => import('./ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  {
    path: 'paises-list',
    loadChildren: () => import('./pages/paises-list/paises-list.module').then( m => m.PaisesListPageModule)
  },
  {
    path: 'pais-detail/:pais',
    loadChildren: () => import('./pages/pais-detail/pais-detail.module').then( m => m.PaisDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

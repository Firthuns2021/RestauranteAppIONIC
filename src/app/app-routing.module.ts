import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'restaurante-detail/:id',
    loadChildren: () => import('./pages/restaurante-detail/restaurante-detail.module').then( m => m.RestauranteDetailPageModule)
  },
  {
    path: 'search/:keyword',
    loadChildren: () => import('./pages/restaurante-list/restaurante-list.module').then( m => m.RestauranteListPageModule)
  },
  {
    path: '',
    redirectTo: 'restaurante-list',
    pathMatch: 'full'
  },
  {
    path: 'restaurante-list',
    loadChildren: () => import('./pages/restaurante-list/restaurante-list.module').then( m => m.RestauranteListPageModule)
  },
  {
    path: 'cat/:categoria',
    loadChildren: () => import('./pages/restaurante-list/restaurante-list.module').then( m => m.RestauranteListPageModule)
  },
  {
    path: 'comentarios-rest',
    loadChildren: () => import('./pages/comentarios-rest/comentarios-rest.module').then( m => m.ComentariosRestPageModule)
  },
  {
    path: 'cart-control',
    loadChildren: () => import('./pages/cart-control/cart-control.module').then( m => m.CartControlPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: '**',
    redirectTo: 'restaurante-list'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

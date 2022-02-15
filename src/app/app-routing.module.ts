import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {UsuarioGuard} from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'restaurante-detail/:id',
    canActivate: [UsuarioGuard],
    loadChildren: () =>
      import('./pages/restaurante-detail/restaurante-detail.module').then(
        m => m.RestauranteDetailPageModule)
  },,
  {
    path: 'search/:keyword',
    canActivate: [UsuarioGuard],
    loadChildren: () =>
      import('./pages/restaurante-list/restaurante-list.module').then( m
        => m.RestauranteListPageModule)
  },,
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'restaurante-list',
    canActivate: [UsuarioGuard],
    loadChildren: () =>
      import('./pages/restaurante-list/restaurante-list.module').then( m
        => m.RestauranteListPageModule)
  },,
  {
    path: 'cat/:categoria',
    canActivate: [UsuarioGuard],
    loadChildren: () =>
      import('./pages/restaurante-list/restaurante-list.module').then( m
        => m.RestauranteListPageModule)
  },,
  {
    path: 'comentarios-rest',
    loadChildren: () => import('./pages/comentarios-rest/comentarios-rest.module').then( m => m.ComentariosRestPageModule)
  },
  {
    path: 'cart-control',
    canActivate: [UsuarioGuard],
    loadChildren: () =>
      import('./pages/cart-control/cart-control.module').then( m =>
        m.CartControlPageModule)
  },
  {
    path: 'checkout',
    canActivate: [UsuarioGuard],
    loadChildren: () =>
      import('./pages/checkout/checkout.module').then( m =>
        m.CheckoutPageModule)
  },
  // { path: 'home', canActivate: [UsuarioGuard], loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)  },

  {
    path: '**',
    redirectTo: 'restaurante-list'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }

];

@NgModule({
  imports: [   RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })  ],
  exports: [RouterModule]
})
export class AppRoutingModule{ }

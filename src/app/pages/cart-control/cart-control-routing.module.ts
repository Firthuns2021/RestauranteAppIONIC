import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartControlPage } from './cart-control.page';

const routes: Routes = [
  {
    path: '',
    component: CartControlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartControlPageRoutingModule {}

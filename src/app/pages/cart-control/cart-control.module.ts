import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartControlPageRoutingModule } from './cart-control-routing.module';

import { CartControlPage } from './cart-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartControlPageRoutingModule
  ],
  declarations: [CartControlPage]
})
export class CartControlPageModule {}

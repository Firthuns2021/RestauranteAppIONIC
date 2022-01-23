import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestauranteDetailPageRoutingModule } from './restaurante-detail-routing.module';

import { RestauranteDetailPage } from './restaurante-detail.page';
import {ComentariosRestPage} from "../comentarios-rest/comentarios-rest.page";
import {ComentariosRestPageModule} from "../comentarios-rest/comentarios-rest.module";
import {CartStatusComponent} from "../../components/cart-status/cart-status.component";

@NgModule({
  entryComponents: [
    ComentariosRestPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestauranteDetailPageRoutingModule,
    ComentariosRestPageModule
  ],
    declarations: [RestauranteDetailPage, CartStatusComponent]
})
export class RestauranteDetailPageModule {}

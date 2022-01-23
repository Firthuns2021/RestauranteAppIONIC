import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestauranteListPageRoutingModule } from './restaurante-list-routing.module';

import { RestauranteListPage } from './restaurante-list.page';
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestauranteListPageRoutingModule
  ],
    declarations: [RestauranteListPage, SearchBarComponent]
})
export class RestauranteListPageModule {}

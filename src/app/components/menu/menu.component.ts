import { Component, OnInit } from '@angular/core';
import {RestauranteService} from "../../services/restaurante.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  categorias: string[] = [];
  constructor(private restauranteService: RestauranteService) { }

  ngOnInit() {
    this.listCategorias();
  }

  listCategorias() {
    this.restauranteService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    );
  }
}

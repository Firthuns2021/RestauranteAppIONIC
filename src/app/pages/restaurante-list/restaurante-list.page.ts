import { Component, OnInit } from '@angular/core';
import {Restaurante} from '../../common/restaurante';
import {RestauranteService} from '../../services/restaurante.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-restaurante-list',
  templateUrl: './restaurante-list.page.html',
  styleUrls: ['./restaurante-list.page.scss'],
})
export class RestauranteListPage implements OnInit {

  // saco el dia actual de la semana
  diaActual = new Date().getDay();

  // creamos el array donde guardaremos los restaurantes
  // que traigamos de la API
  restaurantes: Restaurante[] = [];
  categoria = '';
  // Creamos una variable para modo búsqueda
  searchMode = false;

  // inyectamos el servicio para poder utilizarlo
  constructor(
    private restauranteService: RestauranteService,
    private activatedRoute: ActivatedRoute
  ) { }

  // En el ngOnInit es donde vamos a poner las funciones que
  // queremos ejecutar cuando se inicie nuestro componente
  // En nuestro caso queremos leer los restaurantes
  ngOnInit() {
    this.listRestaurantes();
  }

  // Definimos la función que carga los restaurantes del servicio
  listRestaurantes() {

    // comprobamos si la url tiene el parámetro keyword y por tanto
    // estamos en modo búsqueda
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    // si tiene el parámetro entonces gestionamos la búsqueda
    if (this.searchMode) {
      this.handleSearchRestaurantes();
    }
    // si no, entonces mostraremos los restaurantes de manera normal
    else {
      this.handleRestaurantes();
    }
  }

  private handleRestaurantes() {
    // Si tenemos el parámetro categoria en la URL ...
    if (this.activatedRoute.snapshot.paramMap.has('categoria')) {
      this.categoria = this.activatedRoute.snapshot.paramMap.get('categoria');
      this.restauranteService.getRestauranteCat(this.categoria).subscribe(
        data => {
          this.restaurantes = data;
        }
      );
    }else {
      this.restauranteService.getRestauranteList().subscribe(
        // recogemos la respuesta del servidor en una variable llamada data
        data => {
          // guardamos la respuesta en nuestro array de restaurantes
          this.restaurantes = data;
        }
      );
    }
  }

  // manejador de búsqueda de restaurantes
  private handleSearchRestaurantes() {
    const theKeyword = this.activatedRoute.snapshot.paramMap.get('keyword');

    // Una vez tengo el parámetro, busco los restaurantes usando la palabra
    if (theKeyword) {
      this.restauranteService.searchRestaurantes(theKeyword).subscribe(
        // recogemos la respuesta en una variable data
        data => {
          // guardamos en nuestra lista de restaurantes la que nos devuelve la API
          this.restaurantes = data;
        }
      );
    }
  }
}

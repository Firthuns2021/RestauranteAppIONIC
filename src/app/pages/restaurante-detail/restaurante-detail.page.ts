import { Component, OnInit } from '@angular/core';
import {Restaurante} from '../../common/restaurante';
import {RestauranteService} from '../../services/restaurante.service';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {ComentariosRestPage} from '../comentarios-rest/comentarios-rest.page';
import {Plato} from '../../common/plato';
import {CartService} from '../../services/cart.service';
import {PlatoPedido} from '../../common/plato-pedido';
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-restaurante-detail',
  templateUrl: './restaurante-detail.page.html',
  styleUrls: ['./restaurante-detail.page.scss'],
})
export class RestauranteDetailPage implements OnInit {

  media = 0.0;
  restaurante: Restaurante = new Restaurante();
  constructor(private restauranteService: RestauranteService,
              private activatedRoute: ActivatedRoute,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private cartService: CartService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(() => {
      this.handleRestaurante();
    });
  }

  handleRestaurante() {
    const restauranteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.restauranteService.getRestaurante(restauranteId).subscribe(
      data => {
        // Guardamos la información del restaurante en nuestro restaurante
        this.restaurante = data;
        this.calcularMedia();
      }
    );
  }

  async abrirComentarios() {
    const modal = await this.modalCtrl.create({
      component: ComentariosRestPage,
      componentProps: {
        rest: this.restaurante,
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.restaurante.comentarios.push(data);
      this.restauranteService.updateRestaurante(this.restaurante)
        .subscribe(() => {
          this.calcularMedia();
        });
    }
  }

  async abrirHorarios() {
    const horarios = [];
    const dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    this.restaurante.horario.forEach((h) => {
      horarios.push({
        text: dias[h.dia-1] + ': ' + h.apertura + ':00 - ' + h.cierre +
          ':00'
      });
    });
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Horarios',
      buttons: horarios
    });
    await actionSheet.present();
  }

  calcularMedia() {
    // Calculamos la media de los comentarios
    let puntuaciones = 0;
    // Recorremos todos los comentarios y sumamos las puntuaciones
    this.restaurante.comentarios.forEach((coment) => {
      puntuaciones += coment.puntuacion;
    });
    // Sacamos la media dividiendo todas las puntuaciones entre
    // el número de comentarios
    this.media = puntuaciones / this.restaurante.comentarios.length;
  }

  addToCart(elPlatoPedido: PlatoPedido): void {
    let extras = 0;
    elPlatoPedido.extras.forEach(
      (extra) => {
      extras += extra.coste;
    });
    elPlatoPedido.precioTotal =
      elPlatoPedido.plato.precioBase + extras;
    this.cartService.addToCartRest(elPlatoPedido, this.restaurante);
  }

  async mostrarExtras(plato: Plato) {
    // Creamos un platoPedido con el plato que seleccione
    // el usuario
    const elPlatoPedido = new PlatoPedido(plato);
    const extras = [];
    // creamos un array de los elementos del alert
    // para sacar los extras
    plato.extra.forEach((extra) => {
      extras.push({
        name: extra.nombre,
        type: 'checkbox',
        label: extra.nombre+ ':  ' + formatCurrency(
          extra.coste,
          'en',
          '€', 'EUR'),
        value: extra
      });
    });
    const alert = await this.alertCtrl.create({
      header: `${plato.nombre} extras`,
      inputs: extras,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: (valor) => {
            valor.forEach((data) => {
              elPlatoPedido.extras.push(data);
            });
            this.addToCart(elPlatoPedido);
          }
        }
      ]
    });
    await alert.present();
  }
}

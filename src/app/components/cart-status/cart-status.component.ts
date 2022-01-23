import { Component, OnInit } from '@angular/core';
import {PlatoPedido} from '../../common/plato-pedido';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss'],
})
export class CartStatusComponent implements OnInit {

  cartItems: PlatoPedido[] = [];
  totalPrice = 0.00;
  totalQuantity = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateCartStatus();
  }

  updateCartStatus(): void {
      // nos suscribimos al carrito para que nos diga
    // cuando se actualice
    this.cartService.myCart.subscribe(
      (data: any) => this.cartItems = data
    );
      // nos suscribimos al precio total para que nos diga
    // cuando se actualice
    this.cartService.totalPrice.subscribe(
      (data: any) => {
        this.totalPrice = data;
      }
    );
      // nos suscribimos a la cantidad
    // total para que nos diga
    // cuando se actualice
    this.cartService.totalQuantity.subscribe(
      (data: any) => this.totalQuantity = data
    );



  }
}

import { Component, OnInit } from '@angular/core';
import {PlatoPedido} from "../../common/plato-pedido";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-control',
  templateUrl: './cart-control.page.html',
  styleUrls: ['./cart-control.page.scss'],
})
export class CartControlPage implements OnInit {

  cartItems: PlatoPedido[] = [];
  totalPrice = 0.00;
  totalQuantity = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateCartStatus();
  }

  updateCartStatus(): void {
    // vamos a suscribirnos al carrito
    this.cartService.myCart.subscribe(
      (data: any) => this.cartItems = data
    );

    // nos suscribimos al precio total
    this.cartService.totalPrice.subscribe(
      (data: any) => this.totalPrice = data
    );

    // nos suscribimos a la cantidad total
    this.cartService.totalQuantity.subscribe(
      (data: any) => this.totalQuantity = data
    );
  }

  reducirCantidad(platoPedido: PlatoPedido) {
    this.cartService.decrementQuantity(platoPedido);
  }


  incrementarCantidad(platoPedido: PlatoPedido): void {
    this.cartService.addToCart(platoPedido);
  }

  borrarPlato(platoPedido: PlatoPedido): void {
    this.cartService.remove(platoPedido);
  }
}

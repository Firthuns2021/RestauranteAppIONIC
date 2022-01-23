import {Injectable, NgZone} from '@angular/core';
import {PlatoPedido} from "../common/plato-pedido";
import {Restaurante} from "../common/restaurante";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: PlatoPedido[] = [];
  restauranteOn: Restaurante;
// Vamos a crear un elemento para enviar un observable
// a los suscriptores.
  // Es de tipo BehaviorSubject para controlar
  // anteriores valores
  myCart: Subject<PlatoPedido[]> =
    new BehaviorSubject<PlatoPedido[]>([]);
  totalPrice: Subject<number> =
    new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> =
    new BehaviorSubject<number>(0);
  constructor(private zone: NgZone) { }

  addToCartRest(
    theCartItem: PlatoPedido, rest: Restaurante): void {
    // actualizamos el restaurante si no hay platos en el carrito
    if (this.cartItems.length === 0) {
      this.restauranteOn = rest;
    }
    else{
      // si es otro restaurante, reseteamos el carrito
      // antes de añadir el plato
      // eslint-disable-next-line no-underscore-dangle
      if (rest._id !== this.restauranteOn._id) {
        this.cartItems = [];
        this.totalQuantity.next(0);
        this.totalPrice.next(0);
        this.restauranteOn = rest;
      }
    }
    this.addToCart(theCartItem);
  }

  addToCart(theCartItem: PlatoPedido): void {
    // verificamos si el plato está ya en el carro
    let alreadyExistInCart = false;
    let existingCartItem: any;

    if (this.cartItems.length > 0 ) {
      // Si hay elementos en el carrito,
      // buscamos si existe el plato basandonos en el id
      // para ello utilizaremos el método find
      // que busca el primer elemento en un array
      // que valide una condición
      existingCartItem = this.cartItems.find(
        tempCartItem => ((
          tempCartItem.plato._id === theCartItem.plato._id)
        && (tempCartItem.extras === theCartItem.extras)));
    }
    // comporbamos si hemos encontrado el item
    alreadyExistInCart = (existingCartItem !== undefined);

    if (alreadyExistInCart) {
      // si existe incrementamos la cantidad
      existingCartItem.cantidad++;
    }
    else {
      // si no, lo añadimos al array
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (const currentCartItem of this.cartItems) {
      totalPriceValue +=
        currentCartItem.cantidad * currentCartItem.precioTotal;
      totalQuantityValue += currentCartItem.cantidad;
    }
    // publicamos los nuevos valores en nuestros observables
    // Todos nuestros suscriptores recibirán la nueva info
    this.zone.run(() => {
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);
      this.myCart.next(this.cartItems);
    });

  }

  decrementQuantity(platoPedido: PlatoPedido):void {
    platoPedido.cantidad--;
    // Al reducir la cantidad en 1, tengo que comprobar
    // si la cantidad ahora es 0
    if(platoPedido.cantidad === 0) {
      this.remove(platoPedido);
    } else {
      this.computeCartTotals();
    }
  }

  remove(platoPedido: PlatoPedido): void {
    // buscamos el índice del item en el array
    const itemIndex =
      this.cartItems.findIndex(
        tempCartItem =>
          // eslint-disable-next-line no-underscore-dangle
          tempCartItem.plato._id === platoPedido.plato._id);
    // si lo encontramos, borramos el item del array
    if (itemIndex > -1) {
      // a splice le damos el indice y el numero de elementos
      // que queremos borrar
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}

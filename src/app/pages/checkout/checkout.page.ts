import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {RestauranteFormService} from '../../services/restaurante-form.service';
import {Pedido} from '../../common/pedido';
import {Router} from '@angular/router';
import {CheckoutService} from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  checkoutFormGroup: FormGroup = this.formBuilder.group({
    cliente: this.formBuilder.group({
      nombre: [''],
      apellidos: [''],
      dni: [''],
      telefono: [''],
      email: ['']
    }),
    shippingAddress: this.formBuilder.group({
      tipoVia: [''],
      calle: [''],
      numero: [''],
      ciudad: [''],
      provincia: [''],
      cp: [''],
      pais: ['']
    }),
    billingAddress: this.formBuilder.group({
      tipoVia: [''],
      calle: [''],
      numero: [''],
      ciudad: [''],
      provincia: [''],
      cp: [''],
      pais: ['']
    }),
    creditCard: this.formBuilder.group({
      cardType: [''],
      nameOnCard: [''],
      cardNumber: [''],
      securityCode: [''],
      expirationMonth: [''],
      expirationYear: ['']
    }),
  });

  totalPrice = 0.00;
  totalQuantity = 0;

  // Variables de meses y años
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  // variables de paises
  paises: {country: string}[] = [];
  shippingAddressProvincias: string[] = [];
  billingAddressProvincias: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private restauranteFormService: RestauranteFormService,
              private router: Router) { }

  ngOnInit() {
    this.updateCartStatus();
    this.populateMonthsAndYears();
    this.populateCountries();
    const startMonth: number = new Date().getMonth() + 1;
    this.restauranteFormService.getCreditCardMonths(startMonth).subscribe(
      (data: any) => {
        this.creditCardMonths = data;
      }
    );
// poblamos los años de la tarjeta de crédito
    this.restauranteFormService.getCreditCardYears().subscribe(
      (data: any) => {
        this.creditCardYears = data;
      }
    );
// poblamos los paises
    this.restauranteFormService.getPaises().subscribe(
      data => {
        this.paises = data;
      }
    );
  }

  onSubmit(): void {
    // console.log(this.checkoutFormGroup.getRawValue().cliente);
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    // crear pedido
    const pedido = new Pedido();
    pedido.precioTotal = this.totalPrice;
    // coger los items del carrito
    const cartItemsList = this.cartService.cartItems;
// create ordereITems from cartItems
    pedido.platosPedido = cartItemsList;

// rellenar compra - cliente
    pedido.cliente = this.checkoutFormGroup.controls.cliente.value;
// rellenar restaurante
    pedido.restaurante = this.cartService.restauranteOn;
// rellenar compra - direcciones
// Entrega
    pedido.direccionEntrega = this.checkoutFormGroup.controls.shippingAddress.value;
    const provinciaEntrega =
      JSON.parse(JSON.stringify(pedido.direccionEntrega.provincia));
    const paisEntrega = JSON.parse(JSON.stringify(pedido.direccionEntrega.pais));
    pedido.direccionEntrega.provincia = provinciaEntrega;
    pedido.direccionEntrega.pais = paisEntrega;
// Factura
    pedido.direccionFactura = this.checkoutFormGroup.controls.billingAddress.value;
    const provinciaFactura =
      JSON.parse(JSON.stringify(pedido.direccionFactura.provincia));
    const paisFactura = JSON.parse(JSON.stringify(pedido.direccionFactura.pais));
    pedido.direccionFactura.provincia = provinciaFactura;
    pedido.direccionFactura.pais = paisFactura;
// llamar a la API REST mediante el Servicio
    this.checkoutService.realizarCompra(pedido).subscribe(
      {
        next: response => {
          alert(`La orden ha sido recibida.`);
// reseteamos el carrito
          this.resetCart();
        },
        error: err => {
          alert(`Ha habido un error: ${err.message}`);
        }
      }
    );
  }
  resetCart(): void {
// resetear los datos del carro, el precio total y la cantidad de elementos
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
// resetear el formulario
    this.checkoutFormGroup.reset();
// navegamos a la página principal
    this.router.navigateByUrl('/');
  }

  copyShippingToBilling(event: any): void{
    // si está marcada la opción de copiar, copiamos los valores de shipping a billing
    if(event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value);

      this.billingAddressProvincias = this.shippingAddressProvincias;
    }
    // si no, borramos el grupo del billing
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressProvincias = [];
    }

  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth = 1;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }
    this.restauranteFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
  }

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const paisname = formGroup?.value.pais;

    this.restauranteFormService.getStates(paisname).subscribe(
      data => {
        if( formGroupName === 'shippingAddress'){
          this.shippingAddressProvincias = data;
        }else {
          this.billingAddressProvincias = data;
        }
      }
    );
  }

  private updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      (data: any) => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      (data: any) => this.totalQuantity = data
    );
  }

  private populateMonthsAndYears() {
    const startMonth: number = new Date().getMonth() + 1;
    this.restauranteFormService.getCreditCardMonths(startMonth).subscribe(
      (data: any) => this.creditCardMonths = data
    );
    this.restauranteFormService.getCreditCardYears().subscribe(
      (data: any) => this.creditCardYears = data
    );
  }


  private populateCountries() {
    this.restauranteFormService.getCountries().subscribe(
      data =>  this.paises = data   );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getState(shippingAddress: string) {

  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  getProvincias(formGroupName: string): void{
// leemos el código para saber si es dirección de envío o de    facturación
    const formGroup = this.checkoutFormGroup.get(formGroupName);
// sacamos el código y el nombre del país y los almacenamos en    variables
    const paisName = formGroup?.value.pais;
    this.restauranteFormService.getStates(paisName).subscribe(
      (data: any) => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressProvincias = data;
        }
        else {
          this.billingAddressProvincias = data;
        }
// seleccionamos la primera provincia por defecto
// formGroup?.get('provincia')?.setValue(data[0]);
      }
    );
  }
}

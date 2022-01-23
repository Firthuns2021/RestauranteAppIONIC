import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {RestauranteFormService} from '../../services/restaurante-form.service';

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
  shippingAddressStates: string[]= [];
  billingAddressStates: string[]= [];

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private restauranteFormService: RestauranteFormService) { }

  ngOnInit() {
    this.updateCartStatus();
    this.populateMonthsAndYears();
    this.populateCountries();
  }

  onSubmit(): void {
    console.log(this.checkoutFormGroup.getRawValue().cliente);
  }

  copyShippingToBilling(event: any): void{
    // si está marcada la opción de copiar, copiamos los valores de shipping a billing
    if(event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;
    }
    // si no, borramos el grupo del billing
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
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
          this.shippingAddressStates = data;
        }else {
          this.billingAddressStates = data;
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

  getState(shippingAddress: string) {

  }
}

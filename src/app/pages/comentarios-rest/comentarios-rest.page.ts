import {Component, Input, OnInit} from '@angular/core';
import {Comentario} from "../../common/comentario";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-comentarios-rest',
  templateUrl: './comentarios-rest.page.html',
  styleUrls: ['./comentarios-rest.page.scss'],
})
export class ComentariosRestPage implements OnInit {

  @Input() rest;
  comentario: Comentario = new Comentario();
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  aceptar() {
    this.modalCtrl.dismiss(this.comentario);
  }
  salir() {
    this.modalCtrl.dismiss();
  }

}

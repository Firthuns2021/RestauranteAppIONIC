import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Avatar} from "../../common/avatar";
import {UsuarioService} from "../../services/usuario.service";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;
  avatars: Avatar[] = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];
  avatarSlide = {
    slidesPerView: 3.4
  };
  loginUser: FormGroup = this.formBuilder.group( {
    email: ['test@test.com'],
    password: ['123456']
  });

  registerUser: FormGroup = this.formBuilder.group( {
    email: [''],
    password: [''],
    nombre: [''],
    avatar: ['']
  });
  constructor(private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private navCtrl: NavController,
              private uiService: UiService) { }
  ngOnInit() {
    console.log(this.slides);
    this.slides.lockSwipes(true);

  }
  async login(fLogin: FormGroup) {
    if( fLogin.invalid) {return;}
    const valido = await
      this.usuarioService.login(fLogin.controls.email.value,
        fLogin.controls.password.value);
    if (valido) {
// navegar
      this.navCtrl.navigateRoot('/restaurante-list', {animated:
          true});
    } else {
// mostrar alerta de usuario y contraseña incorrectos
      this.uiService.alertaInformativa('Usuario y contraseña    incorrectos');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  async registro(fRegistro: FormGroup) {
    if (fRegistro.invalid) {return;}
    const valido = await
      this.usuarioService.registro(this.registerUser.getRawValue());
    if (valido) {
// navegar
      this.navCtrl.navigateRoot('/restaurante-list', {animated: true});
    } else {
// mostrar alerta de email repetido
      this.uiService.alertaInformativa('Ese correo electrónico ya existe');
    }
  }
  seleccionarAvatar(avatar: Avatar) {
    this.avatars.forEach( av => av.seleccionado = false );
    avatar.seleccionado = true;
    this.registerUser.controls.avatar.setValue(avatar.img);
  }
}

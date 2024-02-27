import { Component, HostListener } from '@angular/core';
import { BoxHeaderComponent } from '../../box-header/box-header.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, BoxHeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  maxVentana: boolean = false;
  loading: boolean = false;

  txtButton: string = 'Iniciar sesión';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}


  iniciarSesion() {
    if (this.email === '' || this.password === '') {
      alert('Debe de llenar los espacios requeridos.');
      return;
    }

    if (this.loading) {
      this.loading = false;
      this.txtButton = 'Iniciar sesión';
    } else {
      this.txtButton = 'Cancelar';
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.txtButton = 'Iniciar sesión';
        this.cookieService.set('email', this.email);
        this.router.navigate(['home']);
      }, 2000);
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    this.iniciarSesion();
  }

  cancelarLoader(): void {}

  cerrarLogin(): void {}

  maximizarVentana(): void {
    this.maxVentana = !this.maxVentana;
  }
}

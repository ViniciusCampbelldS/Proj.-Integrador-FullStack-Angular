import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  cpf = '';
  senha = '';

  erroLogin = false;
  exibirTelefoneTI = false;
  carregando = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  entrar(): void {
    if (this.carregando) {
      return;
    }

    this.erroLogin = false;
    this.carregando = true;

    const cpfSemFormatacao = this.cpf.replace(/\D/g, '');

    this.authService
      .login({
        email: cpfSemFormatacao,
        senha: this.senha,
      })
      .subscribe({
        next: (response: LoginResponse) => {
          const token = response.access_token;

          if (!token) {
            this.erroLogin = true;
            this.carregando = false;
            return;
          }

          this.authService.salvarToken(token);

          this.router
            .navigateByUrl('/')
            .catch(() => {
              this.erroLogin = true;
            })
            .finally(() => {
              this.carregando = false;
            });
        },
        error: () => {
          this.erroLogin = true;
          this.carregando = false;
        },
      });
  }

  mostrarTelefoneTI(): void {
    this.exibirTelefoneTI = !this.exibirTelefoneTI;
  }
}
import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  entrar(): void {
    this.erroLogin = false;

    const cpfSemFormatacao = this.cpf.replace(/\D/g, '');

    this.authService
      .login({
        cpf: cpfSemFormatacao,
        senha: this.senha,
      })
      .subscribe({
        next: (res) => {
          this.authService.salvarToken(res.access_token);

          this.router.navigateByUrl('/epi');
        },

        error: () => {
          this.erroLogin = true;
        },
      });
  }

  mostrarTelefoneTI(): void {
    this.exibirTelefoneTI = !this.exibirTelefoneTI;
  }
}
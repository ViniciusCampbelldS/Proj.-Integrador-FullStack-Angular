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

    const cpfTeste = '12312312312';
    const senhaTeste = '123';

    if (
      cpfSemFormatacao === cpfTeste &&
      this.senha === senhaTeste
    ) {
      this.authService.salvarToken('token-teste');

      this.router.navigateByUrl('/epi');
      return;
    }

    this.erroLogin = true;
  }

  mostrarTelefoneTI(): void {
    this.exibirTelefoneTI = !this.exibirTelefoneTI;
  }
}
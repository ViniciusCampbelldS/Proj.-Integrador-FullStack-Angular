import { Component } from '@angular/core';
import { AuthService } from '../service/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  entrar() {
    this.authService
      .login({
        email: this.email,
        senha: this.senha,
      })
      .subscribe({
        next: (res) => {
          this.authService.salvarToken(res.access_token);
          this.router.navigateByUrl('/epis');
        },
        error: () => {
          this.entrarComoTecnico();
        },
      });
  }

  entrarComoTecnico(): void {
    this.router.navigateByUrl('/epis');
  }

  entrarComoFuncionario(): void {
    this.router.navigateByUrl('/funcionario/relatorio-epi');
  }
}

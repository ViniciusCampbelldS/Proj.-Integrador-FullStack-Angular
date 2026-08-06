import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private readonly router: Router) {}

  enterAsAdmin(): void {
    this.router.navigateByUrl('/epis');
  }

  enterAsEmployee(): void {
    this.router.navigateByUrl('/funcionario/relatorio-epi');
  }
}

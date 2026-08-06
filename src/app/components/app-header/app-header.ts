import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  constructor(private readonly router: Router) {}

  get userInitials(): string {
    return this.isEmployeePage ? 'JP' : 'AM';
  }

  get userName(): string {
    return this.isEmployeePage ? 'Joao Pedro' : 'Arthur Moretti';
  }

  get userRole(): string {
    return this.isEmployeePage ? 'Funcionario' : 'Diretor';
  }

  private get isEmployeePage(): boolean {
    return this.router.url.includes('/funcionario');
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-funcionario-portal',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <section class="funcionario-portal container py-4">
      <h1>Portal do Funcionário</h1>
      <p>Área destinada aos relatórios e acompanhamento de EPIs.</p>
      <router-outlet></router-outlet>
    </section>
  `,
})
export class FuncionarioPortal {}

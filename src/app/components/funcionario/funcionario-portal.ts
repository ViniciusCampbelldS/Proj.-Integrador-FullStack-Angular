import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-funcionario-portal',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section class="funcionario-portal container py-4">
      <router-outlet></router-outlet>
    </section>
  `,
})
export class FuncionarioPortal {}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gerenciar-treinamento',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="treinamento-page container py-4">
      <div class="hero">
        <p class="eyebrow">Treinamentos</p>

        <h1>Gerenciar Treinamento</h1>

        <p>
          Área para acompanhar e cadastrar treinamentos de segurança.
        </p>
      </div>

      <div class="panel card p-4 mt-4">
        <p>
          Em breve, aqui será possível gerenciar treinamentos,
          atribuir sessões e acompanhar resultados.
        </p>
      </div>
    </section>
  `,
})
export class GerenciarTreinamento {}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-meus-treinamentos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="report-section">
      <h2>Meus Treinamentos</h2>
      <div class="report-card">
        <p>Acompanhe aqui os treinamentos concluídos, agendados e pendentes.</p>
      </div>
    </section>
  `,
})
export class MeusTreinamentos {}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbreTurmaTreinamento } from './abre-turma-treinamento/AbreTurmaTreinamento';
import { AlteraTreinamento } from './altera-treinamento/altera-treinamento';

type TreinamentoView =
  | 'presenca'
  | 'abrir-turma';

@Component({
  selector: 'app-gerenciar-treinamento',
  standalone: true,
  imports: [CommonModule, AlteraTreinamento, AbreTurmaTreinamento],
  template: `
    @if (activeView === 'presenca') {
      <app-altera-treinamento></app-altera-treinamento>
    }

    @if (activeView === 'abrir-turma') {
      <app-abre-treinamento></app-abre-treinamento>
    }
  `
})
export class GerenciarTreinamento implements OnInit {
  activeView: TreinamentoView = 'presenca';

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const view = this.route.snapshot.data['view'] as TreinamentoView | undefined;
    if (view === 'presenca' || view === 'abrir-turma') {
      this.activeView = view;
    }
  }
}

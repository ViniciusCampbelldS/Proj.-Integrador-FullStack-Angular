import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TurmaTreinamento {
  id: number;
  treinamento: string;
  data: string;
  horario: string;
  participantes: string[];
  documento: string;
  status: 'Agendada' | 'Pendente';
}

@Component({
  selector: 'app-abre-treinamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abre-turma-treinamento.html',
  styleUrl: './abre-turma-treinamento.scss'
})
export class AbreTurmaTreinamento {
  readonly funcionarios = ['Pedro Henrique', 'João da Silva', 'Carlos Oliveira', 'Fernanda Lima', 'Ana Costa'];

  treinamento = '';
  data = '';
  horario = '';
  funcionarioSelecionado = '';
  participantes: string[] = [];
  documento = '';
  mensagem = '';

  turmas: TurmaTreinamento[] = [
    {
      id: 1,
      treinamento: 'NR-35 - Trabalho em Altura',
      data: '2026-08-20',
      horario: '08:00',
      participantes: ['Pedro Henrique', 'Carlos Oliveira'],
      documento: 'lista-presenca-nr35.pdf',
      status: 'Agendada',
    },
  ];

  get podeCriar(): boolean {
    return Boolean(this.treinamento && this.data && this.horario && this.participantes.length > 0);
  }

  adicionarParticipante(): void {
    if (!this.funcionarioSelecionado || this.participantes.includes(this.funcionarioSelecionado)) {
      return;
    }

    this.participantes = [...this.participantes, this.funcionarioSelecionado];
    this.funcionarioSelecionado = '';
  }

  removerParticipante(nome: string): void {
    this.participantes = this.participantes.filter((participante) => participante !== nome);
  }

  onDocumentoSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.documento = input.files?.[0]?.name ?? '';
  }

  criarTurma(): void {
    if (!this.podeCriar) {
      const camposFaltantes = [
        !this.treinamento ? 'treinamento' : '',
        !this.data ? 'data' : '',
        !this.horario ? 'horario' : '',
        this.participantes.length === 0 ? 'ao menos um funcionario' : '',
      ].filter(Boolean);

      this.mensagem = 'Preencha: ' + camposFaltantes.join(', ') + '.';
      return;
    }

    this.turmas = [
      {
        id: Math.max(...this.turmas.map((turma) => turma.id), 0) + 1,
        treinamento: this.treinamento,
        data: this.data,
        horario: this.horario,
        participantes: [...this.participantes],
        documento: this.documento || 'Documento pendente',
        status: this.documento ? 'Agendada' : 'Pendente',
      },
      ...this.turmas,
    ];

    this.limpar();
    this.mensagem = 'Turma criada localmente no frontend.';
  }

  limpar(): void {
    this.treinamento = '';
    this.data = '';
    this.horario = '';
    this.funcionarioSelecionado = '';
    this.participantes = [];
    this.documento = '';
  }
}


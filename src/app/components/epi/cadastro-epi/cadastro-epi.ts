import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface EpiCadastro {
  id: number;
  nome: string;
  ca: string;
  lote: string;
  validade: string;
  quantidade: number;
  status: 'Em estoque' | 'Próximo do vencimento' | 'Vencido';
}

interface EpiForm {
  nome: string;
  ca: string;
  lote: string;
  validade: string;
  quantidade: number;
}

@Component({
  selector: 'app-cadastro-epi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-epi.html',
  styleUrl: './cadastro-epi.scss',
})
export class CadastroEpi {
  mensagem = '';

  form: EpiForm = this.criarFormVazio();

  epis: EpiCadastro[] = [
    {
      id: 1,
      nome: 'Capacete com viseira',
      ca: '101022',
      lote: 'LT-2026-08',
      validade: '2026-09-12',
      quantidade: 12,
      status: 'Próximo do vencimento',
    },
    {
      id: 2,
      nome: 'Luva anticorte Cut Oil Volk',
      ca: '34456',
      lote: 'LV-334',
      validade: '2026-11-30',
      quantidade: 32,
      status: 'Em estoque',
    },
  ];

  get podeSalvar(): boolean {
    return Boolean(
      this.form.nome.trim() &&
      this.form.ca.trim() &&
      this.form.lote.trim() &&
      this.form.validade &&
      this.form.quantidade > 0
    );
  }

  salvarEpi(): void {
    if (!this.podeSalvar) {
      this.mensagem = 'Preencha todos os campos obrigatórios antes de salvar.';
      return;
    }

    const novoEpi: EpiCadastro = {
      id: Math.max(...this.epis.map((epi) => epi.id), 0) + 1,
      nome: this.form.nome.trim(),
      ca: this.form.ca.trim(),
      lote: this.form.lote.trim(),
      validade: this.form.validade,
      quantidade: this.form.quantidade,
      status: this.statusPorValidade(this.form.validade),
    };

    this.epis = [novoEpi, ...this.epis];
    this.form = this.criarFormVazio();
    this.mensagem = 'EPI cadastrado localmente no frontend.';
  }

  limpar(): void {
    this.form = this.criarFormVazio();
    this.mensagem = '';
  }

  statusClass(status: EpiCadastro['status']): string {
    if (status === 'Vencido') {
      return 'status-expired';
    }

    if (status === 'Próximo do vencimento') {
      return 'status-warning';
    }

    return 'status-good';
  }

  private criarFormVazio(): EpiForm {
    return {
      nome: '',
      ca: '',
      lote: '',
      validade: '',
      quantidade: 1,
    };
  }

  private statusPorValidade(validade: string): EpiCadastro['status'] {
    const hoje = new Date();
    const dataValidade = new Date(`${validade}T00:00:00`);
    const limite = new Date(hoje);
    limite.setDate(limite.getDate() + 30);

    if (dataValidade < hoje) {
      return 'Vencido';
    }

    if (dataValidade <= limite) {
      return 'Próximo do vencimento';
    }

    return 'Em estoque';
  }
}

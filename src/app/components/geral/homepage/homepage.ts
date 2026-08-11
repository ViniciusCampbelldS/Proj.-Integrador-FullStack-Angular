import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NotificacaoService } from '../../../service/notificacao';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {

  dataHoje: string;

  constructor(
    private readonly notificacaoService: NotificacaoService,
  ) {
    this.dataHoje = this.formatarDataAtual();
  }

  get totalEpis(): number {
    return this.notificacaoService.totalEpis;
  }

  get episEmDia() {
    return this.notificacaoService.episEmDia;
  }

  get episProximos() {
    return this.notificacaoService.episProximos;
  }

  get episVencidos() {
    return this.notificacaoService.episVencidos;
  }

  get percentualValidos(): number {
    return this.notificacaoService.percentualValidos;
  }

  get totalPendencias(): number {
    return this.notificacaoService.totalPendencias;
  }

  get mensagemPrioridade(): string {
    return this.notificacaoService.mensagemPrioridade;
  }

  get episComNotificacao() {
    return this.notificacaoService.episComNotificacao;
  }

  estaVencido(epi: { vencimento: Date | string | null }): boolean {
    return this.notificacaoService.estaVencidoEpi(epi as never);
  }

  textoVencimento(epi: { vencimento: Date | string | null }): string {
    return this.notificacaoService.textoVencimento(epi as never);
  }

  private formatarDataAtual(): string {
    return this.notificacaoService.obterDataAtualFormatada();
  }

  // =====================================================
  // SAUDACAO
  // =====================================================

  get saudacao(): string {
    const hora = new Date().getHours();

    if (hora < 12) {
      return 'Bom dia';
    }

    if (hora < 18) {
      return 'Boa tarde';
    }

    return 'Boa noite';
  }
}
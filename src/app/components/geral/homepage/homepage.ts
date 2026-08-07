import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  EpiMonitorado,
  NotificacaoService,
} from '../../../service/notificacao';

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


  // =====================================================
  // TODOS OS EPIs
  // =====================================================

  get todosEpis(): EpiMonitorado[] {
    return this.notificacaoService.episMonitorados;
  }


  // =====================================================
  // TOTAL DE EPIs
  // =====================================================

  get totalEpis(): number {
    return this.todosEpis.length;
  }


  // =====================================================
  // EPIs COM NOTIFICACAO
  // =====================================================

  get episComNotificacao(): EpiMonitorado[] {
    return this.notificacaoService
      .obterEpisComNotificacao();
  }


  // =====================================================
  // EPIs VENCIDOS
  // =====================================================

  get episVencidos(): EpiMonitorado[] {
    return this.todosEpis.filter(
      (epi) =>
        this.notificacaoService
          .estaVencido(epi.vencimento)
    );
  }


  // =====================================================
  // EPIs PROXIMOS DO VENCIMENTO
  // =====================================================

  get episProximos(): EpiMonitorado[] {
    return this.todosEpis.filter(
      (epi) =>
        !this.notificacaoService
          .estaVencido(epi.vencimento) &&
        this.notificacaoService
          .deveAvisarEpi(epi.vencimento)
    );
  }


  // =====================================================
  // EPIs EM DIA
  // =====================================================

  get episEmDia(): EpiMonitorado[] {
    return this.todosEpis.filter(
      (epi) =>
        !this.notificacaoService
          .estaVencido(epi.vencimento) &&
        !this.notificacaoService
          .deveAvisarEpi(epi.vencimento)
    );
  }


  // =====================================================
  // TOTAL DE PENDENCIAS
  // =====================================================

  get totalPendencias(): number {
    return this.episComNotificacao.length;
  }


  // =====================================================
  // PERCENTUAL DE EPIs VALIDOS
  // =====================================================

  get percentualValidos(): number {
    if (this.totalEpis === 0) {
      return 100;
    }

    const validos =
      this.totalEpis -
      this.episVencidos.length;

    return Math.round(
      (validos / this.totalEpis) * 100
    );
  }


  // =====================================================
  // MENSAGEM DE PRIORIDADE
  // =====================================================

  get mensagemPrioridade(): string {

    if (this.episVencidos.length > 0) {

      if (this.episVencidos.length === 1) {
        return '1 EPI vencido requer ação imediata.';
      }

      return `${this.episVencidos.length} EPIs vencidos requerem ação imediata.`;
    }


    if (this.episProximos.length > 0) {

      if (this.episProximos.length === 1) {
        return '1 EPI está próximo do vencimento.';
      }

      return `${this.episProximos.length} EPIs estão próximos do vencimento.`;
    }


    return 'Nenhuma pendência crítica no momento.';
  }


  // =====================================================
  // VERIFICA SE O EPI ESTA VENCIDO
  // =====================================================

  estaVencido(
    epi: EpiMonitorado
  ): boolean {

    return this.notificacaoService
      .estaVencido(epi.vencimento);
  }


  // =====================================================
  // TEXTO DO VENCIMENTO
  // =====================================================

  textoVencimento(
    epi: EpiMonitorado
  ): string {

    const dias =
      this.notificacaoService
        .calcularDiasRestantes(
          epi.vencimento
        );


    if (dias === null) {
      return 'Data inválida';
    }


    if (dias < 0) {

      const diasVencido =
        Math.abs(dias);

      if (diasVencido === 1) {
        return 'Vencido há 1 dia';
      }

      return `Vencido há ${diasVencido} dias`;
    }


    if (dias === 0) {
      return 'Vence hoje';
    }


    if (dias === 1) {
      return 'Vence em 1 dia';
    }


    return `Vence em ${dias} dias`;
  }


  // =====================================================
  // DATA ATUAL
  // =====================================================

  private formatarDataAtual(): string {

    const data =
      new Intl.DateTimeFormat(
        'pt-BR',
        {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ).format(new Date());


    return (
      data.charAt(0).toUpperCase() +
      data.slice(1)
    );
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

import {
  NotificacaoService,
  EpiMonitorado,
} from './service/notificacao';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    FormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  notificacoesAbertas = false;
  configuracaoAberta = false;

  diasAvisoEpi: number;
  diasAvisoNr: number;

  constructor(
    private readonly router: Router,
    private readonly notificacaoService: NotificacaoService,
  ) {
    this.diasAvisoEpi =
      this.notificacaoService.obterDiasAvisoEpi();

    this.diasAvisoNr =
      this.notificacaoService.obterDiasAvisoNr();
  }


  /* =========================================
     HEADER
  ========================================= */

  get showHeader(): boolean {
    return this.router.url !== '/login';
  }


  /* =========================================
     LISTA DE NOTIFICAÇÕES
  ========================================= */

  get episComNotificacao(): EpiMonitorado[] {
    return this.notificacaoService
      .obterEpisComNotificacao();
  }


  /* =========================================
     SOMENTE EPIs VENCIDOS
  ========================================= */

  get episVencidos(): EpiMonitorado[] {
    return this.episComNotificacao.filter(
      (epi) =>
        this.notificacaoService.estaVencido(
          epi.vencimento
        )
    );
  }


  /* =========================================
     SOMENTE EPIs PRÓXIMOS DO VENCIMENTO
  ========================================= */

  get episProximosDoVencimento(): EpiMonitorado[] {
    return this.episComNotificacao.filter(
      (epi) =>
        !this.notificacaoService.estaVencido(
          epi.vencimento
        ) &&
        this.notificacaoService.deveAvisarEpi(
          epi.vencimento
        )
    );
  }


  /* =========================================
     QUANTIDADE NO SINO
  ========================================= */

  get totalNotificacoes(): number {
    return this.episComNotificacao.length;
  }


  /* =========================================
     VERIFICAR SE O EPI ESTÁ VENCIDO
  ========================================= */

  estaVencido(epi: EpiMonitorado): boolean {
    return this.notificacaoService
      .estaVencido(epi.vencimento);
  }


  /* =========================================
     DIAS RESTANTES
  ========================================= */

  diasRestantes(
    epi: EpiMonitorado
  ): number | null {

    return this.notificacaoService
      .calcularDiasRestantes(
        epi.vencimento
      );
  }


  /* =========================================
     TEXTO DO VENCIMENTO
  ========================================= */

  textoVencimento(
    epi: EpiMonitorado
  ): string {

    const dias =
      this.diasRestantes(epi);

    if (dias === null) {
      return 'Data de vencimento inválida';
    }

    if (dias < 0) {

      const diasVencido =
        Math.abs(dias);

      return diasVencido === 1
        ? 'Vencido há 1 dia'
        : `Vencido há ${diasVencido} dias`;
    }

    if (dias === 0) {
      return 'Vence hoje';
    }

    if (dias === 1) {
      return 'Vence em 1 dia';
    }

    return `Vence em ${dias} dias`;
  }


  /* =========================================
     ABRIR / FECHAR NOTIFICAÇÕES
  ========================================= */

  alternarNotificacoes(): void {

    this.notificacoesAbertas =
      !this.notificacoesAbertas;

    if (!this.notificacoesAbertas) {
      this.configuracaoAberta = false;
    }
  }


  /* =========================================
     ABRIR CONFIGURAÇÕES
  ========================================= */

  alternarConfiguracao(): void {

    this.configuracaoAberta =
      !this.configuracaoAberta;
  }


  /* =========================================
     SALVAR CONFIGURAÇÃO
  ========================================= */

  salvarConfiguracao(): void {

    if (
      this.diasAvisoEpi < 0 ||
      this.diasAvisoNr < 0
    ) {
      return;
    }

    this.notificacaoService
      .salvarDiasAvisoEpi(
        this.diasAvisoEpi
      );

    this.notificacaoService
      .salvarDiasAvisoNr(
        this.diasAvisoNr
      );

    this.configuracaoAberta = false;
  }
}
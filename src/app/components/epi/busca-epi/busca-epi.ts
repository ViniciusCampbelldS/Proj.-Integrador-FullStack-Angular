import { EpiService } from '../epi-status/epi-status';
import { Component, OnInit, inject } from '@angular/core';
import { NotificacaoService, EpiMonitorado } from '../../../service/notificacao';
import type { Epi } from '../epi.models';

type StatusClass = 'status-expired' | 'status-warning' | 'status-good';

interface BuscaEpiRow {
	id: number;
	funcionario: string;
	nome: string;
	ca: string;
	vencimento: string;
	status: string;
	statusClass: StatusClass;
}

@Component({
	selector: 'app-busca-epi',
	standalone: true,
	imports: [],
	templateUrl: './busca-epi.html',
	styleUrl: './busca-epi.scss'
})

export class BuscaEpi implements OnInit {
	// epiService é uma instância de EpiService, que fornece métodos para interagir com a API de EPI.
	private epiService = inject(EpiService);
	private notificacaoService = inject(NotificacaoService);

	resultados: BuscaEpiRow[] = [];

	ngOnInit(): void {
		this.carregarFallbackLocal();

		this.epiService.listar().subscribe({
			next: (epis) => {
				const lista = this.extrairListaEpis(epis);

				if (lista.length === 0) {
					return;
				}

				this.resultados = lista.map((epi) => this.mapearEpiParaLinha(epi));
			},
			error: () => {},
		});
	}

	private extrairListaEpis(epis: unknown): Epi[] {
		if (Array.isArray(epis)) {
			return epis as Epi[];
		}

		const episComValue = epis as { value?: unknown } | null;

		if (Array.isArray(episComValue?.value)) {
			return episComValue.value as Epi[];
		}

		return [];
	}

	private carregarFallbackLocal(): void {
		const episLocais = this.notificacaoService.todosEpis;

		this.resultados = episLocais.map((epi) =>
			this.mapearMonitoradoParaLinha(epi)
		);
	}

	private mapearMonitoradoParaLinha(epi: EpiMonitorado): BuscaEpiRow {
		const vencimentoDate = this.toDate(epi.vencimento);
		const statusInfo = this.calcularStatus(vencimentoDate);

		return {
			id: epi.id,
			funcionario: epi.funcionario,
			nome: epi.nome,
			ca: epi.ca,
			vencimento: this.formatarData(vencimentoDate),
			status: statusInfo.status,
			statusClass: statusInfo.statusClass,
		};
	}

	private mapearEpiParaLinha(epi: Epi): BuscaEpiRow {
		const vencimentoDate = this.toDate(epi.vencimento);
		const statusInfo = this.calcularStatus(vencimentoDate);

		return {
			id: epi.id,
			funcionario: epi.funcionario,
			nome: epi.nome,
			ca: epi.ca,
			vencimento: this.formatarData(vencimentoDate),
			status: statusInfo.status,
			statusClass: statusInfo.statusClass,
		};
	}

	private toDate(value: Date | string | null): Date | null {
		if (value instanceof Date) {
			return Number.isNaN(value.getTime()) ? null : value;
		}

		if (typeof value === 'string' && value.trim()) {
			const parsed = new Date(value);
			return Number.isNaN(parsed.getTime()) ? null : parsed;
		}

		return null;
	}

	private formatarData(value: Date | null): string {
		if (!value) {
			return '-';
		}

		return new Intl.DateTimeFormat('pt-BR').format(value);
	}

	private calcularStatus(vencimento: Date | null): { status: string; statusClass: StatusClass } {
		if (!vencimento) {
			return {
				status: 'Bom Estado',
				statusClass: 'status-good',
			};
		}

		const hoje = new Date();
		hoje.setHours(0, 0, 0, 0);

		const dataVencimento = new Date(vencimento);
		dataVencimento.setHours(0, 0, 0, 0);

		const diasAvisoEpi = this.notificacaoService.obterDiasAvisoEpi();
		const limiteAviso = new Date(dataVencimento);
		limiteAviso.setDate(limiteAviso.getDate() + diasAvisoEpi);

		// Regra conforme solicitado:
		// Vencido se data atual > vencimento
		if (hoje.getTime() > dataVencimento.getTime()) {
			return {
				status: 'Vencido',
				statusClass: 'status-expired',
			};
		}

		// Próximo do Vencimento se data atual >= vencimento + diasAvisoEpi
		if (hoje.getTime() >= limiteAviso.getTime()) {
			return {
				status: 'Proximo do Vencimento',
				statusClass: 'status-warning',
			};
		}

		// Bom Estado se data atual < vencimento + diasAvisoEpi
		return {
			status: 'Bom Estado',
			statusClass: 'status-good',
		};
	}
}
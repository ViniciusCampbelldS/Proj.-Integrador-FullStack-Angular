import { EpiService } from '../epi-status/epi-status';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificacaoService, EpiMonitorado } from '../../../service/notificacao';
import type { Epi } from '../epi.models';
import { AuthService } from '../../../service/auth';

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
	imports: [CommonModule, FormsModule],
	templateUrl: './busca-epi.html',
	styleUrl: './busca-epi.scss'
})

export class BuscaEpi implements OnInit {
	// epiService é uma instância de EpiService, que fornece métodos para interagir com a API de EPI.
	private epiService = inject(EpiService);
	private notificacaoService = inject(NotificacaoService);
	private authService = inject(AuthService);

	resultados: BuscaEpiRow[] = [];
	exportMessage = '';
	modalEstadoAberto = false;
	modalDescarteAberto = false;
	itemSelecionado: BuscaEpiRow | null = null;
	estadoSelecionado = 'Bom Estado';
	observacaoEstado = '';
	motivoDescarte = '';

	readonly estadosEpi = ['Bom Estado', 'Atenção', 'Danificado', 'Vencido'];

	get podeEditar(): boolean {
		return this.authService.podeEditarEpi();
	}

	get perfilAtual(): string {
		return this.authService.obterPerfil();
	}

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

	exportarRelatorio(formato: 'pdf' | 'odf' | 'xlsx' | 'xml'): void {
		const linhas = this.resultados.map((item) => ({
			funcionario: item.funcionario,
			epi: item.nome,
			ca: item.ca,
			vencimento: item.vencimento,
			status: item.status,
		}));

		const conteudo = formato === 'xml'
			? this.gerarXml(linhas)
			: this.gerarTextoRelatorio(linhas, formato);

		const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');

		link.href = url;
		link.download = `relatorio-epis.${formato}`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(url);

		this.exportMessage = `Relatório .${formato} gerado localmente.`;
	}

	abrirEstado(item: BuscaEpiRow): void {
		if (!this.podeEditar) {
			this.exportMessage = `Perfil ${this.perfilAtual} possui apenas visualização administrativa de EPIs.`;
			return;
		}

		this.itemSelecionado = item;
		this.estadoSelecionado = item.status;
		this.observacaoEstado = '';
		this.modalEstadoAberto = true;
	}

	salvarEstado(): void {
		if (!this.itemSelecionado) {
			return;
		}

		this.resultados = this.resultados.map((item) =>
			item.id === this.itemSelecionado?.id
				? {
					...item,
					status: this.estadoSelecionado,
					statusClass: this.statusClassPorTexto(this.estadoSelecionado),
				}
				: item
		);

		this.exportMessage = `Estado do EPI atualizado localmente${this.observacaoEstado ? ' com observação' : ''}.`;
		this.fecharModais();
	}

	abrirDescarte(item: BuscaEpiRow): void {
		if (!this.podeEditar) {
			this.exportMessage = `Perfil ${this.perfilAtual} não possui permissão para descarte.`;
			return;
		}

		this.itemSelecionado = item;
		this.motivoDescarte = '';
		this.modalDescarteAberto = true;
	}

	confirmarDescarte(): void {
		if (!this.itemSelecionado) {
			return;
		}

		this.resultados = this.resultados.filter((item) => item.id !== this.itemSelecionado?.id);
		this.exportMessage = `EPI descartado localmente${this.motivoDescarte ? ': ' + this.motivoDescarte : '.'}`;
		this.fecharModais();
	}

	fecharModais(): void {
		this.modalEstadoAberto = false;
		this.modalDescarteAberto = false;
		this.itemSelecionado = null;
	}

	private statusClassPorTexto(status: string): StatusClass {
		if (status === 'Vencido' || status === 'Danificado') {
			return 'status-expired';
		}

		if (status === 'Atenção' || status === 'Próximo do vencimento') {
			return 'status-warning';
		}

		return 'status-good';
	}

	private gerarTextoRelatorio(linhas: Array<Record<string, string>>, formato: string): string {
		return [
			`Relatório de EPIs (${formato.toUpperCase()})`,
			`Gerado em ${new Intl.DateTimeFormat('pt-BR').format(new Date())}`,
			'',
			...linhas.map((linha, index) =>
				`${index + 1}. ${linha['funcionario']} | ${linha['epi']} | CA ${linha['ca']} | ${linha['vencimento']} | ${linha['status']}`
			),
		].join('\n');
	}

	private gerarXml(linhas: Array<Record<string, string>>): string {
		const itens = linhas.map((linha) => `
  <epi>
    <funcionario>${this.escapeXml(linha['funcionario'])}</funcionario>
    <nome>${this.escapeXml(linha['epi'])}</nome>
    <ca>${this.escapeXml(linha['ca'])}</ca>
    <vencimento>${this.escapeXml(linha['vencimento'])}</vencimento>
    <status>${this.escapeXml(linha['status'])}</status>
  </epi>`).join('');

		return `<?xml version="1.0" encoding="UTF-8"?>\n<relatorio>${itens}\n</relatorio>`;
	}

	private escapeXml(value: string): string {
		return value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');
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
				status: 'Próximo do vencimento',
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

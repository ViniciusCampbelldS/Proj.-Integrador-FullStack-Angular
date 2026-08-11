import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeEpi } from '../../epi/epi.models';
import { EpiData } from '../../../services/epi-data';

interface EmployeeTraining {
  id: number;
  nr: string;
  trainingDate: string;
  dueDate: string;
}

interface EpiDocument {
  id: number;
  name: string;
  date: string;
}

@Component({
  selector: 'app-employee-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-report.html',
  styleUrl: './employee-report.scss',
})
export class EmployeeReport {
  employeeEpis: EmployeeEpi[];

  selectedEpi: EmployeeEpi | null = null;
  reportState = 'Bom estado';
  reportComment = '';
  selectedReportImages: string[] = [];
  selectedReportFileNames: string[] = [];
  reportSent = false;

  trainingsVisible = false;

  readonly employeeTrainings: EmployeeTraining[] = [
    {
      id: 1,
      nr: 'NR 06',
      trainingDate: '05/08/2026',
      dueDate: '05/08/2027',
    },
    {
      id: 2,
      nr: 'NR 10',
      trainingDate: '11/04/2026',
      dueDate: '11/04/2028',
    },
    {
      id: 3,
      nr: 'NR 35',
      trainingDate: '20/08/2025',
      dueDate: '20/08/2026',
    },
  ];

  readonly documents: EpiDocument[] = [
    {
      id: 1,
      name: 'Ficha de entrega de EPI - Agosto 2026',
      date: '06/08/2026',
    },
    {
      id: 2,
      name: 'Termo de responsabilidade de EPI',
      date: '06/08/2026',
    },
  ];

  constructor(private readonly epiData: EpiData) {
    this.employeeEpis = this.epiData.getEmployeeEpis();
  }

  alternarTreinamentos(): void {
    this.trainingsVisible = !this.trainingsVisible;
  }

  abrirModal(epi: EmployeeEpi): void {
    this.limparImagensSelecionadas();
    this.selectedEpi = epi;
    this.reportState = 'Bom estado';
    this.reportComment = '';
    this.reportSent = false;
  }

  fecharModal(): void {
    this.limparImagensSelecionadas();
    this.selectedEpi = null;
    this.reportComment = '';
    this.reportState = 'Bom estado';
  }

  onReportImages(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    this.limparImagensSelecionadas();
    this.selectedReportImages = files.map((file) => URL.createObjectURL(file));
    this.selectedReportFileNames = files.map((file) => file.name);
  }

  removerImagem(index: number): void {
    const imageUrl = this.selectedReportImages[index];
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    this.selectedReportImages.splice(index, 1);
    this.selectedReportFileNames.splice(index, 1);
  }

  submitReport(): void {
    if (!this.selectedEpi) {
      return;
    }

    const reports = this.readStoredReports();

    reports.push({
      epi: this.selectedEpi.name,
      ca: this.selectedEpi.ca,
      state: this.reportState,
      comment: this.reportComment.trim(),
      files: [...this.selectedReportFileNames],
      sentAt: new Date().toISOString(),
    });

    try {
      localStorage.setItem('mar-employee-epi-reports', JSON.stringify(reports));
    } catch {
      // O envio continua funcionando mesmo se o navegador bloquear o localStorage.
    }

    this.fecharModal();
    this.reportSent = true;
  }

  visualizarFicha(documento: EpiDocument): void {
    const url = URL.createObjectURL(this.criarFichaBlob(documento));
    const novaGuia = window.open(url, '_blank', 'noopener,noreferrer');

    if (!novaGuia) {
      URL.revokeObjectURL(url);
      return;
    }

    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  baixarFicha(documento: EpiDocument): void {
    const url = URL.createObjectURL(this.criarFichaBlob(documento));
    const link = document.createElement('a');

    link.href = url;
    link.download = `${this.nomeArquivoSeguro(documento.name)}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  iconeEpi(epi: EmployeeEpi): string {
    const nome = epi.name.toLowerCase();

    if (nome.includes('luva')) {
      return 'bi-hand-index-thumb';
    }

    if (nome.includes('auricular')) {
      return 'bi-headphones';
    }

    if (nome.includes('oculos') || nome.includes('óculos')) {
      return 'bi-eyeglasses';
    }

    if (nome.includes('bota')) {
      return 'bi-shield-check';
    }

    return 'bi-shield-check';
  }

  classeEstado(epi: EmployeeEpi): string {
    const status = epi.status.toLowerCase();

    if (status.includes('danificado') || status.includes('vencido')) {
      return 'danger';
    }

    if (status.includes('atenção') || status.includes('atencao') || status.includes('desgaste')) {
      return 'warning';
    }

    return 'good';
  }

  situacaoTreinamento(treinamento: EmployeeTraining): string {
    const vencimento = this.dataBrParaDate(treinamento.dueDate);
    const hoje = this.inicioDoDia(new Date());
    const limite = new Date(hoje);
    limite.setDate(limite.getDate() + 30);

    if (vencimento < hoje) {
      return 'Vencido';
    }

    if (vencimento <= limite) {
      return 'Próximo do vencimento';
    }

    return 'Ativo';
  }

  classeTreinamento(treinamento: EmployeeTraining): string {
    const situacao = this.situacaoTreinamento(treinamento);

    if (situacao === 'Vencido') {
      return 'danger';
    }

    if (situacao === 'Próximo do vencimento') {
      return 'warning';
    }

    return 'good';
  }

  private criarFichaBlob(documento: EpiDocument): Blob {
    const epiRows = this.employeeEpis
      .map(
        (epi) => `
          <tr>
            <td>${this.escapeHtml(epi.name)}</td>
            <td>${this.escapeHtml(epi.ca)}</td>
            <td>${this.escapeHtml(epi.deliveredAt)}</td>
            <td>${this.escapeHtml(epi.status)}</td>
          </tr>`,
      )
      .join('');

    const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${this.escapeHtml(documento.name)}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #243746; margin: 36px; }
    h1 { color: #003d6c; margin-bottom: 4px; }
    p { color: #6b7b88; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { border: 1px solid #dbe3e8; padding: 10px; text-align: left; }
    th { background: #eef6fa; color: #003d6c; }
    .meta { margin-top: 8px; font-size: 14px; }
  </style>
</head>
<body>
  <h1>${this.escapeHtml(documento.name)}</h1>
  <p class="meta">Emitida em ${this.escapeHtml(documento.date)}</p>
  <p>Documento demonstrativo do Portal do Funcionário.</p>
  <table>
    <thead>
      <tr><th>EPI</th><th>CA</th><th>Entrega</th><th>Situação</th></tr>
    </thead>
    <tbody>${epiRows}</tbody>
  </table>
</body>
</html>`;

    return new Blob([html], { type: 'text/html;charset=utf-8' });
  }

  private readStoredReports(): Array<Record<string, unknown>> {
    try {
      const stored = localStorage.getItem('mar-employee-epi-reports');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private limparImagensSelecionadas(): void {
    this.selectedReportImages.forEach((url) => URL.revokeObjectURL(url));
    this.selectedReportImages = [];
    this.selectedReportFileNames = [];
  }

  private dataBrParaDate(data: string): Date {
    const [dia, mes, ano] = data.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  private inicioDoDia(data: Date): Date {
    return new Date(data.getFullYear(), data.getMonth(), data.getDate());
  }

  private nomeArquivoSeguro(nome: string): string {
    return nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  }

  private escapeHtml(valor: string): string {
    return valor
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

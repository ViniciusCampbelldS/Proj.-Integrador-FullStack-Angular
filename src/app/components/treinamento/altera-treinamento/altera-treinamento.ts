import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth';

type Funcionario = {
  id: number;
  matricula: string;
  nome: string;
  cargo: string;
  area: string;
};

type SituacaoTreinamento = 'Em dia' | 'Próximo do vencimento' | 'Vencido';

interface TreinamentoRegistro {
  id: number;
  nr: string;
  treinamento: string;
  funcionario: string;
  aplicacao: string;
  vencimento: string;
  situacao: SituacaoTreinamento;
}

@Component({
  selector: 'app-altera-treinamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './altera-treinamento.html',
  styleUrl: './altera-treinamento.scss'
})
export class AlteraTreinamento {
  isFuncionarioModalOpen = false;
  isEditModalOpen = false;
  mensagem = '';

  treinamentoEditando: TreinamentoRegistro | null = null;
  formTreinamento: TreinamentoRegistro = this.criarTreinamentoVazio();

  filtroMatricula = '';
  filtroNome = '';
  filtroCargo = '';
  filtroArea = '';

  readonly funcionarios: Funcionario[] = [
    { id: 1, matricula: '1001', nome: 'Pedro Henrique', cargo: 'Técnico de Segurança', area: 'Operações' },
    { id: 2, matricula: '1002', nome: 'João da Silva', cargo: 'Eletricista', area: 'Manutenção' },
    { id: 3, matricula: '1003', nome: 'Carlos Oliveira', cargo: 'Operador', area: 'Produção' },
    { id: 4, matricula: '1004', nome: 'Fernanda Lima', cargo: 'Supervisora', area: 'Qualidade' },
    { id: 5, matricula: '1005', nome: 'Marcos Pereira', cargo: 'Soldador', area: 'Metalurgia' },
    { id: 6, matricula: '1006', nome: 'Ana Costa', cargo: 'Auxiliar', area: 'Logística' }
  ];

  treinamentos: TreinamentoRegistro[] = [
    {
      id: 1,
      nr: 'NR-35',
      treinamento: 'Trabalho em Altura',
      funcionario: 'Pedro Henrique',
      aplicacao: '2026-08-20',
      vencimento: '2027-08-20',
      situacao: 'Em dia',
    },
    {
      id: 2,
      nr: 'NR-10',
      treinamento: 'Segurança em Eletricidade',
      funcionario: 'João da Silva',
      aplicacao: '2026-08-10',
      vencimento: '2026-09-10',
      situacao: 'Próximo do vencimento',
    },
    {
      id: 3,
      nr: 'NR-12',
      treinamento: 'Segurança em Máquinas',
      funcionario: 'Carlos Oliveira',
      aplicacao: '2025-05-05',
      vencimento: '2026-05-05',
      situacao: 'Vencido',
    },
  ];

  readonly situacoes: SituacaoTreinamento[] = ['Em dia', 'Próximo do vencimento', 'Vencido'];

  constructor(private readonly authService: AuthService) {}

  get podeEditarTreinamento(): boolean {
    return this.authService.podeEditarTreinamento();
  }

  get perfilAtual(): string {
    return this.authService.obterPerfil();
  }

  checkedFuncionarioIds = new Set<number>();
  selectedFuncionarioIds = new Set<number>();
  appliedFuncionarioIds = new Set<number>();

  get filteredFuncionarios(): Funcionario[] {
    const matricula = this.filtroMatricula.trim().toLowerCase();
    const nome = this.filtroNome.trim().toLowerCase();
    const cargo = this.filtroCargo.trim().toLowerCase();
    const area = this.filtroArea.trim().toLowerCase();

    return this.funcionarios.filter((funcionario) => {
      const matchMatricula = !matricula || funcionario.matricula.toLowerCase().includes(matricula);
      const matchNome = !nome || funcionario.nome.toLowerCase().includes(nome);
      const matchCargo = !cargo || funcionario.cargo.toLowerCase().includes(cargo);
      const matchArea = !area || funcionario.area.toLowerCase().includes(area);

      return matchMatricula && matchNome && matchCargo && matchArea;
    });
  }

  get allFilteredChecked(): boolean {
    return this.filteredFuncionarios.length > 0
      && this.filteredFuncionarios.every((funcionario) => this.checkedFuncionarioIds.has(funcionario.id));
  }

  get hasCheckedFuncionarios(): boolean {
    return this.checkedFuncionarioIds.size > 0;
  }

  get hasSelectedFuncionarios(): boolean {
    return this.selectedFuncionarioIds.size > 0;
  }

  get funcionariosSelecionadosLabel(): string {
    if (this.appliedFuncionarioIds.size === 0) {
      return 'Selecione Funcionários';
    }

    const selecionados = this.funcionarios
      .filter((funcionario) => this.appliedFuncionarioIds.has(funcionario.id))
      .map((funcionario) => funcionario.nome);

    if (selecionados.length <= 2) {
      return selecionados.join(', ');
    }

    return `${selecionados.length} funcionários selecionados`;
  }

  get funcionariosSelecionadosNoModal(): Funcionario[] {
    return this.funcionarios.filter((funcionario) => this.selectedFuncionarioIds.has(funcionario.id));
  }

  openFuncionarioModal(): void {
    this.isFuncionarioModalOpen = true;
    this.checkedFuncionarioIds = new Set(this.appliedFuncionarioIds);
    this.selectedFuncionarioIds = new Set(this.appliedFuncionarioIds);
  }

  closeFuncionarioModal(): void {
    this.isFuncionarioModalOpen = false;
    this.filtroMatricula = '';
    this.filtroNome = '';
    this.filtroCargo = '';
    this.filtroArea = '';
    this.checkedFuncionarioIds = new Set();
  }

  toggleFuncionarioChecked(funcionarioId: number, checked: boolean): void {
    const nextChecked = new Set(this.checkedFuncionarioIds);

    if (checked) {
      nextChecked.add(funcionarioId);
    } else {
      nextChecked.delete(funcionarioId);
    }

    this.checkedFuncionarioIds = nextChecked;
  }

  toggleAllFiltered(checked: boolean): void {
    const nextChecked = new Set(this.checkedFuncionarioIds);

    this.filteredFuncionarios.forEach((funcionario) => {
      if (checked) {
        nextChecked.add(funcionario.id);
      } else {
        nextChecked.delete(funcionario.id);
      }
    });

    this.checkedFuncionarioIds = nextChecked;
  }

  addSelectedFuncionarios(): void {
    const nextSelected = new Set(this.selectedFuncionarioIds);

    this.checkedFuncionarioIds.forEach((id) => nextSelected.add(id));

    this.selectedFuncionarioIds = nextSelected;
  }

  removeSelectedFuncionarios(): void {
    const nextSelected = new Set(this.selectedFuncionarioIds);

    this.checkedFuncionarioIds.forEach((id) => nextSelected.delete(id));

    this.selectedFuncionarioIds = nextSelected;
  }

  applyFuncionariosSelecionados(): void {
    this.appliedFuncionarioIds = new Set(this.selectedFuncionarioIds);
    this.closeFuncionarioModal();
  }

  abrirEdicaoTreinamento(treinamento: TreinamentoRegistro): void {
    if (!this.podeEditarTreinamento) {
      this.mensagem = `Perfil ${this.perfilAtual} possui apenas visualização administrativa de treinamentos.`;
      return;
    }

    this.treinamentoEditando = treinamento;
    this.formTreinamento = { ...treinamento };
    this.isEditModalOpen = true;
  }

  fecharEdicaoTreinamento(): void {
    this.isEditModalOpen = false;
    this.treinamentoEditando = null;
    this.formTreinamento = this.criarTreinamentoVazio();
  }

  salvarEdicaoTreinamento(): void {
    if (!this.treinamentoEditando) {
      return;
    }

    this.treinamentos = this.treinamentos.map((treinamento) =>
      treinamento.id === this.treinamentoEditando?.id
        ? { ...this.formTreinamento }
        : treinamento
    );

    this.mensagem = 'Treinamento atualizado localmente no frontend.';
    this.fecharEdicaoTreinamento();
  }

  situacaoClass(situacao: SituacaoTreinamento): string {
    if (situacao === 'Vencido') {
      return 'danger';
    }

    if (situacao === 'Próximo do vencimento') {
      return 'warning';
    }

    return 'good';
  }

  private criarTreinamentoVazio(): TreinamentoRegistro {
    return {
      id: 0,
      nr: '',
      treinamento: '',
      funcionario: '',
      aplicacao: '',
      vencimento: '',
      situacao: 'Em dia',
    };
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Funcionario = {
  id: number;
  matricula: string;
  nome: string;
  cargo: string;
  area: string;
};

@Component({
  selector: 'app-altera-treinamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './altera-treinamento.html',
  styleUrl: './altera-treinamento.scss'
})
export class AlteraTreinamento {
  isFuncionarioModalOpen = false;

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
}

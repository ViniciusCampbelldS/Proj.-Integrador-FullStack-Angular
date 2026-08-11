import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth';

type FuncionarioStatus = 'Ativo' | 'Afastado' | 'Inativo';

interface Funcionario {
  id: number;
  matricula: string;
  nome: string;
  cpf: string;
  setor: string;
  cargo: string;
  perfil: 'Operário' | 'TST';
  status: FuncionarioStatus;
  nrs: string[];
}

interface FuncionarioForm {
  matricula: string;
  nome: string;
  cpf: string;
  setor: string;
  cargo: string;
  perfil: Funcionario['perfil'];
  status: FuncionarioStatus;
  nrs: string[];
}

@Component({
  selector: 'app-gerenciar-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-funcionarios.html',
  styleUrl: './gerenciar-funcionarios.scss',
})
export class GerenciarFuncionarios {
  readonly setores = ['Operacões', 'Manutenção', 'Produção', 'Qualidade', 'Logística', 'Administrativo'];
  readonly cargos = ['Operador', 'Soldador', 'Eletricista', 'Supervisor', 'Auxiliar', 'Técnico de Segurança'];
  readonly perfis: Funcionario['perfil'][] = ['Operário', 'TST'];
  readonly statusOptions: FuncionarioStatus[] = ['Ativo', 'Afastado', 'Inativo'];
  readonly nrOptions = ['NR 06', 'NR 10', 'NR 12', 'NR 18', 'NR 33', 'NR 35'];

  filtroBusca = '';
  filtroSetor = '';
  filtroStatus = '';

  modalAberto = false;
  funcionarioEditandoId: number | null = null;

  funcionarios: Funcionario[] = [
    {
      id: 1,
      matricula: '1001',
      nome: 'João Pedro da Rocha',
      cpf: '123.456.789-10',
      setor: 'Operações',
      cargo: 'Operador',
      perfil: 'Operário',
      status: 'Ativo',
      nrs: ['NR 06', 'NR 12'],
    },
    {
      id: 2,
      matricula: '1002',
      nome: 'Fernanda Lima Barreto',
      cpf: '987.654.321-00',
      setor: 'Qualidade',
      cargo: 'Supervisor',
      perfil: 'TST',
      status: 'Ativo',
      nrs: ['NR 06', 'NR 35'],
    },
    {
      id: 3,
      matricula: '1003',
      nome: 'Marcos Paulo Pereira',
      cpf: '456.789.123-44',
      setor: 'Manutenção',
      cargo: 'Eletricista',
      perfil: 'Operário',
      status: 'Afastado',
      nrs: ['NR 06', 'NR 10', 'NR 35'],
    },
    {
      id: 4,
      matricula: '1004',
      nome: 'Ana Costa',
      cpf: '321.654.987-22',
      setor: 'Administrativo',
      cargo: 'Técnico de Segurança',
      perfil: 'TST',
      status: 'Ativo',
      nrs: ['NR 06', 'NR 33'],
    },
  ];

  form: FuncionarioForm = this.criarFormVazio();

  constructor(private readonly authService: AuthService) {}

  get podeGerenciarFuncionarios(): boolean {
    return this.authService.podeCadastrarFuncionario();
  }

  get perfilAtual(): string {
    return this.authService.obterPerfil();
  }

  get funcionariosFiltrados(): Funcionario[] {
    const busca = this.filtroBusca.trim().toLowerCase();

    return this.funcionarios.filter((funcionario) => {
      const correspondeBusca =
        !busca ||
        funcionario.nome.toLowerCase().includes(busca) ||
        funcionario.matricula.toLowerCase().includes(busca) ||
        funcionario.cpf.toLowerCase().includes(busca) ||
        funcionario.cargo.toLowerCase().includes(busca);

      const correspondeSetor = !this.filtroSetor || funcionario.setor === this.filtroSetor;
      const correspondeStatus = !this.filtroStatus || funcionario.status === this.filtroStatus;

      return correspondeBusca && correspondeSetor && correspondeStatus;
    });
  }

  get totalAtivos(): number {
    return this.funcionarios.filter((funcionario) => funcionario.status === 'Ativo').length;
  }

  get totalAfastados(): number {
    return this.funcionarios.filter((funcionario) => funcionario.status === 'Afastado').length;
  }

  get totalComNr(): number {
    return this.funcionarios.filter((funcionario) => funcionario.nrs.length > 0).length;
  }

  abrirNovoFuncionario(): void {
    if (!this.podeGerenciarFuncionarios) {
      return;
    }

    this.funcionarioEditandoId = null;
    this.form = this.criarFormVazio();
    this.modalAberto = true;
  }

  editarFuncionario(funcionario: Funcionario): void {
    if (!this.podeGerenciarFuncionarios) {
      return;
    }

    this.funcionarioEditandoId = funcionario.id;
    this.form = {
      matricula: funcionario.matricula,
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      setor: funcionario.setor,
      cargo: funcionario.cargo,
      perfil: funcionario.perfil,
      status: funcionario.status,
      nrs: [...funcionario.nrs],
    };
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarFuncionario(): void {
    if (!this.form.nome.trim() || !this.form.matricula.trim() || !this.form.cpf.trim()) {
      return;
    }

    if (this.funcionarioEditandoId) {
      this.funcionarios = this.funcionarios.map((funcionario) =>
        funcionario.id === this.funcionarioEditandoId
          ? { ...funcionario, ...this.form, nrs: [...this.form.nrs] }
          : funcionario
      );
    } else {
      const proximoId = Math.max(...this.funcionarios.map((funcionario) => funcionario.id), 0) + 1;
      this.funcionarios = [
        ...this.funcionarios,
        {
          id: proximoId,
          ...this.form,
          nrs: [...this.form.nrs],
        },
      ];
    }

    this.fecharModal();
  }

  removerFuncionario(id: number): void {
    if (!this.podeGerenciarFuncionarios) {
      return;
    }

    this.funcionarios = this.funcionarios.filter((funcionario) => funcionario.id !== id);
  }

  limparFiltros(): void {
    this.filtroBusca = '';
    this.filtroSetor = '';
    this.filtroStatus = '';
  }

  alternarNr(nr: string, checked: boolean): void {
    if (checked && !this.form.nrs.includes(nr)) {
      this.form.nrs = [...this.form.nrs, nr];
      return;
    }

    if (!checked) {
      this.form.nrs = this.form.nrs.filter((item) => item !== nr);
    }
  }

  possuiNr(nr: string): boolean {
    return this.form.nrs.includes(nr);
  }

  statusClass(status: FuncionarioStatus): string {
    if (status === 'Ativo') {
      return 'status-active';
    }

    if (status === 'Afastado') {
      return 'status-away';
    }

    return 'status-inactive';
  }

  private criarFormVazio(): FuncionarioForm {
    return {
      matricula: '',
      nome: '',
      cpf: '',
      setor: 'Operacões',
      cargo: 'Operador',
      perfil: 'Operário',
      status: 'Ativo',
      nrs: [],
    };
  }
}

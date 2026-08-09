import { Routes } from '@angular/router';
import { CadastroEpi } from './components/epi/cadastro-epi/CadastroEpi';
import { Login } from './components/geral/login/login';
import { BuscaEpi } from './components/epi/busca-epi/busca-epi';
import { Unauthorized } from './auth/unauthorized/unauthorized';
import { Homepage } from './components/geral/homepage/homepage';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  // login que e a unica pagina liberada sem autenticação
  {
    path: 'login',
    component: Login
  },

  // home do site
  {
    path: '',
    component: Homepage,
    canActivate: [authGuard]
  },

  // epi
  {
    path: 'epi',
    component: CadastroEpi,
    canActivate: [authGuard]
  },

  // epi filter
  {
    path: 'epi/filtro',
    component: BuscaEpi,
    canActivate: [authGuard]
  },

  // treinamento
  {
    path: 'treinamento',
    loadComponent: () =>
      import('./components/treinamento/gerenciar-treinamento')
        .then((m) => m.GerenciarTreinamento),
    canActivate: [authGuard]
  },

  // treinamento - presenca
  {
    path: 'treinamento/presenca',
    loadComponent: () =>
      import('./components/treinamento/gerenciar-treinamento')
        .then((m) => m.GerenciarTreinamento),
    data: { view: 'presenca' },
    canActivate: [authGuard]
  },

  // treinamento - abrir turma
  {
    path: 'treinamento/abrir-turma',
    loadComponent: () =>
      import('./components/treinamento/gerenciar-treinamento')
        .then((m) => m.GerenciarTreinamento),
    data: { view: 'abrir-turma' },
    canActivate: [authGuard]
  },

  // treinamento - agendar
  {
    path: 'treinamento/agendar',
    loadComponent: () =>
      import('./components/treinamento/agendar-treinamento/agendar-treinamento')
        .then((m) => m.AgendarTreinamento),
    canActivate: [authGuard]
  },

  // treinamento - historico
  {
    path: 'treinamento/historico',
    loadComponent: () =>
      import('./components/treinamento/historico-treinamento/historico-treinamento')
        .then((m) => m.HistoricoTreinamento),
    canActivate: [authGuard]
  },

  // funcionario
  {
    path: 'funcionario',
    loadChildren: () =>
      import('./components/funcionario/funcionario.module')
        .then((m) => m.FuncionarioModule),
    canActivate: [authGuard]
  },

  // gerenciar funcionarios
  {
    path: 'gerenciar-funcionarios',
    loadComponent: () =>
      import('./components/geral/gerenciar-funcionarios/gerenciar-funcionarios')
        .then((m) => m.GerenciarFuncionarios),
    canActivate: [authGuard]
  },

  // acesso nao autorizado
  {
    path: 'unauthorized',
    component: Unauthorized,
    canActivate: [authGuard]
  },

  // rota invalida
  {
    path: '**',
    redirectTo: ''
  }
];
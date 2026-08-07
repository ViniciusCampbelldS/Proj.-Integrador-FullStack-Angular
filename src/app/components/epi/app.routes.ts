import { Routes } from '@angular/router';
import { EpiManagement } from '../../pages/epi-management/epi-management';
import { Login } from '../geral/login/login';
import { EpiFilter } from './epi-filter/epi-filter';
import { Unauthorized } from '../../auth/unauthorized/unauthorized';
import { Homepage } from '../geral/homepage/homepage';
import { authGuard } from '../../auth/auth.guard';

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
    component: EpiManagement,
    canActivate: [authGuard]
  },

  // epi filter
  {
    path: 'epi/filtro',
    component: EpiFilter,
    canActivate: [authGuard]
  },

  // treinamento
  {
    path: 'treinamento',
    loadComponent: () =>
      import('../treinamento/gerenciar-treinamento')
        .then((m) => m.GerenciarTreinamento),
    canActivate: [authGuard]
  },

  // funcionario
  {
    path: 'funcionario',
    loadChildren: () =>
      import('../funcionario/funcionario.module')
        .then((m) => m.FuncionarioModule),
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
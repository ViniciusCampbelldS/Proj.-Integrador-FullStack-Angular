import { Routes } from '@angular/router';
import { EpiManagement } from '../../pages/epi-management/epi-management';
import { Login } from '../geral/login/login';
import { EpiFilter } from './epi-filter/epi-filter';
import { Unauthorized } from '../../auth/unauthorized/unauthorized';
import { Homepage } from '../geral/homepage/homepage';

export const routes: Routes = [
	{ path: 'login', component: Login },
	{ path: 'epi', component: EpiManagement },
	{ path: '', component: Homepage },
	{ path: 'epi/filtro', component: EpiFilter },
	{ path: 'treinamento', loadComponent: () => import('../treinamento/gerenciar-treinamento').then((m) => m.GerenciarTreinamento) },
	{ path: 'funcionario', loadChildren: () => import('../funcionario/funcionario.module').then((m) => m.FuncionarioModule) },
	{ path: 'unauthorized', component: Unauthorized },
	{ path: '**', redirectTo: '' },
];

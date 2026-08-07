import { Routes } from '@angular/router';
import { EpiManagement } from '../pages/epi-management/epi-management';
import { EmployeeReport } from '../pages/employee-report/employee-report';
import { Login } from '../login/login';
import { EpiFilter } from './epi-filter/epi-filter';
import { Unauthorized } from '../auth/unauthorized/unauthorized';
import { Homepage } from '../components/homepage/homepage';

export const routes: Routes = [
	{ path: 'login', component: Login },
	{ path: 'epi', component: EpiManagement },
	{ path: '', component: Homepage },
	//   depreciado:
	//	{ path: 'epi/detalhe', component: EpiDetalhe },
	//   { path: 'epi/cadastrar', component: EpiForm },
	//   { path: 'epi/listar', component: EpiList },
	{ path: 'epi/filtro', component: EpiFilter },
	{ path: 'epis', redirectTo: 'epi' },
	{ path: 'funcionario/relatorio-epi', component: EmployeeReport },
	{ path: 'unauthorized', component: Unauthorized },
	{ path: '**', redirectTo: '' },
];

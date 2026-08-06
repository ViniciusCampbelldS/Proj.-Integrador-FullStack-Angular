import { Routes } from '@angular/router';
import { EpiManagement } from './pages/epi-management/epi-management';
import { EmployeeReport } from './pages/employee-report/employee-report';
import { LoginComponent } from './login/login';
import { EpiForm } from './epi/epi-form/epi-form';
import { EpiDetalhe } from './epi/epi-detalhe/epi-detalhe';
import { Unauthorized } from './auth/unauthorized/unauthorized';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'epi', component: EpiManagement },
  { path: 'epi/cadastrar', component: EpiForm },
  { path: 'epi/detalhe', component: EpiDetalhe },
  { path: 'epis', redirectTo: 'epi' },
  { path: 'funcionario/relatorio-epi', component: EmployeeReport },
  { path: 'unauthorized', component: Unauthorized },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];

import { Routes } from '@angular/router';
import { EpiManagement } from './pages/epi-management/epi-management';
import { EmployeeReport } from './pages/employee-report/employee-report';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'epis', component: EpiManagement },
  { path: 'funcionario/relatorio-epi', component: EmployeeReport },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];

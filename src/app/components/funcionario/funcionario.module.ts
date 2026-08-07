import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioPortal } from './funcionario-portal';

const routes: Routes = [
  {
    path: '',
    component: FuncionarioPortal,
    children: [
      {
        path: 'relatorio-epi',
        loadComponent: () => import('../../pages/employee-report/employee-report').then((m) => m.EmployeeReport),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FuncionarioModule {}

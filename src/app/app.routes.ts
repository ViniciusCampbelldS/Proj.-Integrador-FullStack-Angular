import { Routes } from '@angular/router';
import { EpiForm } from './epi/epi-form/epi-form';
import { EpiList } from './epi/epi-list/epi-list';
import { EpiDetalhe } from './epi/epi-detalhe/epi-detalhe';
import { Unauthorized } from './auth/unauthorized/unauthorized';
import { Login } from './login/login';
import { EpiFilter } from './epi/epi-filter/epi-filter';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'unauthorized', component: Unauthorized },

  { path: 'epi', component: EpiList, canActivate: [authGuard] },
  { path: 'epi/detalhe', component: EpiDetalhe, canActivate: [authGuard] },
  { path: 'epi/cadastro', component: EpiForm, canActivate: [authGuard] },
  { path: 'epi/cadastro/:id', component: EpiForm, canActivate: [authGuard] },
  { path: 'epi/filter', component: EpiFilter, canActivate: [authGuard] },
];

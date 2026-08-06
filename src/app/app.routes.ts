import { Routes } from '@angular/router';
import { EpiForm } from './epi/epi-form/epi-form';
import { EpiList } from './epi/epi-list/epi-list';
import { EpiDetalhe } from './epi/epi-detalhe/epi-detalhe';
import { Unauthorized } from './auth/unauthorized/unauthorized';
import { Login } from './login/login';
import { authInterceptor } from './auth/auth-interceptor';
import { EpiFilter } from './epi/epi-filter/epi-filter';

export const routes: Routes = [
    // Rotas públicas
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    {path: 'unauthorized', component: Unauthorized},

    // Rotas privadas
    { path: 'epi', component: EpiList, canActivate: [authInterceptor] },
    { path: 'epi/detalhe', component: EpiDetalhe, canActivate: [authInterceptor] },
    { path: 'epi/cadastro', component: EpiForm, canActivate: [authInterceptor] },
	{ path: 'epi/cadastro/:id', component: EpiForm, canActivate: [authInterceptor] },
	{ path: 'epi/filter', component: EpiFilter, canActivate: [authInterceptor] },
	{ path: 'login', component: Login, canActivate: [authInterceptor] }, 
];

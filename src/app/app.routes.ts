import { Routes } from '@angular/router';
import { EpiList } from './epi/epi-list/epi-list';
import { EpiDetalhe } from './epi/epi-detalhe/epi-detalhe';
import { EpiForm } from './epi/epi-form/epi-form';
import { Unauthorized } from './auth/unauthorized/unauthorized';
import { LoginComponent } from './login/login';
import { authInterceptor } from './auth/auth-interceptor';

export const routes: Routes = [
    // Rotas públicas
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'unauthorized', component: Unauthorized},

    // Rotas privadas
    { path: 'epi', component: EpiList, canActivate: [authInterceptor] },
    { path: 'epi/detalhe', component: EpiDetalhe, canActivate: [authInterceptor] },
    { path: 'epi/cadastro', component: EpiForm, canActivate: [authInterceptor] }
];

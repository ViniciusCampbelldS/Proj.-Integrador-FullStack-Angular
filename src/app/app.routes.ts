import { Routes } from '@angular/router';
import { EpiList } from './epi/epi-list/epi-list';
import { EpiDetalhe } from './epi/epi-detalhe/epi-detalhe';
import { EpiForm } from './epi/epi-form/epi-form';
import { LoginComponent } from './login/login';
// import { Epifilter } from './epi/epi-filter/epi-filter';

export const routes: Routes = [
    { path: '', redirectTo: 'epi', pathMatch: 'full' },
    { path: 'epi', component: EpiList },
    { path: 'epi/detalhe', component: EpiDetalhe },
    { path: 'epi/cadastro', component: EpiForm },
    { path: 'login', component: LoginComponent },
    // { path: 'epi/filtro', component: Epifilter },
];

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHistory } from '../../components/geral/admin-history/admin-history';
import { FormularioEntrega } from '../../components/epi/formulario-entrega/formulario-entrega';
import { EpiFilter } from '../../components/epi/epi-filter/epi-filter';
import { EpiRecord } from '../../models/epi.models';
import { EpiData } from '../../services/epi-data';

type SstView = 'busca' | 'cadastro' | 'entrega' | 'historico';

@Component({
  selector: 'app-epi-management',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminHistory, FormularioEntrega, EpiFilter],
  templateUrl: './epi-management.html',
  styleUrl: './epi-management.scss',
})
export class EpiManagement {
  activeSstView: SstView = 'entrega';
  epis: EpiRecord[];

  constructor(private readonly epiData: EpiData) {
    this.epis = this.epiData.getEpiRecords();
  }

  setSstView(view: SstView): void {
    this.activeSstView = view;
  }
}

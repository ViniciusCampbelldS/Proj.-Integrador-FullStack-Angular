import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHistory } from '../../components/geral/admin-history/admin-history';
import { FormularioEntrega } from '../../components/epi/formulario-entrega/formulario-entrega';
import { EpiRecord } from '../../models/epi.models';
import { EpiData } from '../../services/epi-data';

type SstView = 'entrega' | 'historico';

@Component({
  selector: 'app-epi-management',
  imports: [CommonModule, RouterModule, AdminHistory, FormularioEntrega],
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

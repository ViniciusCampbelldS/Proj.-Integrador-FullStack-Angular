import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
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
export class EpiManagement implements OnInit {
  activeSstView: SstView = 'busca';
  // ****
  tempoParaVencimento: number = 30;
  epis: EpiRecord[];

  constructor(private readonly epiData: EpiData, private readonly route: ActivatedRoute) {
    this.epis = this.epiData.getEpiRecords();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const view = params['view'] as SstView | undefined;
      if (view === 'busca' || view === 'cadastro' || view === 'entrega' || view === 'historico') {
        this.activeSstView = view;
      }
    });
  }

  setSstView(view: SstView): void {
    this.activeSstView = view;
  }
}

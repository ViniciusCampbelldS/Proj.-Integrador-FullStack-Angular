import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HistóricoAltEpi } from '../historico-alt-epi/HistóricoAltEpi';
import { FormularioEntrega } from '../formulario-entrega/formulario-entrega';
import { BuscaEpi } from '../busca-epi/busca-epi';
import { EpiRecord } from '../../../models/epi.models';
import { EpiData } from '../../../services/epi-data';

type SstView = 'busca' | 'cadastro' | 'entrega' | 'historico';

@Component({
  selector: 'app-cadastro-epi',
  standalone: true,
  imports: [CommonModule, RouterModule, HistóricoAltEpi, FormularioEntrega, BuscaEpi],
  templateUrl: './cadastro-epi.html',
  styleUrl: './cadastro-epi.scss',
})
export class CadastroEpi implements OnInit {
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

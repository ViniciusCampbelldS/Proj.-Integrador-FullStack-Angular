import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpiRecord } from '../../../models/epi.models';
import { EpiData } from '../../../services/epi-data';

@Component({
  selector: 'app-cadastro-epi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro-epi.html',
  styleUrl: './cadastro-epi.scss',
})
export class CadastroEpi {
  tempoParaVencimento: number = 30;
  epis: EpiRecord[];

  constructor(private readonly epiData: EpiData) {
    this.epis = this.epiData.getEpiRecords();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryEntry } from '../../../models/epi.models';
import { EpiData } from '../../../services/epi-data';

@Component({
  selector: 'app-historico-alt-epi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-alt-epi.html',
  styleUrl: './historico-alt-epi.scss',
})
export class HistóricoAltEpi {
  history: HistoryEntry[];

  constructor(private readonly epiData: EpiData) {
    this.history = this.epiData.getHistory();
  }
}

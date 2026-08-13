import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HistoryEntry } from '../epi.models';
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

  getActionClass(action: string): 'success' | 'warning' | 'danger' {
    const normalizedAction = action.toLowerCase();

    if (normalizedAction.includes('entrega')) {
      return 'success';
    }

    if (normalizedAction.includes('altera')) {
      return 'warning';
    }

    return 'danger';
  }

  getRegistro(item: HistoryEntry): string {
    const [firstSentence] = item.detail.split('.');
    return firstSentence.trim();
  }
}

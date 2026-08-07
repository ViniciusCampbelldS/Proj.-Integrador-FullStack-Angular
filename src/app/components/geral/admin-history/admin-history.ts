import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryEntry } from '../../models/epi.models';
import { EpiData } from '../../services/epi-data';

@Component({
  selector: 'app-admin-history',
  imports: [CommonModule],
  templateUrl: './admin-history.html',
  styleUrl: './admin-history.scss',
})
export class AdminHistory {
  history: HistoryEntry[];

  constructor(private readonly epiData: EpiData) {
    this.history = this.epiData.getHistory();
  }
}

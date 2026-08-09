import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeEpi } from '../../../models/epi.models';
import { EpiData } from '../../../services/epi-data';

@Component({
  selector: 'app-meus-epis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meus-epis.html',
  styleUrl: './meus-epis.scss',
})
export class MeusEpis {
  employeeEpis: EmployeeEpi[];
  selectedReportImages: string[] = [];
  reportComment = '';
  reportSent = false;

  constructor(private readonly epiData: EpiData) {
    this.employeeEpis = this.epiData.getEmployeeEpis();
  }

  onReportImages(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.selectedReportImages = files.map((file) => URL.createObjectURL(file));
  }

  submitReport(): void {
    this.reportComment = '';
    this.selectedReportImages = [];
    this.reportSent = true;
  }
}

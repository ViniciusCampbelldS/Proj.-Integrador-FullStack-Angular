import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryItem, EpiOption } from '../../models/epi.models';
import { EpiData } from '../../services/epi-data';
import { DigitalSheetModal } from '../digital-sheet-modal/digital-sheet-modal';
import { ReplaceEpiModal } from '../replace-epi-modal/replace-epi-modal';

@Component({
  selector: 'app-delivery-form',
  imports: [CommonModule, FormsModule, DigitalSheetModal, ReplaceEpiModal],
  templateUrl: './delivery-form.html',
  styleUrl: './delivery-form.scss',
})
export class DeliveryForm {
  availableEpis: EpiOption[];
  deliveryItems: DeliveryItem[];
  showReplaceModal = false;
  showDigitalSheetModal = false;
  selectedFichaName = '';
  fichaPreviewUrl = '';
  deliverySaved = false;

  constructor(private readonly epiData: EpiData) {
    this.availableEpis = this.epiData.getAvailableEpis();
    this.deliveryItems = this.epiData.getDeliveryDraft();
  }

  addDeliveryItem(): void {
    const fallback = this.availableEpis[0];
    this.deliveryItems.push({
      epi: fallback.name,
      ca: fallback.ca,
      quantity: 1,
      validity: fallback.validity,
    });
  }

  removeDeliveryItem(index: number): void {
    if (this.deliveryItems.length === 1) {
      return;
    }

    this.deliveryItems.splice(index, 1);
  }

  syncDeliveryItem(index: number): void {
    const item = this.deliveryItems[index];
    const selected = this.availableEpis.find((epi) => epi.name === item.epi);

    if (!selected) {
      return;
    }

    item.ca = selected.ca;
    item.validity = selected.validity;
  }

  onFichaUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFichaName = file.name;
    this.fichaPreviewUrl = URL.createObjectURL(file);
  }

  registerDelivery(): void {
    this.deliverySaved = true;
  }
}

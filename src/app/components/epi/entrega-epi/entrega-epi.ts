import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryItem, EpiOption } from '../epi.models';
import { EpiData } from '../../../services/epi-data';
import { ConfirmarEntregaModal } from '../../../modals/entrega-epi/confirmar-entrega-modal/confirmar-entrega-modal';
import { DeliveryItemsReview } from '../../../modals/entrega-epi/delivery-items-review/delivery-items-review';

@Component({
  selector: 'app-entrega-epi',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConfirmarEntregaModal,
    DeliveryItemsReview,
  ],
  templateUrl: './entrega-epi.html',
  styleUrls: ['./entrega-epi.scss'],
})
export class EntregaEpi {
  employeeOptions = [
    'João Pedro da Rocha',
    'Fernanda Beatriz',
    'Marcos Paulo Ferreira',
  ];

  availableEpis: EpiOption[];
  deliveryItems: DeliveryItem[];
  showReplacedEpiSection = false;
  showConfirmarEntregaModal = false;
  selectedEmployee = this.employeeOptions[0];
  deliveryDate = this.getTodayDate();
  employeeCpf = '';
  replacedEpiName = '';
  replacedEpiCa = '';
  replacedEpiValidity = '';
  selectedFichaName = '';
  fichaPreviewUrl = '';
  signatureType = 'Física';
  deliverySaved = false;

  constructor(private readonly epiData: EpiData) {
    this.availableEpis = this.epiData.getAvailableEpis();
    this.deliveryItems = this.epiData.getDeliveryDraft().map((item) => ({
      ...item,
      quantity: 1,
    }));
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

    if (!window.confirm('Deseja remover esse item?')) {
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
    item.quantity = 1;
  }

  onFichaUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFichaName = file.name;
    this.fichaPreviewUrl = URL.createObjectURL(file);
    this.signatureType = 'Física';
  }

  selectDigitalSignature(): void {
    this.signatureType = 'Digital';
  }

  revealReplacedEpiSection(): void {
    this.showReplacedEpiSection = true;
  }

  registerDelivery(): void {
    this.showConfirmarEntregaModal = true;
  }

  onConfirmDelivery(): void {
    this.deliverySaved = true;
    this.showConfirmarEntregaModal = false;
  }

  private getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}

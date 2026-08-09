import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { input, output } from '@angular/core';
import { DeliveryItem } from '../../../../models/epi.models';

@Component({
  selector: 'app-ficha-entrega-epi-modal',
  imports: [CommonModule],
  templateUrl: './ficha-entrega-epi-modal.html',
  styleUrl: './ficha-entrega-epi-modal.scss',
})
export class FichaEntregaEPIModal {
  deliveryItems = input.required<DeliveryItem[]>();
  closed = output<void>();
}

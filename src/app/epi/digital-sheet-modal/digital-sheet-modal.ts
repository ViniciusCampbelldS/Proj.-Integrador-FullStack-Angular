import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { input, output } from '@angular/core';
import { DeliveryItem } from '../../models/epi.models';

@Component({
  selector: 'app-digital-sheet-modal',
  imports: [CommonModule],
  templateUrl: './digital-sheet-modal.html',
  styleUrl: './digital-sheet-modal.scss',
})
export class DigitalSheetModal {
  deliveryItems = input.required<DeliveryItem[]>();
  closed = output<void>();
}

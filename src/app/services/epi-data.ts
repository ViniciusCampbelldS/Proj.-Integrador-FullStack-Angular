import { Injectable } from '@angular/core';
import {
  DeliveryItem,
  EmployeeEpi,
  EpiOption,
  EpiRecord,
  HistoryEntry,
  PreviousEpi,
} from '../models/epi.models';

@Injectable({ providedIn: 'root' })
export class EpiData {
  getAvailableEpis(): EpiOption[] {
    return [
      { name: 'Capacete de seguranca', ca: '101022', validity: '2026-09-12' },
      { name: 'Luva anticorte Cut Oil Volk', ca: '34456', validity: '2026-08-28' },
      { name: 'Bota de borracha isolante', ca: '321124', validity: '2026-08-02' },
      { name: 'Oculos de seguranca incolor', ca: '88912', validity: '2027-01-10' },
      { name: 'Protetor auricular plug', ca: '67543', validity: '2027-03-04' },
    ];
  }

  getDeliveryDraft(): DeliveryItem[] {
    return [
      {
        epi: 'Capacete de seguranca',
        ca: '101022',
        quantity: 1,
        validity: '2026-09-12',
      },
      {
        epi: 'Luva anticorte Cut Oil Volk',
        ca: '34456',
        quantity: 1,
        validity: '2026-08-28',
      },
    ];
  }

  getEpiRecords(): EpiRecord[] {
    return [
      {
        ca: '101022',
        name: 'Capacete com viseira e faixa refletiva',
        employee: 'Joao Pedro da Rocha de Alcantara',
        status: 'Bom estado',
        statusClass: 'success',
        due: '12/09/2026',
      },
      {
        ca: '34456',
        name: 'Luva anticorte Cut Oil Volk',
        employee: 'Fernanda Beatriz de Lima Barreto',
        status: 'Proximo do vencimento',
        statusClass: 'warning',
        due: '28/08/2026',
      },
      {
        ca: '321124',
        name: 'Bota de borracha isolante',
        employee: 'Marcos Paulo Ferreira Pereira Filho',
        status: 'Vencido',
        statusClass: 'danger',
        due: '02/08/2026',
      },
    ];
  }

  getEmployeeEpis(): EmployeeEpi[] {
    return [
      {
        ca: '101022',
        name: 'Capacete com viseira e faixa refletiva',
        deliveredAt: '06/08/2026',
        status: 'Em uso',
      },
      {
        ca: '34456',
        name: 'Luva anticorte Cut Oil Volk',
        deliveredAt: '06/08/2026',
        status: 'Em uso',
      },
      {
        ca: '67543',
        name: 'Protetor auricular plug',
        deliveredAt: '04/03/2026',
        status: 'Em uso',
      },
    ];
  }

  getPreviousEpis(): PreviousEpi[] {
    return [
      { ca: '88912', name: 'Oculos de seguranca incolor', deliveredAt: '10/01/2026' },
      { ca: '67543', name: 'Protetor auricular plug', deliveredAt: '04/03/2026' },
      { ca: '55301', name: 'Luva nitrilica', deliveredAt: '19/04/2026' },
    ];
  }

  getHistory(): HistoryEntry[] {
    return [
      {
        date: '06/08/2026 09:48',
        user: 'Admin SST',
        action: 'Entrega registrada',
        detail: 'Ficha digital criada para Joao Pedro com 2 EPIs.',
      },
      {
        date: '05/08/2026 16:20',
        user: 'Admin SST',
        action: 'Alteracao manual',
        detail: 'CA 34456 marcado como proximo do vencimento.',
      },
      {
        date: '02/08/2026 11:05',
        user: 'Admin SST',
        action: 'Substituicao',
        detail: 'Bota isolante anterior substituida por vencimento.',
      },
    ];
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EpiService } from '../epi';
import { Epi } from '../epi.model';

@Component({
  selector: 'app-epi-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // CommonModule permite o uso de ngFor e ngIf, RouterModule permite o uso de routerLink
  templateUrl: './epi-list.html',
  styleUrls: ['./epi-list.scss'],
})
export class EpiList implements OnInit { 
epis: Epi[] = [];

constructor(private epiService: EpiService) { }

ngOnInit(): void {
  this.epiService.listar().subscribe({
    next: (epis: Epi[]) => this.epis = epis,
    error: (error) => console.error('Erro ao listar os EPIs:', error)
  });
}
}
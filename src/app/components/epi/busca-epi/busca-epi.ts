import { Router } from '@angular/router';
import { EpiService } from '../epi';
import { Component, inject } from '@angular/core';

@Component({
	selector: 'app-epi-filter',
	standalone: true,
	imports: [], // importação do componente
	templateUrl: './busca-epi.html',
	styleUrl: './busca-epi.scss'
})


export class BuscaEpi {
	// epiService é uma instância de EpiService, que fornece métodos para interagir com a API de EPI.
	private epiService = inject(EpiService);
	// router é uma instância de Router, que permite navegar entre páginas do aplicativo.
	private router = inject(Router);

	

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Epi } from './epi.model';

@Injectable({
	providedIn: 'root',
})
export class EpiService {
	private apiUrl = 'http://localhost:3000/epis';

	constructor(private http: HttpClient) { }

	private toDate(value: unknown): Date | null {
		if (value instanceof Date) {
			return Number.isNaN(value.getTime()) ? null : value;
		}

		if (typeof value === 'string' && value.trim()) {
			const parsed = new Date(value);
			return Number.isNaN(parsed.getTime()) ? null : parsed;
		}

		return null;
	}

	// Garante que a propriedade vencimento seja um objeto Date ou null
	private normalizeEpi(epi: Partial<Epi> | null | undefined): Partial<Epi> {
		const normalized = { ...(epi ?? {}) } as Partial<Epi>;
		const parsedDate = this.toDate(normalized.vencimento);
		return {
			...normalized,
			vencimento: parsedDate ?? null,
		};
	}

	// Faz uma requisição GET para a API e retorna um Observable de uma lista de objetos Epi
	listar(): Observable<Epi[]> {
		return this.http.get<Epi[]>(this.apiUrl).pipe(
			// Normaliza cada objeto Epi na lista, garantindo que a propriedade vencimento seja um objeto Date
			map((epis) => (Array.isArray(epis) ? epis.map((epi) => this.normalizeEpi(epi) as Epi) : []))
		);
	}
	
	// por enquanto usamos esse e especificamos o id do EPI, mas depois outro método vai gerar o id automaticamente
	create(epi: Partial<Epi>): Observable<Epi> {
		const payload = this.normalizeEpi(epi);
		return this.http.post<Epi>(this.apiUrl, payload);
	}

	//omite o campo 'id' para que o backend gere automaticamente o id do novo EPI
	cadastrar(epi: Omit<Epi, 'id'>): Observable<Epi> {
		// Garante que a propriedade vencimento seja um objeto Date
		const payload = this.normalizeEpi(epi);
		// Faz uma requisição POST para a API, enviando o objeto Epi normalizado e retornando um Observable do objeto Epi criado
		return this.http.post<Epi>(this.apiUrl, payload);
	}
}

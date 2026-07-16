import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Epi } from './epi.model';

@Injectable({
  providedIn: 'root',
})

export class EpiService {
  private apiUrl = 'http://localhost:3000/epis';
  constructor(private http: HttpClient) {}
  listar(): Observable < Epi[] > {
    return this.http.get<Epi[]>(this.apiUrl);
  }
  create(epi: Partial<Epi>): Observable<Epi> {
    return this.http.post<Epi>(this.apiUrl, epi);
  }
  cadastrar(epi: Omit<Epi, 'id'>): Observable<Epi> {
return this.http.post<Epi>(this.apiUrl, epi);
}
}

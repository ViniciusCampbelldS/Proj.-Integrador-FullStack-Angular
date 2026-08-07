import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(dados: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, dados);
  }

  salvarToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  obterToken() {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.obterToken();
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}

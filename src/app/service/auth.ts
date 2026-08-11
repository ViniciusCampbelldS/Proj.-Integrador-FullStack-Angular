import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type UserRole = 'TST' | 'Operário';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private readonly roleKey = 'userRole';

  constructor(private http: HttpClient) {}

  login(dados: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, dados);
  }

  salvarToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  salvarPerfil(perfil: UserRole) {
    sessionStorage.setItem(this.roleKey, perfil);
  }

  obterToken() {
    return sessionStorage.getItem('token');
  }

  obterPerfil(): UserRole {
    const perfil = sessionStorage.getItem(this.roleKey) as UserRole | null;
    return perfil ?? 'TST';
  }

  podeEditarEpi(): boolean {
    return this.obterPerfil() === 'TST';
  }

  podeEditarTreinamento(): boolean {
    return this.obterPerfil() === 'TST';
  }

  podeCadastrarFuncionario(): boolean {
    return this.obterPerfil() === 'TST';
  }

  apenasVisualizacao(): boolean {
    return this.obterPerfil() === 'Operário';
  }

  isAuthenticated(): boolean {
    return !!this.obterToken();
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem(this.roleKey);
  }
}

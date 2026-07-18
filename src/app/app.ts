import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // protected readonly title = signal('Aula de Angular Turma 2026.1');
  titulo = "Sistema de controle de EPI's";
  subtitulo = "Gestão de Segurança do Trabalho";
  descricao = "Aplicação para controle, monitoramento e conformidade de Equipamentos de Proteção Individual (EPI's).";

  constructor(private router: Router) {}

  get isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}